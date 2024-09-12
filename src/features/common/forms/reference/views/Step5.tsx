import React, { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';
import SectionTitle from '../../components/SectionTitle';
import Input from '../../components/Input';
import { TFunction } from 'i18next';
import { UseFormRegister, FieldErrors, UseFormGetValues, Control, useWatch } from 'react-hook-form';
import { ReferenceFormType } from '../schema';
import Row from '../../components/Row';
import { Radio } from '../../components/Radio';
import { Select } from '../../components/Select';
import Textarea from '../../components/Textarea';
import { IndicationDesire, Rate, Relationship, YesNo } from '../enums';
import Date from '../../components/Date';

type Step5Props = {
    register: UseFormRegister<ReferenceFormType>;
    errors: FieldErrors<ReferenceFormType>;
    getValues: UseFormGetValues<ReferenceFormType>;
    t: any;
    control: Control<ReferenceFormType>;
};
const Step5: FC<Step5Props> = ({ register, errors, getValues, t, control }) => {
    const relationshipField = useWatch({ control, name: 'relationship' });
    const isOther = relationshipField == 'Other';
    return (
        <div>
            <section>
                <SectionTitle title={''} />
                <Row>
                    <Select label={t('standpoint')} register={register('standpoint')} options={Rate(t)} theme="ligiht" error={errors.standpoint} />
                    <Radio label={t('recommend')} register={register('recommend')} options={YesNo(t)} error={errors.recommend} />
                </Row>
                <Row>
                    <Input label={t('address')} register={register('address')} placeholder={t('address')} error={errors.address || undefined} />
                    <Input label={t('phone')} register={register('phone')} placeholder={t('phone')} error={errors.phone || undefined} />
                    <Input label={t('email')} register={register('email')} placeholder={t('email')} error={errors.email || undefined} />
                </Row>
                <Row>
                    <Input
                        label={t('signature')}
                        register={register('signature')}
                        placeholder={t('signature')}
                        error={errors.signature || undefined}
                    />
                    <Date label={t('signatureDate')} register={register('signatureDate')} error={errors.signatureDate || undefined} />
                </Row>
                <div className="flex justify-center">
                    <div className="text-black italic text-center self-center">{t('verse')}</div>
                </div>
            </section>
        </div>
    );
};

export default Step5;
