// import { KintonePassword, KintoneUserName } from '@/common/env';
// import logError from '@/common/logError';
// import { KintoneRestAPIClient } from '@kintone/rest-api-client';
// import { Status, Type, NationalOffice, FormSubmission, Documents, DocumentsUS } from './context/volunteerApplicationMasterfields';

// interface DashboardUser {
//     type: Type;
//     status: Status;
//     office: NationalOffice;
//     name?: any;
//     username?: any;
//     formSubmission: FormSubmission;
//     documents: Documents;
//     documentsUS: DocumentsUS;
//     ref: any;
//     userApplicationRef: any;
// }
// /**
//  * @function Fetch user from server side
//  */
// const fetchUserFromServer = async (ref: string): Promise<DashboardUser> => {
//     try {
//         const data = req.body;
//         const username = data.username;
//         const client = new KintoneRestAPIClient({
//             baseUrl: 'https://bfp.kintone.com',
//             // Use password authentication
//             auth: {
//                 username: KintoneUserName,
//                 password: KintonePassword
//             }
//         });
//         const recordArray = await client.record.getAllRecords({ app: '121', condition: `email="${username}"` });
//         if (recordArray.length == 0) res.status(501).json({ ok: false });
//         else {
//             if (recordArray.length > 1) console.log('Found more than one user with the same email.'); // TODO: add verification

//             const user = recordArray[0];
//             console.log('user', user);
//             // type guard
//             if (typeof user['$id'].value !== 'string') {
//                 res.status(505);
//                 return;
//             }

//             res.status(200).json({
//                 ok: true,
//                 name: user['name'].value,
//                 ref: user['ref'].value,
//                 username: user['email'].value,
//                 documents: user['documents'].value,
//                 formSubmission: user['formSubmission'].value,
//                 office: user['office'].value
//             });
//         }
//     } catch (e: any) {
//         console.log(e.errors);
//         logError(e, null, 'fetchUserKintone');
//         res.status(505);
//     }
// };
// export default fetchUserFromServer;
