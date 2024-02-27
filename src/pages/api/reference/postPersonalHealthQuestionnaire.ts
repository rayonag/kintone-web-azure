import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    username?: any;
    password?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const client = new KintoneRestAPIClient({
                baseUrl: 'https://bfp.kintone.com',
                // Use password authentication
                auth: {
                    username: process.env.KINTONE_USERNAME,
                    password: process.env.KINTONE_PASSWORD
                }
            });
            const addRecord = await client.record.addRecord({
                app: '17',
                record: data
            });
            res.status(200).json({
                username: addRecord,
                password: addRecord
            });
        } catch (e: any) {
            console.log(e.errors);
            res.status(505);
        }
    } else {
        res.status(405);
    }
}
