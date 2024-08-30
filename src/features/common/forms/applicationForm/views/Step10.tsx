import React, { FC } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { TFunction } from 'i18next';
import { UseFormRegister, FieldErrors, UseFormGetValues } from 'react-hook-form';
import { ApplicationFormType } from '../schema';
import Verify from '../../components/Verify';

type Step10Props = {
    register: UseFormRegister<ApplicationFormType>;
    errors: FieldErrors<ApplicationFormType>;
    getValues: UseFormGetValues<ApplicationFormType>;
    t: any;
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
                <Verify label={t('verify5.title')} register={register('verify5')} error={errors.verify5} />
                <ul className="text-black">
                    <li>◇ {t('verify5.options.1')}</li>
                    <li>◇ {t('verify5.options.2')}</li>
                    <li>◇ {t('verify5.options.3')}</li>
                    <li>◇ {t('verify5.options.4')}</li>
                    <li>◇ {t('verify5.options.5')}</li>
                </ul>
                <Verify label={t('verify6')} register={register('verify6')} error={errors.verify6} />
                <Verify label={t('verify7')} register={register('verify7')} error={errors.verify7} />
            </section>
        </div>
    );
};

export default Step10;
