import { SavedVolunteerApplicationForm } from '@/types/VolunteerApplicationForm.js';

import { DateTime } from 'luxon';
import { HealthQuestionnaireType } from '../schema';
import { REST_PersonalHealthQuestionnaire } from '@/types/PersonalHealthQuestionnaire';

const convertPrefilledFormRecord = (record: REST_PersonalHealthQuestionnaire, setValue: any): Partial<HealthQuestionnaireType> => {
    const convertedForm: Partial<HealthQuestionnaireType> = {};

    const addFieldIfValid = (key: keyof HealthQuestionnaireType, value: any) => {
        if (value !== undefined && value !== null && value !== '') {
            setValue(key, value);
        }
    };
    const addArrayIfValid = (key: keyof HealthQuestionnaireType, value: any) => {
        if (value !== undefined && value !== null && value !== '') {
            setValue(key, [value]);
        }
    };

    const convertDate = (isoDate: string) => {
        return DateTime.fromISO(isoDate).toFormat('dd/MM/yyyy');
    };

    addFieldIfValid('name', record.name?.value);
    addFieldIfValid('age', record.age?.value);
    addFieldIfValid('height', record.height?.value);
    addFieldIfValid('heightUnit', record.heightUnit?.value);
    addFieldIfValid('weight', record.weight?.value);
    addFieldIfValid('weightUnit', record.weightUnit?.value);
    addArrayIfValid('migranes', record.migranes?.value);
    addArrayIfValid('headInjury', record.headInjury?.value);
    addArrayIfValid('neckPain', record.neckPain?.value);
    addArrayIfValid('backProblems', record.backProblems?.value);
    addArrayIfValid('arthritis', record.arthritis?.value);
    addArrayIfValid('brokenBones', record.brokenBones?.value);
    addArrayIfValid('asthma', record.asthma?.value);
    addArrayIfValid('emphysema', record.emphysema?.value);
    addArrayIfValid('tuberculosis', record.tuberculosis?.value);
    addArrayIfValid('hepatitis', record.hepatitis?.value);
    addArrayIfValid('cancer', record.cancer?.value);
    addArrayIfValid('stroke', record.stroke?.value);
    addArrayIfValid('diabetes', record.diabetes?.value);
    addArrayIfValid('highBloodPressure', record.highBloodPressure?.value);
    addArrayIfValid('heartProblems', record.heartProblems?.value);
    addArrayIfValid('epilepsy', record.epilepsy?.value);
    addArrayIfValid('depression', record.depression?.value);
    addArrayIfValid('anemia', record.anemia?.value);
    addArrayIfValid('abnormalBleeding', record.abnormalBleeding?.value);
    addArrayIfValid('shortBreath', record.shortBreath?.value);
    addArrayIfValid('lossVision', record.lossVision?.value);
    addArrayIfValid('lossHearing', record.lossHearing?.value);
    addArrayIfValid('weakness', record.weakness?.value);
    addArrayIfValid('fatigue', record.fatigue?.value);
    addArrayIfValid('dizziness', record.dizziness?.value);
    addArrayIfValid('fainting', record.fainting?.value);
    addArrayIfValid('vomiting', record.vomiting?.value);
    addArrayIfValid('hiv', record.hiv?.value);
    addArrayIfValid('cancer', record.cancer?.value);
    addArrayIfValid('hemorrhoids', record.hemorrhoids?.value);
    addArrayIfValid('anxiety', record.anxiety?.value);
    addFieldIfValid('q1', record.q1?.value);
    addFieldIfValid('q2', record.q2?.value);
    addFieldIfValid('q3', record.q3?.value);
    addFieldIfValid('q4', record.q4?.value);
    addFieldIfValid('q5', record.q5?.value);
    addFieldIfValid('q6', record.q6?.value);

    return convertedForm;
};

export default convertPrefilledFormRecord;
