import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { KintonePassword, KintoneUserName, VolunteerApplicationMasterAppID } from '@/common/env';
import handleNullOrEmpty from '../../hooks/handleNullOrEmpty';
import logError from '@/common/logError';
import { REST_OnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';

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
            const resp = await client.record.getRecord<REST_OnlineVolunteerApplication>({
                app: VolunteerApplicationMasterAppID as string,
                id: userRef
            });
            if (resp.record['formSubmission'].value.findIndex((arr) => arr == 'Personal Health Questionaire')) {
                res.status(200).json({
                    res: resp
                });
                res.end();
                return;
            }
            // now only Personal Health Questionaire in use
            const resp2 = await client.record.updateRecord({
                app: VolunteerApplicationMasterAppID as string,
                id: userRef,
                record: {
                    formSubmission: { value: [...resp.record['formSubmission'].value, 'Personal Health Questionaire'] }
                }
            });
            res.status(200).json({
                res: resp
            });
            res.end();
            return;
        } catch (e: any) {
            logError(e, req.body, 'postFormSubmission');
            res.status(505).json({
                res: e
            });
        }
    } else {
        res.status(405);
    }
}
