import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { kintonePassword, kintoneUserName, volunteerApplicationAppID } from '../../../../common/env';

type Data = {
    res?: any;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            console.log(data);
            const client = new KintoneRestAPIClient({
                baseUrl: 'https://bfp.kintone.com',
                // Use password authentication
                auth: {
                    username: kintoneUserName,
                    password: kintonePassword
                }
            });
            console.log('first');
            if (volunteerApplicationAppID == undefined) res.status(400).json({ res: 'AppID not found.' });

            const { fileKey } = await client.file.uploadFile({
                file: {
                    name: 'Hello.png',
                    data: data
                }
            });
            console.log('second');
            console.log('fileKey', fileKey);
            res.status(200).json({
                res: fileKey
            });
        } catch (e: any) {
            console.log('error here');
            console.log(e);
            res.status(505);
        }
    } else {
        res.status(405);
    }
}
