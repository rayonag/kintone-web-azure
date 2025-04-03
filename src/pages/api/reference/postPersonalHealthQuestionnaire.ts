import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import notificationApplicationUpdated from '../hooks/notification';
import { REST_OnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import { OnlineVolunteerApplicationAppID } from '@/common/env';
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
                    username: process.env.NEXT_PUBLIC_KINTONE_USERNAME,
                    password: process.env.NEXT_PUBLIC_KINTONE_PASSWORD
                }
            });
            const addRecord = await client.record.addRecord({
                app: '17',
                record: data
            });
            const applicationMasterRecord = await client.record.getRecord<REST_OnlineVolunteerApplication>({
                app: OnlineVolunteerApplicationAppID as string,
                id: data['ref'].value
            });
            // const resp2 = await notificationApplicationUpdated(
            //     res,
            //     'healthQuestionnaire',
            //     applicationMasterRecord.record,
            //     'healthQuestionnaireSubmission'
            // );
            if (applicationMasterRecord.record['formSubmission'].value.findIndex((arr) => arr == 'Personal Health Questionnaire') == -1) {
                const resp3 = await client.record.updateRecord({
                    app: OnlineVolunteerApplicationAppID as string,
                    id: data['ref'].value,
                    record: {
                        formSubmission: {
                            value: [...applicationMasterRecord.record['formSubmission'].value, 'Personal Health Questionnaire']
                        }
                    }
                });
            }
            res.status(200).json({
                username: addRecord,
                password: addRecord
            });
        } catch (e: any) {
            logError(e, req.body, 'postPersonalHealthQuestionnaire');
            res.status(505);
        }
    } else {
        res.status(405);
    }
}
