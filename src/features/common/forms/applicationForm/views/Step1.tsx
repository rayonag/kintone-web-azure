import useUserStore from '@/features/common/portal/store';
import React, { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';
import SectionTitle from '../../components/SectionTitle';
import Input from '../../components/Input';
import { TFunction } from 'i18next';
import { UseFormRegister, FieldErrors, UseFormGetValues } from 'react-hook-form';
import { ApplicationFormType } from '../schema';
import Row from '../../components/Row';
import { Radio } from '../../components/Radio';
import { Select } from '../../components/Select';
import Textarea from '../../components/Textarea';
import { MaritalStatus, Sex, YesNo } from '../enums';

type Step1Props = {
    register: UseFormRegister<ApplicationFormType>;
    errors: FieldErrors<ApplicationFormType>;
    getValues: UseFormGetValues<ApplicationFormType>;
    t: TFunction<'application'>;
};
const Step1: FC<Step1Props> = ({ register, errors, getValues, t }) => {
    const { username } = useUserStore(
        useShallow((state) => ({
            username: state.username
        }))
    );
    console.log('username', username);
    return (
        <div>
            <section>
                <SectionTitle title="1. PERSONAL INFORMATION" />
                <div className="font-semibold mt-2 text-black">{t('fullName')}</div>
                <Row>
                    <Input label={null} register={register('firstName')} placeholder={t('firstName')} error={errors.firstName || undefined} />
                    <Input label={null} register={register('middleName')} placeholder={t('middleName')} error={errors.middleName || undefined} />
                    <Input label={null} register={register('lastName')} placeholder={t('lastName')} error={errors.lastName || undefined} />
                </Row>
                <div className="font-semibold mt-2 text-black">{t('address')}</div>
                <Row>
                    <Input label={null} register={register('street')} placeholder={t('street')} error={errors.street || undefined} />
                    <Input label={null} register={register('city')} placeholder={t('city')} error={errors.city || undefined} />
                    <Input label={null} register={register('zip')} placeholder={t('zip')} error={errors.zip || undefined} />
                    <Input label={null} register={register('state')} placeholder={t('state')} error={errors.state || undefined} />
                    <Input label={null} register={register('country')} placeholder={t('country')} error={errors.country || undefined} />
                </Row>
                <Row>
                    <Input label={t('phone')} register={register('phone')} placeholder={t('phone')} error={errors.phone || undefined} />
                    <Input label={t('email')} register={register('email')} placeholder={t('email')} error={errors.email || undefined} />
                </Row>
                <Row>
                    <Input
                        label={t('passportNumber')}
                        register={register('passportNumber')}
                        placeholder={t('passportNumber')}
                        error={errors.passportNumber || undefined}
                    />
                    <Input
                        label={t('passportExpiration')}
                        register={register('passportExpiration')}
                        placeholder={'DD/MM/YYYY'}
                        error={errors.passportExpiration || undefined}
                    />
                    <Input
                        label={t('passportIssued')}
                        register={register('passportIssued')}
                        placeholder={t('passportIssued')}
                        error={errors.passportIssued || undefined}
                    />
                </Row>
                <Row>
                    <Input label={t('birthday')} register={register('birthday')} placeholder={'DD/MM/YYYY'} error={errors.birthday || undefined} />
                    <Input label={t('age')} register={register('age')} placeholder={t('age')} error={errors.age || undefined} />
                </Row>
                <Row>
                    <Input optional label={t('ssn')} register={register('ssn')} placeholder={t('ssn')} error={errors.ssn || undefined} />
                    <Radio label={t('sex.title')} options={Sex(t)} register={register('sex')} error={errors.sex || undefined} />
                </Row>
                <Select
                    label={t('maritalStatus.title')}
                    options={MaritalStatus(t)}
                    register={register('maritalStatus')}
                    error={errors.maritalStatus || undefined}
                />
                <Row>
                    <Input
                        label={t('spouseFullName')}
                        register={register('spouseFullName')}
                        placeholder={t('spouseFullName')}
                        error={errors.spouseFullName || undefined}
                    />
                </Row>
                <Textarea
                    label={t('childrenNames')}
                    register={register('childrenNames')}
                    placeholder={null}
                    error={errors.childrenNames || undefined}
                />
                <Row>
                    <Radio
                        label={t('hasFamilySupport')}
                        options={YesNo(t)}
                        register={register('hasFamilySupport')}
                        error={errors.hasFamilySupport || undefined}
                    />
                    <Input
                        label={t('hasFamilySupportExplain')}
                        register={register('hasFamilySupportExplain')}
                        placeholder={t('hasFamilySupportExplain')}
                        error={errors.hasFamilySupportExplain || undefined}
                    />
                </Row>
            </section>
        </div>
    );
};

export default Step1;
