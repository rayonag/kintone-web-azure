import { KintonePassword, KintoneUserName, PledgesAppID, VolunteerProfieAppID } from '@/common/env';
import { REST_SavedVolunteerProfile } from '@/types/VolunteerProfile';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { NextApiResponse } from 'next';
import { calcAge, calcVacation, calcVacationDeputationTaken, calcWorkingYears } from '../../hooks/calc';
import logError from '@/common/logError';

const updateVolunteerProfile = async (res: NextApiResponse) => {
    try {
        const client = new KintoneRestAPIClient({
            baseUrl: 'https://bfp.kintone.com',
            // Use system administrator
            auth: {
                username: KintoneUserName,
                password: KintonePassword
            }
        });
        const records = await client.record.getAllRecords<REST_SavedVolunteerProfile>({
            app: PledgesAppID as string,
            // filter only active pledges
            condition: 'status in ("Active")'
        });
        const updatePromises = records.map(async (record) => {
            const updateRecord = {};
            // working years
            const years = calcWorkingYears(record);
            if (parseInt(years).toFixed(1) !== parseInt(record['Years'].value).toFixed(1)) Object.assign(updateRecord, { Years: { value: years } });

            // temp disable
            // // work status
            // const history = getWorkHistoryCurrent(record);
            // // if no history make inactive, is there better validation?
            // if (!history) {
            //     Object.assign(updateRecord, { Personal_Status: { value: 'Inactive' } });
            // } else if (history['startDate']) {
            //     const startDate = DateTime.fromISO(history['startDate'].value || '');
            //     if (startDate < DateTime.now() && record['Personal_Status'].value !== 'Current') {
            //         Object.assign(updateRecord, { Personal_Status: { value: 'Current' } });
            //     }
            // }

            // age
            const age = record['DateOfBirth'].value ? calcAge(record['DateOfBirth'].value) : record['age'].value;
            if (age !== record['age'].value) Object.assign(updateRecord, { age: { value: age } });
            // vacation update on Jan 1 every year
            const today = new Date();
            if (today.getMonth() == 0 && today.getDate() == 1) {
                // refresh vacation taken
                Object.assign(updateRecord, {
                    vacationTaken: { value: await calcVacationDeputationTaken(record, 'Vacation') },
                    deputationTaken: { value: await calcVacationDeputationTaken(record, 'Deputation') }
                });
                // return if Zealous, Short-term
                if (record['WorkerType'].value == 'Zealous' || record['WorkerType'].value == 'Short-term') {
                } else if (record['WorkerType'].value == 'Volunteer' || record['WorkerType'].value == 'Paid') {
                    if (record['OverrideAllowance'].value[0] != 'Override') {
                        const vacation = calcVacation(record);
                        if (vacation?.toString() !== record['vacation'].value) Object.assign(updateRecord, { vacation: { value: vacation } });
                    }
                }
            }
            return {
                id: record['$id'].value,
                record: updateRecord
            };
        });
        const updateRecords = await Promise.all(updatePromises);
        // filter out records that have no changes
        const filteredUpdatedRecords = updateRecords.filter((record) => Object.keys(record.record).length > 0);

        const resp = await client.record.updateAllRecords({
            app: VolunteerProfieAppID as string,
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
