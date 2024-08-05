import { KintonePassword, KintoneUserName, VolunteerApplicationMasterAppID } from '@/common/env';
import logError from '@/common/logError';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    ref?: string;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const username = data.username.toLowerCase();
            const password = data.password;
            const client = new KintoneRestAPIClient({
                baseUrl: 'https://bfp.kintone.com',
                auth: {
                    username: KintoneUserName,
                    password: KintonePassword
                }
            });
            const recordArray = await client.record.getAllRecords({
                app: VolunteerApplicationMasterAppID as string,
                condition: `email="${username}" and password="${password}"`
            });
            if (recordArray.length == 0) {
                res.status(501);
                return;
            } else if (recordArray.length > 1) {
                throw new Error('More than one user found');
            } else if (recordArray.length == 1) {
                res.status(200).json({ ref: recordArray[0]['$id'].value as string });
            }
        } catch (e) {
            logError(e, req.body.username || null, 'loginPassword');
            res.status(500);
            return;
        }
    } else {
        res.status(405);
    }
}
