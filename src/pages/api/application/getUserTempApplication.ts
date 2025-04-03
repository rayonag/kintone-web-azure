import { KintoneRecordField, KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { KintonePassword, KintoneUserName, VolunteerApplicationAppID } from '@/common/env';
import logError from '@/common/logError';
import { REST_VolunteerApplicationForm } from '@/types/VolunteerApplicationForm';
import kintoneClient from '@/common/kintoneClient';

type Data = {
    res: REST_VolunteerApplicationForm | undefined;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const ref = req.body;
            const client = kintoneClient;
            const resp = await client.record.getAllRecords<REST_VolunteerApplicationForm>({
                app: VolunteerApplicationAppID as string,
                condition: `ref="${ref}" and currentStep != "Complete"`,
                orderBy: '$id desc'
            });
            if (resp.length == 0) {
                res.json({
                    res: undefined
                });
                return;
            } else if (resp.length > 1) {
                res.json({
                    res: resp[0]
                });
                res.end(); // return the newest application
                return;
            } else if (resp.length == 1) {
                res.json({
                    res: resp[0]
                });
                res.end();
                return;
            } else {
                res.json({
                    res: undefined
                });
                res.end();
                return;
            }
        } catch (e: any) {
            logError(e, null, 'getUserApplicationRef');
            res.json({
                res: undefined
            });
            res.status(505);
        }
    } else {
        res.status(405);
    }
}
