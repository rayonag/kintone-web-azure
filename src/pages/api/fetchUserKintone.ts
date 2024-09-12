import { KintonePassword, KintoneUserName } from '@/common/env';
import logError from '@/common/logError';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    ok: boolean;
    name?: any;
    knownAs?: any;
    returnRef?: any;
    ref?: any;
    username?: any;
    documents?: any;
    formSubmission?: any;
    office?: any;
    type?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const username = data.username.toLowerCase();
            const client = new KintoneRestAPIClient({
                baseUrl: 'https://bfp.kintone.com',
                // Use password authentication
                auth: {
                    username: KintoneUserName,
                    password: KintonePassword
                }
            });
            const recordArray = await client.record.getAllRecords({ app: '121', condition: `email="${username}"`, orderBy: 'ref desc' });
            if (recordArray.length == 0) res.status(501).json({ ok: false });
            else {
                //if (recordArray.length > 1) console.log('Found more than one user with the same email.'); // TODO: add verification

                const user = recordArray[0];
                // type guard
                if (typeof user['$id'].value !== 'string') {
                    res.status(505);
                    return;
                }

                res.status(200).json({
                    ok: true,
                    username: user['email'].value,
                    ref: user['ref'].value,
                    name: user['name'].value,
                    knownAs: user['knownAs'].value,
                    returnRef: user['returnRef'].value,
                    documents: user['documents'].value,
                    formSubmission: user['formSubmission'].value,
                    office: user['office'].value,
                    type: user['type'].value
                });
            }
        } catch (e: any) {
            logError(e, req.body, 'fetchUserKintone');
            res.status(505);
        }
    } else {
        res.status(405);
    }
}
