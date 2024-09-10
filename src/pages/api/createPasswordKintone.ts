import logError from '@/common/logError';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
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
                    username: process.env.KINTONE_USERNAME,
                    password: process.env.KINTONE_PASSWORD
                }
            });
            const recordArray = await client.record.getAllRecords({ app: '121', condition: `email="${username}"`, orderBy: 'ref desc' });
            if (recordArray.length == 0) res.status(501).json({});
            else {
                if (recordArray.length > 1) console.log('Found more than one user with the same email.'); // TODO: add verification

                const user = recordArray[0];
                if (typeof user['$id'].value !== 'string') {
                    res.status(505);
                    return;
                }
                const updateRecord = await client.record.updateRecord({
                    app: '121',
                    id: user['$id'].value,
                    record: {
                        password: {
                            value: data.password
                        }
                    }
                });
                res.status(200).json({
                    ref: user['$id'].value
                });
            }
        } catch (e: any) {
            logError(e, req.body, 'createPasswordKintone');
            res.status(505);
        }
    } else {
        res.status(405);
    }
}
