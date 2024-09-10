'use client';

import Input from '../components/Input';
import Number from '../components/Number';
import { Control, FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { HealthQuestionnaireType } from '../schema';
import { FC } from 'react';
import { HeightUnit, WeightUnit } from '../enums';
import { Radio } from '../components/Radio';

type Step1Props = {
    register: UseFormRegister<HealthQuestionnaireType>;
    errors: FieldErrors<HealthQuestionnaireType>;
    getValues: UseFormGetValues<HealthQuestionnaireType>;
    t: any;
    control: Control<HealthQuestionnaireType>;
};
const Step1: FC<Step1Props> = ({ register, errors, getValues, t, control }) => {
    return (
        <>
            <div className="text-2xl font-bold my-10">
                <div>BRIDGES FOR PEACE</div>
                <div>PERSONAL HEALTH QUESTIONNAIRE</div>
            </div>
            <div className="flex flex-wrap">
                <Input label={t('name')} register={register('name')} placeholder={t('name')} error={errors.name || undefined} />
                <Number label={t('age')} register={register('age')} placeholder={t('age')} error={errors.age || undefined} />
            </div>
            <div className="flex flex-wrap items-end text-white">
                <Number label={t('height')} register={register('height')} placeholder={t('height')} error={errors.height || undefined} />
                <Radio register={register('heightUnit')} options={HeightUnit(t)} error={errors.heightUnit || undefined} />
            </div>
            <div className="flex flex-wrap items-end">
                <Number label={t('weight')} register={register('weight')} placeholder={t('weight')} error={errors.weight || undefined} />
                <Radio register={register('weightUnit')} options={WeightUnit(t)} error={errors.weightUnit || undefined} />
            </div>
        </>
    );
};
export default Step1;
