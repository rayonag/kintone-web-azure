'use client';

import Input from '../components/Input';
import Number from '../components/Number';
import Checkbox from '../components/Checkbox';
import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { HealthQuestionnaireType } from '../schema/healthQuestionnaireSchema';
import { FC } from 'react';
import { TFunction } from 'i18next';

type FirstPageProps = {
    register: UseFormRegister<HealthQuestionnaireType>;
    errors: FieldErrors<HealthQuestionnaireType>;
    getValues: UseFormGetValues<HealthQuestionnaireType>;
    t: TFunction<'translation'>;
};
const FirstPage: FC<FirstPageProps> = ({ register, errors, getValues, t }) => {
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
            <div className="flex flex-wrap items-end">
                <Number label={t('height')} register={register('height')} placeholder={t('height')} error={errors.height || undefined} />
                <Checkbox
                    label={null}
                    register={register('heightUnit')}
                    options={['ft', 'cm']}
                    error={errors.heightUnit || undefined}
                    value={getValues('heightUnit')}
                />
            </div>
            <div className="flex flex-wrap items-end">
                <Number label={t('weight')} register={register('weight')} placeholder={t('weight')} error={errors.weight || undefined} />
                <Checkbox
                    label={null}
                    register={register('weightUnit')}
                    options={['lbs', 'kg']}
                    error={errors.weightUnit || undefined}
                    value={getValues('weightUnit')}
                />
            </div>
        </>
    );
};
export default FirstPage;
