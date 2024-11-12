'use client';

import { FC } from 'react';
import { HealthCheckbox } from '../components/HealthCheckbox';
import { UseFormRegister, FieldErrors, UseFormGetValues, Control } from 'react-hook-form';
import { HealthQuestionnaireType } from '../schema';
import Row from '../../components/Row';

type Step2Props = {
    register: UseFormRegister<HealthQuestionnaireType>;
    errors: FieldErrors<HealthQuestionnaireType>;
    getValues: UseFormGetValues<HealthQuestionnaireType>;
    t: any;
    control: Control<HealthQuestionnaireType>;
};
const Step2: FC<Step2Props> = ({ register, errors, getValues, t, control }) => {
    return (
        <>
            <div className="text-2xl font-bold my-10">
                <div>Do you have a history of?</div>
            </div>
            <Row>
                <div>
                    <div className="flex justify-start px-2">
                        <label className="mx-1 w-8">Yes</label>
                        <label className="mx-1 w-8">No</label>
                    </div>
                    <HealthCheckbox
                        name={'migranes'}
                        control={control}
                        label={t('migranes')}
                        register={register('migranes')}
                        error={errors.migranes || undefined}
                        value={getValues('migranes')}
                    />
                    <HealthCheckbox
                        name={'headInjury'}
                        control={control}
                        label={t('headInjury')}
                        register={register('headInjury')}
                        error={errors.headInjury || undefined}
                        value={getValues('headInjury')}
                    />
                    <HealthCheckbox
                        name={'weakness'}
                        control={control}
                        label={t('weakness')}
                        register={register('weakness')}
                        error={errors.weakness || undefined}
                        value={getValues('weakness')}
                    />
                    <HealthCheckbox
                        name={'backProblems'}
                        control={control}
                        label={t('backProblems')}
                        register={register('backProblems')}
                        error={errors.backProblems || undefined}
                        value={getValues('backProblems')}
                    />
                    <HealthCheckbox
                        name={'asthma'}
                        control={control}
                        label={t('asthma')}
                        register={register('asthma')}
                        error={errors.asthma || undefined}
                        value={getValues('asthma')}
                    />
                    <HealthCheckbox
                        name={'lossHearing'}
                        control={control}
                        label={t('lossHearing')}
                        register={register('lossHearing')}
                        error={errors.lossHearing || undefined}
                        value={getValues('lossHearing')}
                    />
                    <HealthCheckbox
                        name={'epilepsy'}
                        control={control}
                        label={t('epilepsy')}
                        register={register('epilepsy')}
                        error={errors.epilepsy || undefined}
                        value={getValues('epilepsy')}
                    />
                    <HealthCheckbox
                        name={'anxiety'}
                        control={control}
                        label={t('anxiety')}
                        register={register('anxiety')}
                        error={errors.anxiety || undefined}
                        value={getValues('anxiety')}
                    />
                    <HealthCheckbox
                        name={'fatigue'}
                        control={control}
                        label={t('fatigue')}
                        register={register('fatigue')}
                        error={errors.fatigue || undefined}
                        value={getValues('fatigue')}
                    />
                    <HealthCheckbox
                        name={'diabetes'}
                        control={control}
                        label={t('diabetes')}
                        register={register('diabetes')}
                        error={errors.diabetes || undefined}
                        value={getValues('diabetes')}
                    />
                    <HealthCheckbox
                        name={'hemorrhoids'}
                        control={control}
                        label={t('hemorrhoids')}
                        register={register('hemorrhoids')}
                        error={errors.hemorrhoids || undefined}
                        value={getValues('hemorrhoids')}
                    />
                    <HealthCheckbox
                        name={'hepatitis'}
                        control={control}
                        label={t('hepatitis')}
                        register={register('hepatitis')}
                        error={errors.hepatitis || undefined}
                        value={getValues('hepatitis')}
                    />
                    <HealthCheckbox
                        name={'stroke'}
                        control={control}
                        label={t('stroke')}
                        register={register('stroke')}
                        error={errors.stroke || undefined}
                        value={getValues('stroke')}
                    />
                    <HealthCheckbox
                        name={'emphysema'}
                        control={control}
                        label={t('emphysema')}
                        register={register('emphysema')}
                        error={errors.emphysema || undefined}
                        value={getValues('emphysema')}
                    />
                    <HealthCheckbox
                        name={'anemia'}
                        control={control}
                        label={t('anemia')}
                        register={register('anemia')}
                        error={errors.anemia || undefined}
                        value={getValues('anemia')}
                    />
                </div>
                <div>
                    <div className="flex justify-start px-2">
                        <label className="mx-1 w-8">Yes</label>
                        <label className="mx-1 w-8">No</label>
                    </div>
                    <HealthCheckbox
                        name={'neckPain'}
                        control={control}
                        label={t('neckPain')}
                        register={register('neckPain')}
                        error={errors.neckPain || undefined}
                        value={getValues('neckPain')}
                    />
                    <HealthCheckbox
                        name={'fainting'}
                        control={control}
                        label={t('fainting')}
                        register={register('fainting')}
                        error={errors.fainting || undefined}
                        value={getValues('fainting')}
                    />
                    <HealthCheckbox
                        name={'dizziness'}
                        control={control}
                        label={t('dizziness')}
                        register={register('dizziness')}
                        error={errors.dizziness || undefined}
                        value={getValues('dizziness')}
                    />
                    <HealthCheckbox
                        name={'heartProblems'}
                        control={control}
                        label={t('heartProblems')}
                        register={register('heartProblems')}
                        error={errors.heartProblems || undefined}
                        value={getValues('heartProblems')}
                    />
                    <HealthCheckbox
                        name={'tuberculosis'}
                        control={control}
                        label={t('tuberculosis')}
                        register={register('tuberculosis')}
                        error={errors.tuberculosis || undefined}
                        value={getValues('tuberculosis')}
                    />
                    <HealthCheckbox
                        name={'lossVision'}
                        control={control}
                        label={t('lossVision')}
                        register={register('lossVision')}
                        error={errors.lossVision || undefined}
                        value={getValues('lossVision')}
                    />
                    <HealthCheckbox
                        name={'depression'}
                        control={control}
                        label={t('depression')}
                        register={register('depression')}
                        error={errors.depression || undefined}
                        value={getValues('depression')}
                    />
                    <HealthCheckbox
                        name={'shortBreath'}
                        control={control}
                        label={t('shortBreath')}
                        register={register('shortBreath')}
                        error={errors.shortBreath || undefined}
                        value={getValues('shortBreath')}
                    />
                    <HealthCheckbox
                        name={'arthritis'}
                        control={control}
                        label={t('arthritis')}
                        register={register('arthritis')}
                        error={errors.arthritis || undefined}
                        value={getValues('arthritis')}
                    />
                    <HealthCheckbox
                        name={'vomiting'}
                        control={control}
                        label={t('vomiting')}
                        register={register('vomiting')}
                        error={errors.vomiting || undefined}
                        value={getValues('vomiting')}
                    />
                    <HealthCheckbox
                        name={'hiv'}
                        control={control}
                        label={t('hiv')}
                        register={register('hiv')}
                        error={errors.hiv || undefined}
                        value={getValues('hiv')}
                    />
                    <HealthCheckbox
                        name={'abnormalBleeding'}
                        control={control}
                        label={t('abnormalBleeding')}
                        register={register('abnormalBleeding')}
                        error={errors.abnormalBleeding || undefined}
                        value={getValues('abnormalBleeding')}
                    />
                    <HealthCheckbox
                        name={'cancer'}
                        control={control}
                        label={t('cancer')}
                        register={register('cancer')}
                        error={errors.cancer || undefined}
                        value={getValues('cancer')}
                    />
                    <HealthCheckbox
                        name={'brokenBones'}
                        control={control}
                        label={t('brokenBones')}
                        register={register('brokenBones')}
                        error={errors.brokenBones || undefined}
                        value={getValues('brokenBones')}
                    />
                    <HealthCheckbox
                        name={'highBloodPressure'}
                        control={control}
                        label={t('highBloodPressure')}
                        register={register('highBloodPressure')}
                        error={errors.highBloodPressure || undefined}
                        value={getValues('highBloodPressure')}
                    />
                </div>
            </Row>
        </>
    );
};
export default Step2;
