import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { notificationReferenceSubmitted } from '../hooks/notification';
import { REST_SavedOnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import { KintonePassword, KintoneUserName, ReferenceFormAppID, OnlineVolunteerApplicationAppID } from '@/common/env';
import logError from '@/common/logError';

type Data = {
    username?: any;
    password?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const client = new KintoneRestAPIClient({
                baseUrl: 'https://bfp.kintone.com',
                // Use password authentication
                auth: {
                    username: KintoneUserName,
                    password: KintonePassword
                }
            });
            // get applicant record
            const resp = await client.record
                .getRecord<REST_SavedOnlineVolunteerApplication>({
                    app: OnlineVolunteerApplicationAppID as string,
                    id: data['ref'].value
                })
                .catch((e) => {
                    logError(e, req.body || null, 'postReferenceForm resp');
                    res.status(501).json({});
                    return undefined;
                });
            if (!resp) {
                res.status(501).json({});
                return;
            }
            // save reference form
            const resp3 = await client.record
                .addRecord({
                    app: ReferenceFormAppID as string,
                    record: data
                })
                .catch((e) => {
                    logError(e, req.body || null, 'postReferenceForm resp3');
                    res.status(501).json({});
                    return undefined;
                });
            if (!resp3) {
                res.status(501).json({});
                return;
            }
            // get reference count
            const resp4 = await client.record
                .getAllRecords({
                    app: ReferenceFormAppID as string,
                    condition: `ref=${data['ref'].value}`
                })
                .catch((e) => {
                    logError(e, req.body || null, 'postReferenceForm resp4');
                    res.status(501).json({});
                    return [];
                });
            // update reference count
            const resp5 = await client.record
                .updateRecord({
                    app: OnlineVolunteerApplicationAppID as string,
                    id: resp.record['$id'].value as string,
                    record: {
                        referenceCount: { value: resp4.length }
                    }
                })
                .catch((e) => {
                    logError(e, req.body || null, 'postReferenceForm resp5');
                    res.status(501).json({});
                    return;
                });
            // send notification when all references are submitted
            const requiredReferenceCount = resp.record['type'].value === 'Short Term' ? 3 : 4;
            if (resp4.length >= requiredReferenceCount) {
                const resp2 = await notificationReferenceSubmitted(res, resp.record);
            }

            res.status(200).json({});
        } catch (e: any) {
            logError(e, req.body || null, 'postReferenceForm');
            res.status(505);
        }
    } else {
        res.status(405);
    }
}
