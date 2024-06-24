import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import notificationApplicationUpdated, { notificationReferenceSubmitted } from '../hooks/notification';
import {
    REST_SavedVolunteerApplicationMaster,
    REST_VolunteerApplicationMaster,
    VolunteerApplicationMaster
} from '@/types/VolunteerApplicationMaster';
import { KintonePassword, KintoneUserName, ReferenceFormAppID, VolunteerApplicationMasterAppID } from '@/common/env';

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
            console.log('data', data);
            const resp = await client.record.getRecord<REST_SavedVolunteerApplicationMaster>({
                app: VolunteerApplicationMasterAppID as string,
                id: data['ref']
            });
            console.log('resp', resp);
            const referenceForm = await client.record.getAllRecords({
                app: ReferenceFormAppID as string,
                condition: `ref="${data['ref']}"`
            });
            const resp3 = await client.record.updateRecord({
                app: ReferenceFormAppID as string,
                id: referenceForm[0]['$id'].value as string,
                record: {
                    office: { value: [{ code: resp.record['office'].value }] }
                }
            });
            console.log('resp3', resp3);
            const resp2 = await notificationReferenceSubmitted(res, resp.record);
            console.log('resp2', resp2);
            //console.log('resp2', resp2);
            res.status(200).json({});
        } catch (e: any) {
            console.log('e', e);
            console.log(e.errors);
            res.status(505);
        }
    } else {
        res.status(405);
    }
}
