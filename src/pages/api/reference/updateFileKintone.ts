import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { KintonePassword, KintoneUserName, VolunteerApplicationAppID, VolunteerApplicationMasterAppID } from '@/common/env';
import handleNullOrEmpty from '../common/handleNullOrEmpty';
import notificationApplicationUpdated, { updated } from '../hooks/notification';
import logError from '@/common/logError';
import { REST_VolunteerApplicationForm } from '@/types/VolunteerApplicationForm';
import { REST_VolunteerApplicationMaster } from '@/types/VolunteerApplicationMaster';

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
            console.log('data', data.userApplicationRef);
            console.log('data.field', data.field);
            console.log('data.fileKey', data.fileKey);
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
            const currentRecord = await client.record.getAllRecords<REST_VolunteerApplicationForm>({
                app: VolunteerApplicationAppID as string,
                condition: `$id="${userApplicationRef}"`
            });
            console.log('currentRecord[0]', currentRecord[0]);
            console.log('currentRecord[0][field]', currentRecord[0][field]);
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
            const oldRecord = await client.record.getRecord<REST_VolunteerApplicationMaster>({
                app: VolunteerApplicationMasterAppID as string,
                id: userRef
            });
            const documents = oldRecord.record['documents'].value as string[];
            console.log('oldRecord', oldRecord);
            console.log('documents', documents);
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
            const newRecord = await client.record.getRecord({
                app: VolunteerApplicationMasterAppID as string,
                id: userRef
            });
            const resp2 = await notificationApplicationUpdated(res, field as any, newRecord.record, 'documentSubmission');
            // console.log('resp2', resp2);
            // res.status(200).json({
            //     res: resp,
            //     resp2: resp2 || 'No notification sent'
            // });
            res.end();
            return;
        } catch (e: any) {
            logError(e, req.body, 'updateFileKintone');
            res.status(505).json({
                res: 'Something went wrong. Could not update Kintone record.'
            });
        }
    } else {
        res.status(405);
    }
}
