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
import Textarea from '../../components/Textarea';

type Step6Props = {
    register: UseFormRegister<ApplicationFormType>;
    errors: FieldErrors<ApplicationFormType>;
    getValues: UseFormGetValues<ApplicationFormType>;
    t: TFunction<'application'>;
};
const Step6: FC<Step6Props> = ({ register, errors, getValues, t }) => {
    return (
        <div>
            <section>
                <SectionTitle title={t('sectionTitle.6')} />
                <Row>
                    <Textarea
                        label={t('churchName')}
                        register={register('churchName')}
                        placeholder={'Enter here'}
                        error={errors.churchName || undefined}
                    />
                </Row>
                <Row>
                    <Textarea
                        label={t('christianExperience')}
                        register={register('christianExperience')}
                        placeholder={'Enter here'}
                        error={errors.christianExperience || undefined}
                    />
                </Row>
                <Row>
                    <Textarea
                        label={t('christianJewishUnderstanding')}
                        register={register('christianJewishUnderstanding')}
                        placeholder={'Enter here'}
                        error={errors.christianJewishUnderstanding || undefined}
                    />
                </Row>
                <Row>
                    {' '}
                    <Textarea
                        label={t('interestIsrael')}
                        register={register('interestIsrael')}
                        placeholder={'Enter here'}
                        error={errors.interestIsrael || undefined}
                    />
                </Row>
            </section>
        </div>
    );
};

export default Step6;