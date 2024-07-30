import { KintonePassword, KintoneUserName, VolunteerApplicationMasterAppID } from '@/common/env';
import logError from '@/common/logError';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    hasPassword?: boolean;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const username = data.username;
            const client = new KintoneRestAPIClient({
                baseUrl: 'https://bfp.kintone.com',
                auth: {
                    username: KintoneUserName,
                    password: KintonePassword
                }
            });
            const recordArray = await client.record.getAllRecords({
                app: VolunteerApplicationMasterAppID as string,
                condition: `email="${username}"`
            });
            if (recordArray.length == 0) {
                res.status(501);
                return;
            } else if (recordArray.length > 1) {
                throw new Error('More than one user found');
            } else if (recordArray.length == 1) {
                res.status(200).json({ hasPassword: recordArray[0]['password'].value !== '' });
            }
        } catch (e) {
            logError(e, req.body.username || null, 'loginUsername');
            res.status(500);
            return;
        }
    } else {
        res.status(405);
    }
}
