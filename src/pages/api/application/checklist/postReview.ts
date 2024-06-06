import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { KintonePassword, KintoneUserName, VolunteerApplicationAppID, VolunteerApplicationMasterAppID } from '@/common/env';
import handleNullOrEmpty from '../../common/handleNullOrEmpty';
import handleCatch from '@/common/handleCatch';
import logError from '@/common/logError';

type Data = {
    res?: any;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            type ReqData = {
                field: string;
                userRef: string;
            };
            const data: ReqData | undefined = JSON.parse(req.body);
            if (!data) {
                handleNullOrEmpty({ res: res, errorMessage: 'No data' });
                return;
            }
            const field = data.field;
            const userRef = data.userRef;
            if (!userRef) {
                handleNullOrEmpty({ res: res, errorMessage: 'No userRef' });
                return;
            } else if (!field) {
                handleNullOrEmpty({ res: res, errorMessage: 'No field' });
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
            // field value should be 'ok'
            const resp = await client.record.updateRecord({
                app: VolunteerApplicationMasterAppID as string,
                id: userRef,
                record: {
                    [field]: {
                        value: ['ok']
                    }
                }
            });
            res.status(200).json({
                res: resp
            });
            res.end();
            return;
        } catch (e: any) {
            logError(e, req.body, 'postReview');
            res.status(505).json({
                res: 'Something went wrong. Failed to update kintone checklist'
            });
        }
    } else {
        res.status(405);
    }
}
