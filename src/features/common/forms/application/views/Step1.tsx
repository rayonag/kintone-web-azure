import useUserStore from '@/features/common/portal/store';
import React, { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';
import SectionTitle from '../../components/SectionTitle';
import Input from '../../components/Input';
import { TFunction } from 'i18next';
import { UseFormRegister, FieldErrors, UseFormGetValues } from 'react-hook-form';

type Step1Props = {
    register: UseFormRegister<ApplicationType>;
    errors: FieldErrors<ApplicationType>;
    getValues: UseFormGetValues<ApplicationType>;
    t: TFunction<'translation'>;
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
                <Input label={t('firstName')} register={register('firstName')} placeholder={t('firstName')} error={errors.firstName || undefined} />
                <Input
                    label={t('middleName')}
                    register={register('middleName')}
                    placeholder={t('middleName')}
                    error={errors.middleName || undefined}
                />
                <Input label={t('lastName')} register={register('lastName')} placeholder={t('lastName')} error={errors.lastName || undefined} />
                <Input label={t('street')} register={register('street')} placeholder={t('street')} error={errors.street || undefined} />
                <Input label={t('city')} register={register('city')} placeholder={t('city')} error={errors.city || undefined} />
                <Input label={t('state')} register={register('state')} placeholder={t('state')} error={errors.state || undefined} />

                <div className="grid grid-cols-2 gap-4">
                    <Input label={t('zip')} register={register('zip')} placeholder={t('zip')} error={errors.zip || undefined} />
                    <Input label={t('country')} register={register('country')} placeholder={t('country')} error={errors.country || undefined} />
                </div>
                <Input label={t('phone')} register={register('phone')} placeholder={t('phone')} error={errors.phone || undefined} />
                <Input label={t('email')} register={register('email')} placeholder={t('email')} error={errors.email || undefined} />
                <Input label={t('passport')} register={register('passport')} placeholder={t('passport')} error={errors.passport || undefined} />
                <Input
                    label={t('passportExpiration')}
                    register={register('passportExpiration')}
                    placeholder={t('passportExpiration')}
                    error={errors.passportExpiration || undefined}
                />
                <Input
                    label={t('passportIssued')}
                    register={register('passportIssued')}
                    placeholder={t('passportIssued')}
                    error={errors.passportIssued || undefined}
                />
                <Input label={t('age')} register={register('age')} placeholder={t('age')} error={errors.age || undefined} />
                <div className="grid grid-cols-3 gap-4">
                    <Input label={t('birthDay')} register={register('birthDay')} placeholder={t('birthDay')} error={errors.birthDay || undefined} />
                    <Input
                        label={t('birthMonth')}
                        register={register('birthMonth')}
                        placeholder={t('birthMonth')}
                        error={errors.birthMonth || undefined}
                    />
                    <Input
                        label={t('birthYear')}
                        register={register('birthYear')}
                        placeholder={t('birthYear')}
                        error={errors.birthYear || undefined}
                    />
                </div>
                <Input label={t('ssn')} register={register('ssn')} placeholder={t('ssn')} error={errors.ssn || undefined} />
                <Input label={t('sex')} register={register('sex')} placeholder={t('sex')} error={errors.sex || undefined} />
                <Input
                    label={t('maritalStatus')}
                    register={register('maritalStatus')}
                    placeholder={t('maritalStatus')}
                    error={errors.maritalStatus || undefined}
                />
                <Input label={t('children')} register={register('children')} placeholder={t('children')} error={errors.children || undefined} />
                <Input
                    label={t('hasFamilySupport')}
                    register={register('hasFamilySupport')}
                    placeholder={t('hasFamilySupport')}
                    error={errors.hasFamilySupport || undefined}
                />
                <Input
                    label={t('hasFamilySupportExplain')}
                    register={register('hasFamilySupportExplain')}
                    placeholder={t('hasFamilySupportExplain')}
                    error={errors.hasFamilySupportExplain || undefined}
                />
            </section>
        </div>
    );
};

export default Step1;
