import { KintonePassword, KintoneUserName, VolunteerProfieAppID } from '@/common/env';
import { REST_SavedVolunteerProfile, REST_VolunteerProfile } from '@/types/VolunteerProfile';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { NextApiResponse } from 'next';
import { calcAge, calcWorkingYears } from './calc';
import logError from '@/common/logError';

const updateVolunteerProfile = async (res: NextApiResponse) => {
    try {
        const client = new KintoneRestAPIClient({
            baseUrl: 'https://bfp.kintone.com',
            // Use password authentication
            auth: {
                username: KintoneUserName,
                password: KintonePassword
            }
        });
        const records = await client.record.getAllRecords<REST_SavedVolunteerProfile>({
            app: VolunteerProfieAppID as string, //119, //
            condition: 'Personal_Status in ("Current")'
        });
        const updateRecords = records.map((record) => {
            const returnRecord = {};
            const years = calcWorkingYears(record['startDate'].value, record['endDate'].value);
            const age = calcAge(record['DateOfBirth'].value);
            if (years !== record['Years'].value) Object.assign(returnRecord, { Years: { value: years } });
            if (age !== record['age'].value) Object.assign(returnRecord, { age: { value: age } });
            return {
                id: record['$id'].value,
                record: returnRecord
            };
        });
        // filter out records that have no changes
        const filteredUpdatedRecords = updateRecords.filter((record) => Object.keys(record.record).length > 0);

        const resp = await client.record.updateAllRecords({
            app: VolunteerProfieAppID as string, //119, //
            records: filteredUpdatedRecords
        });

        res.json({
            res: 'done'
        });

        return;
    } catch (e) {
        logError(e, null, 'updateVolunteerProfile');
        res.json({
            res: e
        });
        return;
    }
};
export default updateVolunteerProfile;
