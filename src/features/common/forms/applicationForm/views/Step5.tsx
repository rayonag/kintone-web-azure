import useUserStore from '@/features/common/portal/store';
import React, { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';
import SectionTitle from '../../components/SectionTitle';
import Input from '../../components/Input';
import { TFunction } from 'i18next';
import { UseFormRegister, FieldErrors, UseFormGetValues, Control } from 'react-hook-form';
import { ApplicationFormType } from '../schema';
import Row from '../../components/Row';
import { HealthCondition, YesNo } from '../enums';
import { Radio } from '../../components/Radio';
import Textarea from '../../components/Textarea';

type Step5Props = {
    register: UseFormRegister<ApplicationFormType>;
    errors: FieldErrors<ApplicationFormType>;
    getValues: UseFormGetValues<ApplicationFormType>;
    t: TFunction<'application'>;
    control: Control<ApplicationFormType>;
};
const Step5: FC<Step5Props> = ({ register, errors, getValues, t, control }) => {
    return (
        <div>
            <section>
                <SectionTitle title={t('sectionTitle.5')} />
                <div className="font-semibold mt-2 text-black">{t('educationTable.title')}</div>
                <Row>
                    {/* TODO: come back to table 
                        <EducationTable
                        //label={t('educationTable.')}
                        register={register}
                        control={control}
                        fieldKeys={['educationSchoolName', 'educationDegree', 'educationDate']}
                        t={t}
                        //error={errors.educationTable || undefined}
                    /> */}

                    <div className="font-semibold mt-2 text-black">{t('educationTable.description')}</div>
                    <div className="font-semibold mt-2 text-gray-500">{'**Currently not available'}</div>
                </Row>
                <Row>
                    <Input
                        label={t('employProfession')}
                        register={register('employProfession')}
                        placeholder={'Enter here'}
                        error={errors.employProfession || undefined}
                    />
                    <Input
                        label={t('employAccreditation')}
                        register={register('employAccreditation')}
                        placeholder={'Enter here'}
                        error={errors.employAccreditation || undefined}
                    />
                </Row>
                <Row>
                    {/* <Textarea
                        label={t('employHistory.title1')}
                        register={register('employHistory')}
                        placeholder={t('employHistory.example')}
                        error={errors.employHistory || undefined}
                    /> */}
                    <div className="font-semibold mt-2 text-black">{t('employHistory.title1')}</div>
                    <div className="font-semibold mt-2 text-gray-500">{'**Currently not available'}</div>
                </Row>
                <Row>
                    <Input label={t('hobby')} register={register('hobby')} placeholder={'Enter here'} error={errors.hobby || undefined} />
                </Row>
                <Row>
                    <Input label={t('clubs')} register={register('clubs')} placeholder={'Enter here'} error={errors.clubs || undefined} />
                </Row>
                <Row>
                    {/* <ServiceTable
                        name={'educationTable'}
                        //label={t('educationTable.')}
                        register={register}
                        control={control}
                        fieldKeys={['educationSchoolName', 'educationDegree', 'educationDate']}
                        t={t}
                        error={errors.educationTable || undefined}
                    /> */}
                    <div className="font-semibold mt-2 text-black">{t('serviceTable.title')}</div>
                    <div className="font-semibold mt-2 text-gray-500">{'**Currently not available'}</div>
                </Row>
                <Row>
                    <Radio
                        label={t('hasDriverLicense')}
                        options={YesNo(t)}
                        register={register('hasDriverLicense')}
                        error={errors.hasDriverLicense || undefined}
                    />
                    <Radio
                        label={t('hasLicenseMoreThanTwelveMonths')}
                        options={YesNo(t)}
                        register={register('hasLicenseMoreThanTwelveMonths')}
                        error={errors.hasLicenseMoreThanTwelveMonths || undefined}
                    />
                </Row>
                <Row>
                    <Input
                        label={t('drivingViolation')}
                        register={register('drivingViolation')}
                        placeholder={'Enter here'}
                        error={errors.drivingViolation || undefined}
                    />
                </Row>
                <Row>
                    <Radio
                        label={t('hasConvictedTrafficAccident')}
                        options={YesNo(t)}
                        register={register('hasConvictedTrafficAccident')}
                        error={errors.hasConvictedTrafficAccident || undefined}
                    />
                    <Input
                        label={t('hasTrafficAccidentExplain')}
                        register={register('hasTrafficAccidentExplain')}
                        placeholder={'Enter here'}
                        error={errors.hasTrafficAccidentExplain || undefined}
                    />
                </Row>
                <Row>
                    <Radio
                        label={t('hasVisitedIsrael')}
                        options={YesNo(t)}
                        register={register('hasVisitedIsrael')}
                        error={errors.hasVisitedIsrael || undefined}
                    />
                    <Input
                        label={t('hasVisitedIsraelDates')}
                        register={register('hasVisitedIsraelDates')}
                        placeholder={'Enter here'}
                        error={errors.hasVisitedIsraelDates || undefined}
                    />
                </Row>
                <Row>
                    <Input
                        label={t('listForeignCountries')}
                        register={register('listForeignCountries')}
                        placeholder={'Enter here'}
                        error={errors.listForeignCountries || undefined}
                    />
                </Row>
            </section>
        </div>
    );
};

export default Step5;
