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

type Step7Props = {
    register: UseFormRegister<ApplicationFormType>;
    errors: FieldErrors<ApplicationFormType>;
    getValues: UseFormGetValues<ApplicationFormType>;
    t: TFunction<'application'>;
};
const Step7: FC<Step7Props> = ({ register, errors, getValues, t }) => {
    const { username } = useUserStore(
        useShallow((state) => ({
            username: state.username
        }))
    );
    console.log('username', username);
    return (
        <div>
            <section>
                <SectionTitle title={t('sectionTitle.3')} />
                <Row>
                    <Input
                        label={t('emergencyName')}
                        register={register('emergencyName')}
                        placeholder={t('emergencyName')}
                        error={errors.emergencyName || undefined}
                    />
                    <Input
                        label={t('emergencyRelationship')}
                        register={register('emergencyRelationship')}
                        placeholder={t('emergencyRelationship')}
                        error={errors.emergencyRelationship || undefined}
                    />
                    <Input
                        label={t('emergencyEmail')}
                        register={register('emergencyEmail')}
                        placeholder={t('emergencyEmail')}
                        error={errors.emergencyEmail || undefined}
                    />
                    <Input
                        label={t('emergencyPhone')}
                        register={register('emergencyPhone')}
                        placeholder={t('emergencyPhone')}
                        error={errors.emergencyPhone || undefined}
                    />
                </Row>
                <Row>
                    <Input
                        label={t('emergencyStreet')}
                        register={register('emergencyStreet')}
                        placeholder={t('emergencyStreet')}
                        error={errors.emergencyStreet || undefined}
                    />{' '}
                    <Input
                        label={t('emergencyState')}
                        register={register('emergencyState')}
                        placeholder={t('emergencyState')}
                        error={errors.emergencyState || undefined}
                    />{' '}
                    <Input
                        label={t('emergencyCity')}
                        register={register('emergencyCity')}
                        placeholder={t('emergencyCity')}
                        error={errors.emergencyCity || undefined}
                    />{' '}
                    <Input
                        label={t('emergencyCountry')}
                        register={register('emergencyCountry')}
                        placeholder={t('emergencyCountry')}
                        error={errors.emergencyCountry || undefined}
                    />{' '}
                    <Input
                        label={t('emergencyZip')}
                        register={register('emergencyZip')}
                        placeholder={t('emergencyZip')}
                        error={errors.emergencyZip || undefined}
                    />
                </Row>
                <Row>
                    <Radio label={t('doSmoke')} register={register('doSmoke')} options={YesNo(t)} error={errors.doSmoke} />
                    <Radio label={t('canLift33lbs')} register={register('canLift33lbs')} options={YesNo(t)} error={errors.canLift33lbs} />
                </Row>
                <Row>
                    <Input
                        label={t('personalDoctor')}
                        register={register('personalDoctor')}
                        placeholder={t('personalDoctor')}
                        error={errors.personalDoctor || undefined}
                    />
                    <Input
                        label={t('personalDoctorPhone')}
                        register={register('personalDoctorPhone')}
                        placeholder={t('personalDoctorPhone')}
                        error={errors.personalDoctorPhone || undefined}
                    />
                </Row>
            </section>
        </div>
    );
};

export default Step7;
