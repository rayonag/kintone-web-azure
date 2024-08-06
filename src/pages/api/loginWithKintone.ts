import { KintonePassword, KintoneUserName, VolunteerApplicationMasterAppID } from '@/common/env';
import logError from '@/common/logError';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    username?: any;
    password?: any;
    ref?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const username = data.username;
            const client = new KintoneRestAPIClient({
                baseUrl: 'https://bfp.kintone.com',
                // Use password authentication
                auth: {
                    username: KintoneUserName,
                    password: KintonePassword
                }
            });
            const recordArray = await client.record.getAllRecords({
                app: VolunteerApplicationMasterAppID as string,
                condition: `email="${username}"`
            });
            if (recordArray.length == 0) throw new Error('No user found');
            else {
                if (recordArray.length > 1) console.log('More than one user found'); // TODO: add verification

                const user = recordArray[0];
                res.status(200).json({
                    username: user['email'],
                    password: user['password'],
                    ref: user['ref']
                });
            }
        } catch (e) {
            logError(e, null, 'loginWithKintone');
            res.status(400).send({ username: null, password: null, ref: null });
            return;
        }
    } else {
        res.status(405);
    }
}
