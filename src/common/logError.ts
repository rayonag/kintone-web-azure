import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { ErrorLogsAPIKey, ErrorLogsAppID, KintonePassword, KintoneUserName } from './env';
import useUserStore from '@/features/common/store';

const logError = (e: any, records?: any, functionName?: string) => {
    console.log('logError', e);
    const app = 'Azure Web';
    const client = new KintoneRestAPIClient({
        baseUrl: 'https://bfp.kintone.com',
        // Use password authentication
        auth: {
            username: KintoneUserName,
            password: KintonePassword
        }
    });

    let err = `Fn: ${functionName}\n`;
    if (err) err += `e:${JSON.stringify(e)}\n`;
    if (e.stack) err += `e.stack:${JSON.stringify(e.stack)}\n`;
    if (e.errors) err += `e.errors:${JSON.stringify(e.errors)}\n`;
    if (records) err += `Record:${JSON.stringify(records)}`;

    // if client side, log user
    if (typeof window !== 'undefined') {
        const user = useUserStore();
        if (user) {
            err += `User:${JSON.stringify(user)}`;
        }
    }
    return client.record.addRecord({
        app: ErrorLogsAppID as string,
        record: {
            app: {
                value: app
            },
            log: {
                value: err
            }
        }
    });
};
export default logError;
