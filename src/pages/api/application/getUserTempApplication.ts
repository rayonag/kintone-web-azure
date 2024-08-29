import { KintoneRecordField, KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { KintonePassword, KintoneUserName, TempVolunteerApplicationAppID, VolunteerApplicationAppID } from '@/common/env';
import logError from '@/common/logError';
import { REST_VolunteerApplicationForm } from '@/types/VolunteerApplicationForm';

type Data = {
    res: REST_TempVolunteerApplicationForm | undefined;
};
type REST_TempVolunteerApplicationForm = REST_VolunteerApplicationForm & { keepingTempRecord: KintoneRecordField.RadioButton };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const ref = req.body;
            const client = new KintoneRestAPIClient({
                baseUrl: 'https://bfp.kintone.com',
                // Use password authentication
                auth: {
                    username: KintoneUserName,
                    password: KintonePassword
                }
            });
            const resp = await client.record.getAllRecords<REST_TempVolunteerApplicationForm>({
                app: 235, //TempVolunteerApplicationAppID as string, TODO: change to env
                condition: `ref="${ref}" and keepingTempRecord in ("true")`,
                orderBy: 'createdTime desc'
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
            console.log('hell');
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
