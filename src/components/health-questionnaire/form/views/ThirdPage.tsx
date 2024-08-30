'use client';

import { useTranslation } from 'react-i18next';
import Input from '../components/Input';
import Number from '../components/Number';
import Checkbox from '../components/Checkbox';
import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { HealthQuestionnaireType } from '../schema/healthQuestionnaireSchema';
import { FC } from 'react';
import { TFunction } from 'i18next';
import Textarea from '../components/Textarea';
import Verify from '../components/Verify';

type ThirdPageProps = {
    register: UseFormRegister<HealthQuestionnaireType>;
    errors: FieldErrors<HealthQuestionnaireType>;
    t: any;
};
const ThirdPage: FC<ThirdPageProps> = ({ register, errors, t }) => {
    return (
        <>
            <div className="text-2xl font-bold my-10">
                <div>BRIDGES FOR PEACE</div>
                <div>PERSONAL HEALTH QUESTIONNAIRE</div>
            </div>
            <Textarea label={t('q1')} register={register('q1')} placeholder={t('system.typeHere')} error={errors.q1 || undefined} />
            <Textarea label={t('q2')} register={register('q2')} placeholder={t('system.typeHere')} error={errors.q2 || undefined} />
            <Textarea label={t('q3')} register={register('q3')} placeholder={t('system.typeHere')} error={errors.q3 || undefined} />
            <Textarea label={t('q4')} register={register('q4')} placeholder={t('system.typeHere')} error={errors.q4 || undefined} />
            <Textarea label={t('q5')} register={register('q5')} placeholder={t('system.typeHere')} error={errors.q5 || undefined} />
            <Textarea label={t('q6')} register={register('q6')} placeholder={t('system.typeHere')} error={errors.q6 || undefined} />
            <Verify label={t('verify')} register={register('verify')} error={errors.verify || undefined} />
        </>
    );
};
export default ThirdPage;
