import { DateTime } from 'luxon';

/**
 * @function calculate the service year
 * @param {Date} startDate
 */
export const calcWorkingYears = (startDate: string | null, endDate: string | null) => {
    if (!startDate) return '0';
    else if (!endDate || DateTime.fromISO(endDate) > DateTime.now())
        return (Math.round(DateTime.now().diff(DateTime.fromISO(startDate), 'months').months) / 12).toString();
    else if (DateTime.fromISO(endDate) < DateTime.now())
        return (Math.round(DateTime.fromISO(endDate).diff(DateTime.fromISO(startDate), 'months').months) / 12).toString();
    else return (Math.round(DateTime.now().diff(DateTime.fromISO(startDate), 'months').months) / 12).toString();
};

export const calcAge = (dob: string | null) => {
    if (!dob) return '0';
    else return Math.floor(DateTime.now().diff(DateTime.fromISO(dob), 'years').years).toString();
};
