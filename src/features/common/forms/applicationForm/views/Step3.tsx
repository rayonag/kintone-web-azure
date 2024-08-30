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

type Step3Props = {
    register: UseFormRegister<ApplicationFormType>;
    errors: FieldErrors<ApplicationFormType>;
    getValues: UseFormGetValues<ApplicationFormType>;
    t: any;
};
const Step3: FC<Step3Props> = ({ register, errors, getValues, t }) => {
    const { username, name, initUser } = useUserStore(
        useShallow((state) => ({
            username: state.username,
            name: state.name,
            initUser: state.initUser
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
                <div className="font-semibold mt-2 text-black">{t('address')}</div>
                <Row>
                    <Input
                        label={null}
                        register={register('emergencyStreet')}
                        placeholder={t('emergencyStreet')}
                        error={errors.emergencyStreet || undefined}
                    />
                    <Input
                        label={null}
                        register={register('emergencyState')}
                        placeholder={t('emergencyState')}
                        error={errors.emergencyState || undefined}
                    />
                    <Input
                        label={null}
                        register={register('emergencyCity')}
                        placeholder={t('emergencyCity')}
                        error={errors.emergencyCity || undefined}
                    />
                    <Input
                        label={null}
                        register={register('emergencyCountry')}
                        placeholder={t('emergencyCountry')}
                        error={errors.emergencyCountry || undefined}
                    />
                    <Input
                        label={null}
                        register={register('emergencyZip')}
                        placeholder={t('emergencyZip')}
                        error={errors.emergencyZip || undefined}
                    />
                </Row>
            </section>
        </div>
    );
};

export default Step3;
