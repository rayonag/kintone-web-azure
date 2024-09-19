import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import notificationApplicationUpdated from '../hooks/notification';
import { REST_OnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import { VolunteerApplicationMasterAppID } from '@/common/env';
import logError from '@/common/logError';

type Data = {
    ok?: any;
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
            // check if the record exists
            const recordExists = await client.record.getAllRecords({
                app: 82,
                condition: `ref="${data['ref'].value}"`
            });
            if (recordExists.length > 0) {
                // update the record
                const updateRecord = await client.record.updateRecord({
                    app: 82,
                    id: recordExists[0].$id.value as any, // review type
                    record: data
                });
                console.log('updateRecord', updateRecord);
            } else {
                const addRecord = await client.record.addRecord({
                    app: 82,
                    record: data
                });
            }
            res.status(200).json({
                ok: true
            });
            return;
        } catch (e: any) {
            logError(e, req.body, 'postPersonalHealthQuestionnaire');
            res.status(505).json({});
            return;
        }
    } else {
        res.status(405).json({});
        return;
    }
}
