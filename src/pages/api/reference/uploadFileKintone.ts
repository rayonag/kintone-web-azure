import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { KintonePassword, KintoneUserName } from '@/common/env';
import logError from '@/common/logError';

type Data = {
    res?: any;
};
export const config = {
    api: {
        bodyParser: false
    }
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const client = new KintoneRestAPIClient({
                baseUrl: 'https://bfp.kintone.com',
                // Use password authentication
                auth: {
                    username: KintoneUserName,
                    password: KintonePassword
                }
            });
            const form = formidable({});
            form.parse(req, async function (err, fields, files) {
                if (err) {
                    res.statusCode = 500;
                    res.json({
                        res: req.method
                    });
                    res.end();
                    return;
                }
                const file = files.file;
                if (file == undefined) {
                    res.json({
                        res: 'No file found'
                    });
                    res.end();
                    return;
                }
                const { fileKey } = await client.file.uploadFile({
                    file: {
                        name: file[0].originalFilename || 'unknown file',
                        data: fs.createReadStream(file[0].filepath)
                    }
                });
                res.status(200).json({
                    res: fileKey
                });
                res.end();
            });
        } catch (e: any) {
            logError(e, req.body, 'uploadFileKintone');
            res.status(505).json({
                res: e
            });
            res.end();
        }
    } else {
        res.status(405).end();
    }
}
