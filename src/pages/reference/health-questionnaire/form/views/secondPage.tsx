'use client';
import { Input, Select, Radio, Checkbox, Number, HealthCheckbox } from './../components/FormComponents';
import { Birthday } from '../components/Birthday';

export default function FirstPage(props: any) {
    const setPage = props.setPage;
    const errors = props.errors;
    const register = props.register;
    const trigger = props.trigger;
    const t = props.t;

    const fields = ['name', 'age', 'height', 'ftcm', 'weight', 'lbskg'];
    const validate = async () => {
        const isValids = await trigger(fields);
        console.log('isValid FirstPage: ' + isValids);
        if (isValids) return true;
        else return false;
    };

    return (
        <>
            <div className="text-2xl font-bold my-10">
                <div>Do you have a history of?</div>
            </div>
            <HealthCheckbox label={t('migranes')} register={register('migranes')} error={errors.migranes || undefined} />
            <HealthCheckbox label={t('headInjury')} register={register('headInjury')} error={errors.headInjury || undefined} />
            <HealthCheckbox label={t('weakness')} register={register('weakness')} error={errors.weakness || undefined} />
            <HealthCheckbox label={t('backProblems')} register={register('backProblems')} error={errors.backProblems || undefined} />
            <HealthCheckbox label={t('asthma')} register={register('asthma')} error={errors.asthma || undefined} />
            <HealthCheckbox label={t('lossHearing')} register={register('lossHearing')} error={errors.lossHearing || undefined} />
            <HealthCheckbox label={t('epilepsy')} register={register('epilepsy')} error={errors.epilepsy || undefined} />
            <HealthCheckbox label={t('anxiety')} register={register('anxiety')} error={errors.anxiety || undefined} />
            <HealthCheckbox label={t('fatigue')} register={register('fatigue')} error={errors.fatigue || undefined} />
            <HealthCheckbox label={t('diabetes')} register={register('diabetes')} error={errors.diabetes || undefined} />
            <HealthCheckbox label={t('hemorrhoids')} register={register('hemorrhoids')} error={errors.hemorrhoids || undefined} />
            <HealthCheckbox label={t('hepatitis')} register={register('hepatitis')} error={errors.hepatitis || undefined} />
            <HealthCheckbox label={t('stroke')} register={register('stroke')} error={errors.stroke || undefined} />
            <HealthCheckbox label={t('emphysema')} register={register('emphysema')} error={errors.emphysema || undefined} />
            <HealthCheckbox label={t('anemia')} register={register('anemia')} error={errors.anemia || undefined} />
            <HealthCheckbox label={t('neckPain')} register={register('neckPain')} error={errors.neckPain || undefined} />
            <HealthCheckbox label={t('fainting')} register={register('fainting')} error={errors.fainting || undefined} />
            <HealthCheckbox label={t('dizziness')} register={register('dizziness')} error={errors.dizziness || undefined} />
            <HealthCheckbox label={t('heartProblems')} register={register('heartProblems')} error={errors.heartProblems || undefined} />
            <HealthCheckbox label={t('tuberculosis')} register={register('tuberculosis')} error={errors.tuberculosis || undefined} />
            <HealthCheckbox label={t('lossVision')} register={register('lossVision')} error={errors.lossVision || undefined} />
            <HealthCheckbox label={t('depression')} register={register('depression')} error={errors.depression || undefined} />
            <HealthCheckbox label={t('shortBreath')} register={register('shortBreath')} error={errors.shortBreath || undefined} />
            <HealthCheckbox label={t('arthritis')} register={register('arthritis')} error={errors.arthritis || undefined} />
            <HealthCheckbox label={t('vomiting')} register={register('vomiting')} error={errors.vomiting || undefined} />
            <HealthCheckbox label={t('hiv')} register={register('hiv')} error={errors.hiv || undefined} />
            <HealthCheckbox label={t('abnormalBleeding')} register={register('abnormalBleeding')} error={errors.abnormalBleeding || undefined} />
            <HealthCheckbox label={t('cancer')} register={register('cancer')} error={errors.cancer || undefined} />
            <HealthCheckbox label={t('brokenBones')} register={register('brokenBones')} error={errors.brokenBones || undefined} />
            <HealthCheckbox label={t('highBloodPressure')} register={register('highBloodPressure')} error={errors.highBloodPressure || undefined} />

            <button
                onClick={async () => {
                    const valid = await validate();
                    if (valid) setPage(1);
                }}
                className="bg-[#012c66] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6 md:max-w-xs"
            >
                {t('next')}
            </button>
            <button
                className="bg-[#012c66] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6 md:max-w-xs"
                onClick={async () => {
                    const valid = await validate();
                    if (valid) setPage(0);
                }}
            >
                {t('back')}
            </button>
        </>
    );
}
