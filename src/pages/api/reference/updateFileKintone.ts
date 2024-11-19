import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { KintonePassword, KintoneUserName, VolunteerApplicationAppID, VolunteerApplicationMasterAppID } from '@/common/env';
import handleNullOrEmpty from '../hooks/handleNullOrEmpty';
import notificationApplicationUpdated, { updated } from '../hooks/notification';
import logError from '@/common/logError';
import { REST_VolunteerApplicationForm } from '@/types/VolunteerApplicationForm';
import { REST_OnlineVolunteerApplication, REST_SavedOnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';

type Data = {
    res?: any;
    resp2?: any;
};
const necessaryDocuments = {
    passport: 'Passport',
    recentPhoto: 'Recent Photo',
    medicalStatusForm: 'Medical Status Form',
    doctorLetter: "Doctor's Letter",
    criminalCheck: 'Criminal Check'
};
const necessaryDocumentsUSA = {
    passport: 'Passport',
    recentPhoto: 'Recent Photo',
    medicalStatusForm: 'Medical Status Form',
    doctorLetter: "Doctor's Letter",
    criminalCheck: 'Criminal Check'
};
const necessaryDocumentsShortTerm = {
    passport: 'Passport',
    recentPhoto: 'Recent Photo',
    medicalStatusForm: 'Medical Status Form',
    doctorLetter: "Doctor's Letter"
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            type ReqData = {
                userApplicationRef: string;
                userRef: string;
                field: keyof typeof necessaryDocuments;
                fileKey: string;
            };
            const data: ReqData | undefined = JSON.parse(req.body);
            if (!data) {
                handleNullOrEmpty({ res: res, errorMessage: 'No data' });
                return;
            }
            const userApplicationRef = data.userApplicationRef;
            const userRef = data.userRef;
            const field = data.field;
            const fileKey = data.fileKey;
            if (!userApplicationRef) {
                handleNullOrEmpty({ res: res, errorMessage: 'No userApplicationRef' });
                return;
            } else if (!field) {
                handleNullOrEmpty({ res: res, errorMessage: 'No field' });
                return;
            } else if (!fileKey) {
                handleNullOrEmpty({ res: res, errorMessage: 'No fileKey' });
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
            // TODO: come up with a better way to handle this
            const oldRecord = await client.record
                .getRecord<REST_OnlineVolunteerApplication>({
                    app: VolunteerApplicationMasterAppID as string,
                    id: userRef
                })
                .catch((e) => {
                    throw new Error('oilRecord:' + e);
                });
            const documents = oldRecord.record['documents'].value as string[];
            if (!documents.includes(updated[field])) {
                const updatedDocuments = [...(oldRecord.record['documents'].value as string[]), updated[field]];
                const necDoc =
                    oldRecord.record['office'].value === 'USA'
                        ? necessaryDocumentsUSA
                        : oldRecord.record['type'].value == 'Short Term'
                        ? necessaryDocumentsShortTerm
                        : necessaryDocuments;
                await client.record.updateRecord({
                    app: VolunteerApplicationMasterAppID as string,
                    id: userRef,
                    record: {
                        documents: {
                            value: updatedDocuments
                        },
                        // update status to 'documentSubmitted' if all documents are submitted
                        status: {
                            value:
                                updatedDocuments.length === Object.keys(necDoc).length ? 'Necessary Documents Submitted' : 'Complete Application Form'
                        }
                    }
                });
            }
            const newRecord = await client.record
                .getRecord<REST_SavedOnlineVolunteerApplication>({
                    app: VolunteerApplicationMasterAppID as string,
                    id: userRef
                })
                .catch((e) => {
                    throw new Error('newRecord:' + e);
                });
            const resp2 = await notificationApplicationUpdated(res, field as any, newRecord.record, 'documentSubmission');
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
