'use client';

import { FC } from 'react';
import { HealthCheckbox } from '../components/HealthCheckbox';
import { UseFormRegister, FieldErrors, UseFormGetValues } from 'react-hook-form';
import { HealthQuestionnaireType } from '../schema/healthQuestionnaireSchema';
import { TFunction } from 'i18next';
type SecondPageProps = {
    register: UseFormRegister<HealthQuestionnaireType>;
    errors: FieldErrors<HealthQuestionnaireType>;
    getValues: UseFormGetValues<HealthQuestionnaireType>;
    t: any;
};
const SecondPage: FC<SecondPageProps> = ({ register, errors, getValues, t }) => {
    return (
        <>
            <div className="text-2xl font-bold my-10">
                <div>Do you have a history of?</div>
            </div>
            <HealthCheckbox
                label={t('migranes')}
                register={register('migranes')}
                error={errors.migranes || undefined}
                value={getValues('migranes')}
            />
            <HealthCheckbox
                label={t('headInjury')}
                register={register('headInjury')}
                error={errors.headInjury || undefined}
                value={getValues('headInjury')}
            />
            <HealthCheckbox
                label={t('weakness')}
                register={register('weakness')}
                error={errors.weakness || undefined}
                value={getValues('weakness')}
            />
            <HealthCheckbox
                label={t('backProblems')}
                register={register('backProblems')}
                error={errors.backProblems || undefined}
                value={getValues('backProblems')}
            />
            <HealthCheckbox label={t('asthma')} register={register('asthma')} error={errors.asthma || undefined} value={getValues('asthma')} />
            <HealthCheckbox
                label={t('lossHearing')}
                register={register('lossHearing')}
                error={errors.lossHearing || undefined}
                value={getValues('lossHearing')}
            />
            <HealthCheckbox
                label={t('epilepsy')}
                register={register('epilepsy')}
                error={errors.epilepsy || undefined}
                value={getValues('epilepsy')}
            />
            <HealthCheckbox label={t('anxiety')} register={register('anxiety')} error={errors.anxiety || undefined} value={getValues('anxiety')} />
            <HealthCheckbox label={t('fatigue')} register={register('fatigue')} error={errors.fatigue || undefined} value={getValues('fatigue')} />
            <HealthCheckbox
                label={t('diabetes')}
                register={register('diabetes')}
                error={errors.diabetes || undefined}
                value={getValues('diabetes')}
            />
            <HealthCheckbox
                label={t('hemorrhoids')}
                register={register('hemorrhoids')}
                error={errors.hemorrhoids || undefined}
                value={getValues('hemorrhoids')}
            />
            <HealthCheckbox
                label={t('hepatitis')}
                register={register('hepatitis')}
                error={errors.hepatitis || undefined}
                value={getValues('hepatitis')}
            />
            <HealthCheckbox label={t('stroke')} register={register('stroke')} error={errors.stroke || undefined} value={getValues('stroke')} />
            <HealthCheckbox
                label={t('emphysema')}
                register={register('emphysema')}
                error={errors.emphysema || undefined}
                value={getValues('emphysema')}
            />
            <HealthCheckbox label={t('anemia')} register={register('anemia')} error={errors.anemia || undefined} value={getValues('anemia')} />
            <HealthCheckbox
                label={t('neckPain')}
                register={register('neckPain')}
                error={errors.neckPain || undefined}
                value={getValues('neckPain')}
            />
            <HealthCheckbox
                label={t('fainting')}
                register={register('fainting')}
                error={errors.fainting || undefined}
                value={getValues('fainting')}
            />
            <HealthCheckbox
                label={t('dizziness')}
                register={register('dizziness')}
                error={errors.dizziness || undefined}
                value={getValues('dizziness')}
            />
            <HealthCheckbox
                label={t('heartProblems')}
                register={register('heartProblems')}
                error={errors.heartProblems || undefined}
                value={getValues('heartProblems')}
            />
            <HealthCheckbox
                label={t('tuberculosis')}
                register={register('tuberculosis')}
                error={errors.tuberculosis || undefined}
                value={getValues('tuberculosis')}
            />
            <HealthCheckbox
                label={t('lossVision')}
                register={register('lossVision')}
                error={errors.lossVision || undefined}
                value={getValues('lossVision')}
            />
            <HealthCheckbox
                label={t('depression')}
                register={register('depression')}
                error={errors.depression || undefined}
                value={getValues('depression')}
            />
            <HealthCheckbox
                label={t('shortBreath')}
                register={register('shortBreath')}
                error={errors.shortBreath || undefined}
                value={getValues('shortBreath')}
            />
            <HealthCheckbox
                label={t('arthritis')}
                register={register('arthritis')}
                error={errors.arthritis || undefined}
                value={getValues('arthritis')}
            />
            <HealthCheckbox
                label={t('vomiting')}
                register={register('vomiting')}
                error={errors.vomiting || undefined}
                value={getValues('vomiting')}
            />
            <HealthCheckbox label={t('hiv')} register={register('hiv')} error={errors.hiv || undefined} value={getValues('hiv')} />
            <HealthCheckbox
                label={t('abnormalBleeding')}
                register={register('abnormalBleeding')}
                error={errors.abnormalBleeding || undefined}
                value={getValues('abnormalBleeding')}
            />
            <HealthCheckbox label={t('cancer')} register={register('cancer')} error={errors.cancer || undefined} value={getValues('cancer')} />
            <HealthCheckbox
                label={t('brokenBones')}
                register={register('brokenBones')}
                error={errors.brokenBones || undefined}
                value={getValues('brokenBones')}
            />
            <HealthCheckbox
                label={t('highBloodPressure')}
                register={register('highBloodPressure')}
                error={errors.highBloodPressure || undefined}
                value={getValues('highBloodPressure')}
            />
        </>
    );
};
export default SecondPage;
