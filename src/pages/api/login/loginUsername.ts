import { KintonePassword, KintoneUserName, OnlineVolunteerApplicationAppID } from '@/common/env';
import logError from '@/common/logError';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    hasPassword?: boolean;
    error?: string;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const username = data.username.toLowerCase();
            const client = new KintoneRestAPIClient({
                baseUrl: 'https://bfp.kintone.com',
                auth: {
                    username: KintoneUserName,
                    password: KintonePassword
                }
            });
            const recordArray = await client.record.getAllRecords({
                app: OnlineVolunteerApplicationAppID as string,
                condition: `email="${username}"`,
                orderBy: 'ref desc'
            });
            if (recordArray.length == 0) {
                // No user found
                return res.status(404).json({ error: 'No user found' });
            } else if (recordArray.length > 1) {
                // More than one user found
                //return res.status(400).json({ error: 'More than one user found' });
                res.status(200).json({ hasPassword: recordArray[0]['password'].value !== '' });
            } else if (recordArray.length == 1) {
                res.status(200).json({ hasPassword: recordArray[0]['password'].value !== '' });
            }
        } catch (e) {
            logError(e, req.body.username || null, 'loginUsername');
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
