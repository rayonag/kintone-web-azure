import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { KintonePassword, KintoneUserName, VolunteerApplicationAppID } from '@/common/env';
import logError from '@/common/logError';
import handleCatch from '@/common/handleCatch';

type Data = {
    res?: any;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const ref = req.body;
            const client = new KintoneRestAPIClient({
                baseUrl: 'https://bfp.kintone.com',
                // Use password authentication
                auth: {
                    username: KintoneUserName,
                    password: KintonePassword
                }
            });
            const resp = await client.record.getAllRecords({
                app: VolunteerApplicationAppID as string,
                condition: `ref="${ref}"`
            });
            if (resp.length == 0) {
                res.json({
                    res: null
                });
                res.end();
                return;
            } else if (resp.length > 1) {
                res.json({
                    res: resp[0]['$id'].value
                });
                res.end();
                logError(`More than one application found: ref=${ref}`, null, 'getUserApplicationRef');
                return;
            } else if (resp.length == 1) {
                res.json({
                    res: resp[0]['$id'].value
                });
                res.end();
                return;
            } else {
                res.json({
                    res: undefined
                });
                res.end();
                return;
            }
        } catch (e: any) {
            logError(e, null, 'getUserApplicationRef');
            res.json({
                res: 'Something went wrong.'
            });
            res.status(505);
        }
    } else {
        res.status(405);
    }
}
