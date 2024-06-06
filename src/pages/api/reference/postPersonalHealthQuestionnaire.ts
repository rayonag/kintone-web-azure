import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import notificationApplicationUpdated from '../hooks/notification';
import { REST_VolunteerApplicationMaster, VolunteerApplicationMaster } from '@/types/VolunteerApplicationMaster';
import { VolunteerApplicationMasterAppID } from '@/common/env';

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
                    username: process.env.KINTONE_USERNAME,
                    password: process.env.KINTONE_PASSWORD
                }
            });
            const addRecord = await client.record.addRecord({
                app: '17',
                record: data
            });
            const applicationMasterRecord = await client.record.getRecord<REST_VolunteerApplicationMaster>({
                app: VolunteerApplicationMasterAppID as string,
                id: data['ref'].value
            });
            const resp2 = await notificationApplicationUpdated(
                res,
                'healthQuestionnaire',
                applicationMasterRecord.record,
                'healthQuestionnaireSubmission'
            );
            if (applicationMasterRecord.record['formSubmission'].value.findIndex((arr) => arr == 'Personal Health Questionnaire') == -1) {
                const resp3 = await client.record.updateRecord({
                    app: VolunteerApplicationMasterAppID as string,
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
            console.log(e.errors);
            res.status(505);
        }
    } else {
        res.status(405);
    }
}
