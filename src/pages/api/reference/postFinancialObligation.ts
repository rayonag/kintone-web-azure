import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { OnlineVolunteerApplicationAppID } from '@/common/env';
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
                    username: process.env.NEXT_PUBLIC_KINTONE_USERNAME,
                    password: process.env.NEXT_PUBLIC_KINTONE_PASSWORD
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
            } else {
                const addRecord = await client.record.addRecord({
                    app: 82,
                    record: data
                });
            }
            // update Online Volunteer Application app
            const resp = await client.record.updateRecord({
                app: OnlineVolunteerApplicationAppID as string,
                id: data['ref'].value,
                record: {
                    fop: {
                        value: ['ok']
                    }
                }
            });
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
