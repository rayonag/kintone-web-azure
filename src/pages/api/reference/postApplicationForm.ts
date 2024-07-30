import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import notificationApplicationUpdated from '../hooks/notification';
import { REST_OnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
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
            const applicationMasterRecord = await client.record.getRecord<REST_OnlineVolunteerApplication>({
                app: VolunteerApplicationMasterAppID as string,
                id: data['ref']
            });
            const resp2 = await notificationApplicationUpdated(res, 'application', applicationMasterRecord.record, 'applicationSubmission');
            //console.log('resp2', resp2);
            res.status(200).json({});
        } catch (e: any) {
            console.log(e.errors);
            res.status(505);
        }
    } else {
        res.status(405);
    }
}
