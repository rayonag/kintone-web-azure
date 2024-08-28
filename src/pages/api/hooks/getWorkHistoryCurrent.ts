import { REST_SavedVolunteerProfile, REST_VolunteerProfile } from '@/types/VolunteerProfile';
import { DateTime } from 'luxon';

const getWorkHistoryCurrent = (record: REST_VolunteerProfile | REST_SavedVolunteerProfile) => {
    const history = record['workHistory'].value;
    const currentHistory = history.find((record) => {
        if (!record.value['historyStartDate'].value) return false;
        const startDate = DateTime.fromISO(record.value['historyStartDate'].value);
        if (record.value['historyEndDate'].value) {
            const endDate = DateTime.fromISO(record.value['historyEndDate'].value);
            return startDate <= DateTime.now() && DateTime.now() <= endDate;
        } else {
            return startDate <= DateTime.now();
        }
    });
    if (!currentHistory) return undefined;
    return {
        workStatus: currentHistory.value['historyWorkStatus'],
        startDate: currentHistory.value['historyStartDate'],
        endDate: currentHistory.value['historyEndDate'],
        jobTitle: currentHistory.value['historyJobTitle'],
        WorkerType: currentHistory.value['historyWorkerType']
    };
};
export default getWorkHistoryCurrent;
