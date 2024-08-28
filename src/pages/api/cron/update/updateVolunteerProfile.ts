import { KintonePassword, KintoneUserName, VolunteerProfieAppID } from '@/common/env';
import { REST_SavedVolunteerProfile } from '@/types/VolunteerProfile';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { NextApiResponse } from 'next';
import { calcAge, calcVacation, calcVacationDeputationTaken, calcWorkingYears } from '../../hooks/calc';
import logError from '@/common/logError';
import { DateTime } from 'luxon';
import getWorkHistoryCurrent from '../../hooks/getWorkHistoryCurrent';

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
            condition: 'Personal_Status in ("Current","Incoming")'
        });
        const updatePromises = records.map(async (record) => {
            const returnRecord = {};
            // working years
            const years = calcWorkingYears(record);
            if (parseInt(years).toFixed(1) !== parseInt(record['Years'].value).toFixed(1)) Object.assign(returnRecord, { Years: { value: years } });
            // work status
            const history = getWorkHistoryCurrent(record);
            // if no history make inactive, is there better validation?
            if (!history) {
                Object.assign(returnRecord, { Personal_Status: { value: 'Inactive' } });
            } else if (history['startDate']) {
                const startDate = DateTime.fromISO(history['startDate'].value || '');
                if (startDate < DateTime.now() && record['Personal_Status'].value !== 'Current') {
                    Object.assign(returnRecord, { Personal_Status: { value: 'Current' } });
                }
            }
            // age
            const age = calcAge(record['DateOfBirth'].value);
            if (age !== record['age'].value) Object.assign(returnRecord, { age: { value: age } });
            // vacation update on Jan 1 every year
            const today = new Date();
            if (today.getMonth() == 0 && today.getDate() == 1) {
                console.log('started');
                // refresh vacation taken
                Object.assign(returnRecord, {
                    vacationTaken: { value: await calcVacationDeputationTaken(record, 'Vacation') },
                    deputationTaken: { value: await calcVacationDeputationTaken(record, 'Deputation') }
                });
                // return if Zealous, Short-term, or no start date
                if (record['WorkerType'].value == 'Zealous' || record['WorkerType'].value == 'Short-term' || !record['startDate'].value) {
                } else if (record['WorkerType'].value == 'Volunteer' || record['WorkerType'].value == 'Paid') {
                    if (record['OverrideAllowance'].value[0] != 'Override') {
                        const vacation = calcVacation(record);
                        if (vacation?.toString() !== record['vacation'].value) Object.assign(returnRecord, { vacation: { value: vacation } });
                    }
                }
            }
            return {
                id: record['$id'].value,
                record: returnRecord
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
