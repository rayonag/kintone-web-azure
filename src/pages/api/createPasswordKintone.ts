import logError from '@/common/logError';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    ref?: any;
    isZealous?: any;
    error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const username = data.username.toLowerCase();
            const password = data.password;

            // Input validation
            if (!username) {
                return res.status(400).json({ error: 'Username is required' });
            }
            if (!password) {
                return res.status(400).json({ error: 'Password is required' });
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(username)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            // Validate environment variables
            if (!process.env.NEXT_PUBLIC_KINTONE_USERNAME || !process.env.NEXT_PUBLIC_KINTONE_PASSWORD) {
                logError(new Error('Kintone credentials not configured'), { username }, 'createPasswordKintone');
                return res.status(500).json({ error: 'Server configuration error' });
            }

            const client = new KintoneRestAPIClient({
                baseUrl: 'https://bfp.kintone.com',
                // Use password authentication
                auth: {
                    username: process.env.NEXT_PUBLIC_KINTONE_USERNAME,
                    password: process.env.NEXT_PUBLIC_KINTONE_PASSWORD
                }
            });
            // Search for user record with timeout
            let recordArray: any;
            try {
                recordArray = await Promise.race([
                    client.record.getAllRecords({
                        app: '121',
                        condition: `email="${username}"`,
                        orderBy: 'ref desc'
                    }),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Kintone API timeout')), 30000))
                ]);
            } catch (apiError: any) {
                if (apiError.message === 'Kintone API timeout') {
                    logError(apiError, { username }, 'createPasswordKintone_timeout');
                    return res.status(504).json({ error: 'Service temporarily unavailable' });
                }
                if (apiError.status === 401) {
                    logError(apiError, { username }, 'createPasswordKintone_auth_error');
                    return res.status(500).json({ error: 'Authentication failed' });
                }
                if (apiError.status === 403) {
                    logError(apiError, { username }, 'createPasswordKintone_permission_error');
                    return res.status(500).json({ error: 'Permission denied' });
                }
                throw apiError;
            }

            if (recordArray.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Handle multiple records (potential data inconsistency)
            if (recordArray.length > 1) {
                logError(
                    new Error(`Multiple users found with email: ${username}`),
                    { username, recordCount: recordArray.length },
                    'createPasswordKintone_multiple_users'
                );
                // Continue with first record but log the issue
            }

            const user = recordArray[0];

            // Validate record structure
            if (!user['$id'] || typeof user['$id'].value !== 'string') {
                logError(
                    new Error('Invalid record structure - missing or invalid $id'),
                    { username, record: user },
                    'createPasswordKintone_invalid_record'
                );
                return res.status(500).json({ error: 'Invalid record structure' });
            }

            // Update password with retry logic
            let updateRecord;
            try {
                updateRecord = await Promise.race([
                    client.record.updateRecord({
                        app: '121',
                        id: user['$id'].value,
                        record: {
                            password: {
                                value: password
                            }
                        }
                    }),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Update timeout')), 15000))
                ]);
            } catch (updateError: any) {
                if (updateError.message === 'Update timeout') {
                    logError(updateError, { username, recordId: user['$id'].value }, 'createPasswordKintone_update_timeout');
                    return res.status(504).json({ error: 'Update operation timed out' });
                }
                if (updateError.status === 409) {
                    logError(updateError, { username, recordId: user['$id'].value }, 'createPasswordKintone_concurrent_update');
                    return res.status(409).json({ error: 'Record was modified by another user' });
                }
                throw updateError;
            }

            return res.status(200).json({
                ref: user['$id'].value as string,
                isZealous: user['type']?.value === 'Zealous'
            });
        } catch (e: any) {
            // Categorize different types of errors
            let errorMessage = 'Internal server error';
            let statusCode = 500;

            if (e.code === 'ENOTFOUND' || e.code === 'ECONNREFUSED') {
                errorMessage = 'Service temporarily unavailable';
                statusCode = 503;
            } else if (e.status === 429) {
                errorMessage = 'Too many requests';
                statusCode = 429;
            } else if (e.status >= 500) {
                errorMessage = 'Kintone service error';
                statusCode = 502;
            }

            logError(
                e,
                {
                    username: req.body?.username,
                    errorType: e.constructor.name,
                    status: e.status,
                    code: e.code
                },
                'createPasswordKintone'
            );

            return res.status(statusCode).json({ error: errorMessage });
        }
    } else {
        res.status(405);
    }
}
