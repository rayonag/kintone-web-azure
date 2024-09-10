import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
    KintonePassword,
    KintoneUserName,
    TempVolunteerApplicationAppID,
    VolunteerApplicationAppID,
    VolunteerApplicationMasterAppID
} from '@/common/env';
import handleNullOrEmpty from '../hooks/handleNullOrEmpty';
import logError from '@/common/logError';
import { REST_OnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import { REST_SavedVolunteerApplicationForm, REST_VolunteerApplicationForm, VolunteerApplicationForm } from '@/types/VolunteerApplicationForm';

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
            // check if record already exists
            const resp = await client.record.getAllRecords<REST_SavedVolunteerApplicationForm>({
                app: 235, //TempVolunteerApplicationAppID as string,
                condition: `ref="${record.ref.value}" and keepingTempRecord in ("true")`,
                fields: ['ref']
            });
            if (resp.length > 0) {
                const resp2 = await client.record.updateRecord({
                    app: 235, // TempVolunteerApplicationAppID as string,
                    id: resp[0]['$id'].value,
                    record: record
                });
                res.status(200).json({
                    res: resp2
                });
                return;
            }
            if (!resp || resp.length === 0) {
                const resp2 = await client.record.addRecord({
                    app: 235, //TempVolunteerApplicationAppID as string,
                    record: record
                });
                res.status(200).json({
                    res: resp2
                });
                return;
            }

            // const resp = await client.record.getRecord<REST_OnlineVolunteerApplication>({
            //     app: VolunteerApplicationMasterAppID as string,
            //     id: userRef
            // });
            // if (resp.record['formSubmission'].value.findIndex((arr) => arr == 'Personal Health Questionaire')) {
            //     res.status(200).json({
            //         res: resp
            //     });
            //     res.end();
            //     return;
            // }
            // // now only Personal Health Questionaire in use
            // const resp2 = await client.record.updateRecord({
            //     app: VolunteerApplicationMasterAppID as string,
            //     id: userRef,
            //     record: {
            //         formSubmission: { value: [...resp.record['formSubmission'].value, 'Personal Health Questionaire'] }
            //     }
            // });
            res.status(200).json({
                res: resp
            });
            return;
        } catch (e: any) {
            logError(e, req.body, 'postTempApplicationForm');
            res.status(505).json({
                res: e
            });
        }
    } else {
        res.status(405);
    }
}
