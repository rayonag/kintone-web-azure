import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { KintonePassword, KintoneUserName, VolunteerApplicationAppID, VolunteerApplicationMasterAppID } from '@/common/env';
import handleNullOrEmpty from '../../hooks/handleNullOrEmpty';
import logError from '@/common/logError';

type Data = {
    res?: any;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            type ReqData = {
                userRef: string;
            };
            const data: ReqData | undefined = JSON.parse(req.body);
            if (!data) {
                handleNullOrEmpty({ res: res, errorMessage: 'No data' });
                return;
            }
            const userRef = data.userRef;
            if (!userRef) {
                handleNullOrEmpty({ res: res, errorMessage: 'No userRef' });
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
            // field value to 'false'
            const resp = await client.record.updateRecord({
                app: VolunteerApplicationMasterAppID as string,
                id: userRef,
                record: {
                    isComplete: { value: true }
                }
            });
            res.status(200).json({
                res: resp
            });
            res.end();
            return;
        } catch (e: any) {
            logError(e, req.body, 'postIsComplete');
            res.status(505).json({
                res: 'Something went wrong. Failed to update kintone'
            });
        }
    } else {
        res.status(405);
    }
}
