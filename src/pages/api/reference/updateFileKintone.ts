import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { KintonePassword, KintoneUserName, VolunteerApplicationAppID } from '@/common/env';
import handleNullOrEmpty from '../common/handleNullOrEmpty';
import handleCatch from '@/common/handleCatch';

type Data = {
    res?: any;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            type ReqData = {
                userApplicationRef: string;
                field: string;
                fileKey: string;
            };
            const data: ReqData | undefined = JSON.parse(req.body);
            if (!data) {
                handleNullOrEmpty({ res: res, errorMessage: 'No data' });
                return;
            }
            console.log('data', data.userApplicationRef);
            console.log('data.field', data.field);
            console.log('data.fileKey', data.fileKey);
            const userApplicationRef = data.userApplicationRef;
            const field = data.field;
            const fileKey = data.fileKey;
            if (!userApplicationRef) {
                handleNullOrEmpty({ res: res, errorMessage: 'No userApplicationRef' });
                return;
            } else if (!field) {
                handleNullOrEmpty({ res: res, errorMessage: 'No field' });
                return;
            } else if (!fileKey) {
                handleNullOrEmpty({ res: res, errorMessage: 'No fileKey' });
                return;
            }
            // update kintone record
            const client = new KintoneRestAPIClient({
                baseUrl: 'https://bfp.kintone.com',
                // Use password authentication
                auth: {
                    username: KintoneUserName,
                    password: KintonePassword
                }
            });
            const resp = await client.record.updateRecord({
                app: VolunteerApplicationAppID as string,
                id: userApplicationRef,
                record: {
                    [field]: {
                        value: [{ fileKey: fileKey }]
                    }
                }
            });
            res.status(200).json({
                res: resp
            });
            res.end();
            return;
        } catch (e: any) {
            handleCatch(e, req.body, 'updateFileKintone');
            res.status(505).json({
                res: 'Something went wrong. Could not update Kintone record.'
            });
        }
    } else {
        res.status(405);
    }
}
