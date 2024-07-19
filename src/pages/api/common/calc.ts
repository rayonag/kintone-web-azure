import { KintoneUserName, KintonePassword, TimesheetAppID } from '@/common/env';
import handleCatch from '@/common/handleCatch';
import { REST_VolunteerProfile, REST_SavedVolunteerProfile } from '@/types/VolunteerProfile';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { DateTime } from 'luxon';

/**
 * @function calculate the service year
 * @param {Date} startDate
 */
export const calcWorkingYears = (record: REST_VolunteerProfile) => {
    let years = 0;
    if (record['startDate'].value) {
        const startDateObj = DateTime.fromISO(record['startDate'].value);
        if (record['endDate'].value) {
            const endDateObj =
                DateTime.fromISO(record['endDate'].value) > DateTime.now() ? DateTime.now() : DateTime.fromISO(record['endDate'].value); // if end date is in the future, set it to now
            years += endDateObj.diff(startDateObj, ['years']).years; // adds to the years
        } else if (!record['endDate'].value) {
            years += DateTime.now().diff(startDateObj, ['years']).years;
        }
    }
    const histories = record['workHistory'].value;
    if (histories.length > 0) {
        histories.forEach((history: any) => {
            if (!history.value['historyStartDate'].value || !history.value['historyEndDate'].value) return;
            if (record['startDate'].value && DateTime.fromISO(record['startDate'].value) <= DateTime.fromISO(history.value['historyStartDate'].value))
                return;
            else if (history.value['historyStartDate'].value && history.value['historyEndDate'].value) {
                const startDateObj = DateTime.fromISO(history.value['historyStartDate'].value);
                const endDateObj = DateTime.fromISO(history.value['historyEndDate'].value);
                years += endDateObj.diff(startDateObj, ['years']).years;
            }
        });
    }
    return years.toFixed(2);
};

export const calcAge = (dob: string | null) => {
    if (!dob) return '0';
    else return Math.floor(DateTime.now().diff(DateTime.fromISO(dob), 'years').years).toString();
};

/**
 * @function calculate the vacation allowance for the worker
 */
export const calcVacation = (record: REST_SavedVolunteerProfile) => {
    if (!record['startDate'].value) return 0;
    const startDateObj = DateTime.fromISO(record['startDate'].value);
    const endOfYear = startDateObj.set({ month: 12, day: 31 });
    const serviceLength_firstYear = endOfYear.diff(startDateObj, ['years']).years;
    const serviceLength = DateTime.now().diff(endOfYear, ['years']).years;
    const serviceYear = serviceLength > 0 ? Math.ceil(serviceLength) : serviceLength_firstYear;

    // set vacation days according to serviceYear
    let vacation = 0;
    if (serviceYear >= 12) vacation = 25;
    else if (serviceYear >= 11) vacation = 24;
    else if (serviceYear >= 10) vacation = 23;
    else if (serviceYear >= 9) vacation = 22;
    else if (serviceYear >= 8) vacation = 21;
    else if (serviceYear >= 7) vacation = 20;
    else if (serviceYear >= 6) vacation = 19;
    else if (serviceYear >= 5) vacation = 17;
    //else if (serviceYear >= 4) vacation = 15;
    //else if (serviceYear >= 3) vacation = 15;
    //else if (serviceYear >= 2) vacation = 15;
    else if (serviceYear >= 1) vacation = 15;
    else if (serviceYear >= 0.92) vacation = 14;
    else if (serviceYear >= 0.83) vacation = 13;
    else if (serviceYear >= 0.75) vacation = 11;
    else if (serviceYear >= 0.67) vacation = 10;
    else if (serviceYear >= 0.58) vacation = 9;
    else if (serviceYear >= 0.5) vacation = 8;
    else if (serviceYear >= 0.42) vacation = 6;
    else if (serviceYear >= 0.33) vacation = 5;
    else if (serviceYear >= 0.25) vacation = 4;
    else if (serviceYear >= 0.17) vacation = 3;
    else if (serviceYear >= 0.08) vacation = 1;

    if (record['endDate'].value) {
        // if not this year return
        if (DateTime.fromISO(record['endDate'].value).year != DateTime.now().year) return Math.round(vacation);
        else {
            const workingEndDateObj = DateTime.fromISO(record['endDate'].value);
            vacation = (vacation / 12) * workingEndDateObj.month;
        }
    }
    if (record['workStatus'].value == '1/2 Time') vacation = Math.round(vacation / 2);
    else if (record['workStatus'].value == '1/4 Time') vacation = Math.round(vacation / 4);

    return Math.round(vacation);
};

export const calcVacationDeputationTaken = async (record: REST_SavedVolunteerProfile, vacationDeputation: 'Vacation' | 'Deputation') => {
    const getTimesheetbyStatus = async (code: string, vacationDeputation: string, workerType: string) => {
        try {
            // if zealous, get all records, else get only this year's records
            let query =
                workerType == 'Zealous'
                    ? `Related_records.kintoneAccount in (" USER", "${code}") and status in ("${vacationDeputation}")`
                    : `Related_records.kintoneAccount in (" USER", "${code}") and date = THIS_YEAR() and status in ("${vacationDeputation}")`;
            const client = new KintoneRestAPIClient({
                baseUrl: 'https://bfp.kintone.com',
                // Use password authentication
                auth: {
                    username: KintoneUserName,
                    password: KintonePassword
                }
            });
            const res = await client.record.getAllRecords({
                app: TimesheetAppID as string,
                condition: query
            });
            return res;
        } catch (e) {
            handleCatch(new Error('Could not read timesheet: ' + e), record, 'getTimesheetbyStatus');
        }
    };
    const timesheet = await getTimesheetbyStatus(record['kintoneAccount'].value[0].code, vacationDeputation, record['WorkerType'].value);
    return timesheet?.length || '0';
};
