import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { kintonePassword, kintoneUserName, volunteerApplicationAppID } from '../../../../../common/env';
import formidable from 'formidable';
import multer from 'multer';

type Data = {
    res?: any;
};
export const config = {
    api: {
        bodyParser: false
    }
};
const upload = multer();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // TODO: this is not working. Next 13, pages router, FormData(); come back later. for now use FormBridge to upload files
    // if (req.method === 'POST') {
    //     try {
    //         const data = req.body;
    //         console.log(data);
    //         // const f = data.formData();
    //         // console.log('f', f);
    //         // const form = new formidable.IncomingForm();
    //         // Access formData values by iterating over the keys
    //         const formDataObject: { [key: string]: any } = {};
    //         console.log('hey');
    //         console.log('data');
    //         res.status(400).json({ res: 'AppID not found.' });
    //         return;
    //         for (const key of data.keys()) {
    //             console.log('hey2');
    //             formDataObject[key] = data.get(key);
    //         }
    //         // Now you can access individual values using formDataObject
    //         const name = formDataObject['name'];
    //         const ref = formDataObject['ref'];
    //         console.log('hey3');
    //         // Example: Send the values to Kintone
    //         console.log('Name:', name);
    //         console.log('Ref:', ref);
    //         const client = new KintoneRestAPIClient({
    //             baseUrl: 'https://bfp.kintone.com',
    //             // Use password authentication
    //             auth: {
    //                 username: kintoneUserName,
    //                 password: kintonePassword
    //             }
    //         });
    //         console.log('data');
    //         console.log('here');
    //         if (volunteerApplicationAppID == undefined) res.status(400).json({ res: 'AppID not found.' });
    //         console.log('ref');
    //         console.log('data', data);
    //         console.log(data.get('name'));
    //         const applicationRecord = await client.record.getAllRecords({
    //             app: volunteerApplicationAppID,
    //             fields: ['$id', 'medicalStatusForm'],
    //             condition: `ref = "${ref}"`
    //         });
    //         console.log('applicationRecord', applicationRecord);
    //         if (applicationRecord.length == 0) res.status(400).json({ res: 'Record not found.' });
    //         //else if (applicationRecord['medicalStatusForm'].value.length > 0) res.status(400).json({ res: 'Medical Form exists already' });
    //         // upload file to Kintone
    //         const formData = data.formData;
    //         console.log('formData', formData);
    //         console.log('formData', formData.get('name'));
    //         const dataName = formData.get('name');
    //         const { fileKey } = await client.file.uploadFile({
    //             file: {
    //                 name: dataName,
    //                 data: formData.get('attachment')
    //             }
    //         });
    //         console.log('fileKey', fileKey);
    //         const updateRecord = await client.record.updateRecord({
    //             app: volunteerApplicationAppID,
    //             id: applicationRecord.$id.value,
    //             record: {
    //                 medicalStatusForm: {
    //                     value: [
    //                         {
    //                             name: dataName,
    //                             fileKey: fileKey
    //                         }
    //                     ]
    //                 }
    //             }
    //         });
    //         res.status(200).json({
    //             res: updateRecord
    //         });
    //     } catch (e: any) {
    //         console.log(e.errors);
    //         res.status(505);
    //     }
    // } else {
    //     res.status(405);
    // }
}
