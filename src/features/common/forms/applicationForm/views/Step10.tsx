import useUserStore from '@/features/common/portal/store';
import React, { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';
import SectionTitle from '../../components/SectionTitle';
import Input from '../../components/Input';
import { TFunction } from 'i18next';
import { UseFormRegister, FieldErrors, UseFormGetValues } from 'react-hook-form';
import { ApplicationFormType } from '../schema';
import Row from '../../components/Row';
import { HealthCondition, YesNo } from '../enums';
import Verify from '../../components/Verify';

type Step10Props = {
    register: UseFormRegister<ApplicationFormType>;
    errors: FieldErrors<ApplicationFormType>;
    getValues: UseFormGetValues<ApplicationFormType>;
    t: TFunction<'application'>;
};
const Step10: FC<Step10Props> = ({ register, errors, getValues, t }) => {
    return (
        <div>
            <section>
                <SectionTitle title={t('sectionTitle.10')} />
                <Verify label={t('verify1')} register={register('verify1')} error={errors.verify1} />
                <Verify label={t('verify2')} register={register('verify2')} error={errors.verify2} />
                <Verify label={t('verify3')} register={register('verify3')} error={errors.verify3} />
                <Verify label={t('verify4')} register={register('verify4')} error={errors.verify4} />
                <Verify label={t('verify5')} register={register('verify5')} error={errors.verify5} />
                <Verify label={t('verify6')} register={register('verify6')} error={errors.verify6} />
                <Verify label={t('verify7')} register={register('verify7')} error={errors.verify7} />
            </section>
        </div>
    );
};

export default Step10;
