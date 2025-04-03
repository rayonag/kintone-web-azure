import { KintoneRestAPIClient } from '@kintone/rest-api-client';

const kintoneClient = new KintoneRestAPIClient({
    baseUrl: 'https://bfp.kintone.com',
    auth: {
        username: process.env.NEXT_PUBLIC_KINTONE_USERNAME,
        password: process.env.NEXT_PUBLIC_KINTONE_PASSWORD
    }
});
export default kintoneClient;
