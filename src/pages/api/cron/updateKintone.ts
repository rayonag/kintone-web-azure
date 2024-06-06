import type { NextApiRequest, NextApiResponse } from 'next';
import logError from '@/common/logError';
import updateVolunteerProfile from './update/updateVolunteerProfile';
import { KintoneUserName, KintonePassword } from '@/common/env';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';

type Data = {
    res?: any;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'GET') {
        try {
            const ref = req.body;
            await updateVolunteerProfile(res);
            // next...
            // pledge program
            // pledge status
            // pledge count
            // children birthday

            // lower priority
            // visa and medical expiry dates and notification

            res.end();
            return;

            // const resp = await client.record.getAllRecords({
            //     app: VolunteerApplicationAppID as string,
            //     condition: `ref="${ref}"`
            // });
            // if (resp.length == 0) {
            //     res.status(601);
            //     res.json({
            //         res: 'No application found'
            //     });
            //     res.end();
            //     return;
            // } else if (resp.length > 1) {
            //     res.json({
            //         res: resp[0]['$id'].value
            //     });
            //     res.end();
            //     logError(`More than one application found: ref=${ref}`, null, 'getUserApplicationRef');
            //     return;
            // } else if (resp.length == 1) {
            //     res.json({
            //         res: resp[0]['$id'].value
            //     });
            //     res.end();
            //     return;
            // } else {
            //     res.json({
            //         res: undefined
            //     });
            //     res.end();
            //     return;
            // }
        } catch (e: any) {
            logError(e, null, 'updateKintone');
            res.json({
                res: 'Something went wrong.'
            });
            res.status(505);
        }
    } else {
        res.status(405);
    }
}
