import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { KintonePassword, KintoneUserName, VolunteerApplicationAppID, VolunteerApplicationMasterAppID } from '@/common/env';
import handleNullOrEmpty from '../hooks/handleNullOrEmpty';
import logError from '@/common/logError';
import { REST_OnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import { REST_VolunteerApplicationForm, VolunteerApplicationForm } from '@/types/VolunteerApplicationForm';
import notificationApplicationUpdated from '../hooks/notification';

type Data = {
    res?: any;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            type ReqData = {
                record: REST_VolunteerApplicationForm;
            };
            const data: ReqData | undefined = JSON.parse(req.body);
            if (!data) {
                handleNullOrEmpty({ res: res, errorMessage: 'No data' });
                return;
            }
            const record = data.record;
            if (!record) {
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
            const resp2 = await client.record.getAllRecords<REST_OnlineVolunteerApplication>({
                app: VolunteerApplicationMasterAppID as string,
                condition: `ref=${record['ref'].value}`
            });
            if (resp2.length === 0) {
                logError('No online volunteer application record found: resp2', req.body, 'postApplicationForm');
                res.status(200).json({
                    res: resp2
                });
                return;
            }
            const resp = await client.record.updateRecord({
                app: VolunteerApplicationAppID as string,
                id: resp2[0]['applicationRef'].value,
                record: record
            });
            const resp3 = await notificationApplicationUpdated(res, 'application', resp2[0], 'applicationSubmission');
            // TODO: add resp3 handler
            res.status(200).json({
                res: resp
            });
            return;
        } catch (e: any) {
            logError(e, req.body, 'postApplicationForm');
            res.status(505).json({
                res: e
            });
        }
    } else {
        res.status(405);
    }
}
