import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { KintonePassword, KintoneUserName, VolunteerApplicationAppID, OnlineVolunteerApplicationAppID } from '@/common/env';
import handleNullOrEmpty from '../hooks/handleNullOrEmpty';
import notificationApplicationUpdated, { updated } from '../hooks/notification';
import logError from '@/common/logError';
import { REST_SavedVolunteerApplicationForm, REST_VolunteerApplicationForm } from '@/types/VolunteerApplicationForm';
import { REST_OnlineVolunteerApplication, REST_SavedOnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import {
    Necessary_Documents,
    Necessary_Documents_ShortTerm,
    Necessary_Documents_ShortTerm_USA,
    Necessary_Documents_USA,
    NecessaryDocuments
} from '@/constants/necessaryDocuments';

type Data = {
    res?: any;
    resp2?: any;
};

export type ReqData = {
    userApplicationRef: string;
    userRef: string;
    field: NecessaryDocuments;
    fileKey: string;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const data: ReqData | undefined = JSON.parse(req.body);
            if (!data) {
                return handleNullOrEmpty({ res: res, errorMessage: 'No data' });
            }
            const userApplicationRef = data.userApplicationRef;
            const userRef = data.userRef;
            const field = data.field;
            const fileKey = data.fileKey;
            if (!userApplicationRef) {
                return handleNullOrEmpty({ res: res, errorMessage: 'No userApplicationRef' });
            } else if (!field) {
                return handleNullOrEmpty({ res: res, errorMessage: 'No field' });
            } else if (!fileKey) {
                return handleNullOrEmpty({ res: res, errorMessage: 'No fileKey' });
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
            const currentRecord = await client.record
                .getAllRecords<REST_VolunteerApplicationForm>({
                    app: VolunteerApplicationAppID as string,
                    condition: `$id="${userApplicationRef}"`
                })
                .catch((e) => {
                    throw new Error('currentRecord:' + e);
                });
            const resp = await client.record.updateRecord({
                app: VolunteerApplicationAppID as string,
                id: userApplicationRef,
                record: {
                    [field]: {
                        value: [...currentRecord[0][field].value, { fileKey: fileKey }]
                    }
                }
            });
            // update formSubmission, 'Necessary Documents', if all documents are submitted
            const dashboardRecord = await client.record
                .getRecord<REST_OnlineVolunteerApplication>({
                    app: OnlineVolunteerApplicationAppID as string,
                    id: userRef
                })
                .then((res) => res.record)
                .catch((e) => {
                    throw new Error('oldRecord:' + e);
                });
            if (!dashboardRecord['formSubmission'].value.includes('Necessary Documents')) {
                const applicationFormRecord = await client.record
                    .getRecord<REST_SavedVolunteerApplicationForm>({
                        app: VolunteerApplicationAppID as string,
                        id: userApplicationRef
                    })
                    .then((res) => res.record);
                const necessaryDocuments = (() => {
                    if (dashboardRecord['office'].value === 'USA') {
                        return dashboardRecord['type'].value == 'Short Term' ? Necessary_Documents_ShortTerm_USA : Necessary_Documents_USA;
                    } else {
                        return dashboardRecord['type'].value == 'Short Term' ? Necessary_Documents_ShortTerm : Necessary_Documents;
                    }
                })();
                if (necessaryDocuments.every((doc) => applicationFormRecord[doc].value[0])) {
                    await client.record.updateRecord({
                        app: OnlineVolunteerApplicationAppID as string,
                        id: userRef,
                        record: {
                            formSubmission: {
                                value: ['Necessary Documents', ...dashboardRecord['formSubmission'].value]
                            }
                        }
                    });
                }
                const newRecord = await client.record
                    .getRecord<REST_SavedOnlineVolunteerApplication>({
                        app: OnlineVolunteerApplicationAppID as string,
                        id: userRef
                    })
                    .catch((e) => {
                        throw new Error('newRecord:' + e);
                    });
                const resp2 = await notificationApplicationUpdated(res, field as any, newRecord.record, 'documentSubmission');
            }
            res.end();
            return;
        } catch (e: any) {
            logError(e, req.body, 'updateFileKintone');
            res.status(505).json({
                res: e
            });
        }
    } else {
        res.status(405);
    }
}
