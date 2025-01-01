import { KintoneUserName, KintonePassword, TimesheetAppID } from '@/common/env';
import logError from '@/common/logError';
import { REST_VolunteerProfile, REST_SavedVolunteerProfile } from '@/types/VolunteerProfile';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { DateTime } from 'luxon';

/**
 * @function calculate the service year
 * @param {Date} startDate
 */
export const calcWorkingYears = (record: REST_VolunteerProfile) => {
    let years = 0;
    const histories = record['workHistory'].value;
    if (histories.length > 0) {
        histories.forEach((history) => {
            if (!history.value['historyStartDate'].value) return;
            const startDateObj = DateTime.fromISO(history.value['historyStartDate'].value);
            if (history.value['historyEndDate'].value) {
                const endDateObj = DateTime.fromISO(history.value['historyEndDate'].value);
                years += endDateObj.diff(startDateObj, ['years']).years;
            } else if (!history.value['historyEndDate'].value) {
                years += DateTime.now().diff(startDateObj, ['years']).years;
            }
        });
    }
    return years.toFixed(2);
};

/**
 * @function calculate age
 * @param {Date} dateOfBirth
 */
export const calcAge = (dateOfBirth: string) => {
    const birthday = DateTime.fromISO(dateOfBirth);
    return Math.floor(DateTime.now().diff(birthday, ['years']).years);
};

/**
 * @function calculate the vacation allowance
 */
export const calcVacation = (record: REST_VolunteerProfile) => {
    if (!record) return 0;
    const workerType = record['WorkerType'].value;
    // set Zealous vacation to 5 days
    if (workerType == 'Zealous') return 5;
    // set Short term vacation to 0 days
    if (workerType == 'Short Term') return 0;

    const serviceLength = parseInt(calcWorkingYears(record));

    // get the oldest start date history
    const histories = record['workHistory'].value;
    const startDateObj = histories.reduce((acc: any, history) => {
        if (!history.value['historyStartDate'].value) return acc;
        const startDate = DateTime.fromISO(history.value['historyStartDate'].value);
        return acc < startDate ? acc : startDate;
    }, DateTime.now());

    // set vacation days according to serviceYear
    let vacation = 0;
    if (serviceLength >= 12) vacation = 25;
    else if (serviceLength >= 11) vacation = 24;
    else if (serviceLength >= 10) vacation = 23;
    else if (serviceLength >= 9) vacation = 22;
    else if (serviceLength >= 8) vacation = 21;
    else if (serviceLength >= 7) vacation = 20;
    else if (serviceLength >= 6) vacation = 19;
    else if (serviceLength >= 5) vacation = 17;
    //else if (serviceLength >= 4) vacation = 15;
    //else if (serviceLength >= 3) vacation = 15;
    //else if (serviceLength >= 2) vacation = 15;
    else if (serviceLength >= 1) vacation = 15;
    else if (startDateObj.month == 1) vacation = 14;
    else if (startDateObj.month == 2) vacation = 13;
    else if (startDateObj.month == 3) vacation = 11;
    else if (startDateObj.month == 4) vacation = 10;
    else if (startDateObj.month == 5) vacation = 9;
    else if (startDateObj.month == 6) vacation = 8;
    else if (startDateObj.month == 7) vacation = 6;
    else if (startDateObj.month == 8) vacation = 5;
    else if (startDateObj.month == 9) vacation = 4;
    else if (startDateObj.month == 10) vacation = 3;
    else if (startDateObj.month == 11) vacation = 1;

    const endDate = histories[histories.length - 1].value['historyEndDate'].value;
    if (endDate) {
        // if not this year return
        if (DateTime.fromISO(endDate).year != DateTime.now().year) return Math.round(vacation);
        else {
            const workingEndDateObj = DateTime.fromISO(endDate);
            vacation = (vacation / 12) * workingEndDateObj.month;
        }
    }

    const workStatus = record['workStatus'].value;
    if (workStatus == '1/2 Time') vacation = Math.round(vacation / 2);
    else if (workStatus == '1/4 Time') vacation = Math.round(vacation / 4);

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
            logError(new Error('Could not read timesheet: ' + e), record, 'getTimesheetbyStatus');
        }
    };
    const timesheet = await getTimesheetbyStatus(record['kintoneAccount'].value[0].code, vacationDeputation, record['WorkerType'].value);
    return timesheet?.length || '0';
};
