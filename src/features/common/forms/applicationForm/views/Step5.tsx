import React, { FC } from 'react';
import SectionTitle from '../../components/SectionTitle';
import Input from '../../components/Input';
import { UseFormRegister, FieldErrors, UseFormGetValues, Control } from 'react-hook-form';
import { ApplicationFormType } from '../schema';
import Row from '../../components/Row';
import { YesNo } from '../enums';
import { Radio } from '../../components/Radio';
import Textarea from '../../components/Textarea';
import EducationTable from '../../components/EducationTable';
import EmploymentTable from '../../components/EmploymentTable';
import ServiceTable from '../../components/ServiceTable';

type Step5Props = {
    register: UseFormRegister<ApplicationFormType>;
    errors: FieldErrors<ApplicationFormType>;
    getValues: UseFormGetValues<ApplicationFormType>;
    t: any;
    control: Control<ApplicationFormType>;
};

const Step5: FC<Step5Props> = ({ register, errors, getValues, t, control }) => {
    return (
        <div>
            <section>
                <SectionTitle title={t('sectionTitle.5')} />

                <EducationTable errors={errors} register={register} control={control} t={t} />

                <div className="font-bold mt-8 text-xl text-black text-center">Employment History:</div>

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

                {/* Employment Table */}
                <Row>
                    <EmploymentTable errors={errors} register={register} control={control} t={t} />
                </Row>

                <Row>
                    <Textarea label={t('hobby')} register={register('hobby')} placeholder={'Enter here'} error={errors.hobby || undefined} />
                </Row>
                <Row>
                    <Input label={t('clubs')} register={register('clubs')} placeholder={'Enter here'} error={errors.clubs || undefined} />
                </Row>

                {/* Service Table */}
                <Row>
                    <ServiceTable errors={errors} register={register} control={control} t={t} />
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
