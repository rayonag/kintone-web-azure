import { KintonePassword, KintoneUserName, VolunteerApplicationMasterAppID } from '@/common/env';
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
            if (recordArray.length == 0) res.status(405).json({});
            else {
                if (recordArray.length > 1) console.log('Found more than one user with the same email.'); // TODO: add verification

                const user = recordArray[0];
                res.status(200).json({
                    username: user['email'],
                    password: user['password'],
                    ref: user['ref']
                });
            }
        } catch (e) {
            throw e;
        }
    } else {
        res.status(405);
    }
}
