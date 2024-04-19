import { KintonePassword, KintoneUserName } from '@/common/env';
import logError from '@/common/logError';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    ok: boolean;
    name?: any;
    ref?: any;
    username?: any;
    documents?: any;
    formSubmission?: any;
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
            const recordArray = await client.record.getAllRecords({ app: '121', condition: `email="${username}"` });
            if (recordArray.length == 0) res.status(501).json({ ok: false });
            else {
                if (recordArray.length > 1) console.log('Found more than one user with the same email.'); // TODO: add verification

                const user = recordArray[0];
                console.log('user', user);
                // type guard
                if (typeof user['$id'].value !== 'string') {
                    res.status(505);
                    return;
                }

                res.status(200).json({
                    ok: true,
                    name: user['name'].value,
                    ref: user['ref'].value,
                    username: user['email'].value,
                    documents: user['documents'].value,
                    formSubmission: user['formSubmission'].value
                });
            }
        } catch (e: any) {
            console.log(e.errors);
            logError(e, null, 'fetchUserKintone');
            res.status(505);
        }
    } else {
        res.status(405);
    }
}
