import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { KintonePassword, KintoneUserName, VolunteerApplicationAppID } from '@/common/env';
import handleNullOrEmpty from '../hooks/handleNullOrEmpty';
import logError from '@/common/logError';
import { REST_SavedVolunteerApplicationForm, REST_VolunteerApplicationForm } from '@/types/VolunteerApplicationForm';
import kintoneClient from '@/common/kintoneClient';

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
            const client = kintoneClient;
            // check if record already exists
            const resp = await client.record.getAllRecords<REST_SavedVolunteerApplicationForm>({
                app: VolunteerApplicationAppID as string,
                condition: `ref="${record['ref'].value}"`,
                fields: ['ref']
            });
            if (resp.length > 0) {
                const resp2 = await client.record.updateRecord({
                    app: VolunteerApplicationAppID as string,
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
                    app: VolunteerApplicationAppID as string,
                    record: record
                });
                res.status(200).json({
                    res: resp2
                });
                return;
            }
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
