import React, { FC } from 'react';
import SectionTitle from '../../components/SectionTitle';
import Input from '../../components/Input';
import { UseFormRegister, FieldErrors, UseFormGetValues } from 'react-hook-form';
import { ApplicationFormType } from '../schema';
import Row from '../../components/Row';
import { Radio } from '../../components/Radio';
import Textarea from '../../components/Textarea';
import { HealthCondition, YesNo } from '../enums';

type Step2Props = {
    register: UseFormRegister<ApplicationFormType>;
    errors: FieldErrors<ApplicationFormType>;
    getValues: UseFormGetValues<ApplicationFormType>;
    t: any;
};
const Step2: FC<Step2Props> = ({ register, errors, getValues, t }) => {
    return (
        <div>
            <section>
                <SectionTitle title={t('sectionTitle.2')} />
                <Row>
                    <Radio
                        label={t('healthCondition.title')}
                        register={register('healthCondition')}
                        options={HealthCondition(t)}
                        error={errors.healthCondition}
                    />
                    <Radio label={t('seriousInjury')} register={register('seriousInjury')} options={YesNo(t)} error={errors.seriousInjury} />
                    <Textarea
                        label={t('seriousInjuryExplain')}
                        register={register('seriousInjuryExplain')}
                        placeholder={null}
                        error={errors.seriousInjuryExplain || undefined}
                    />
                </Row>
                <Row>
                    <Radio label={t('hasHandicap')} register={register('hasHandicap')} options={YesNo(t)} error={errors.hasHandicap} />
                    <Textarea
                        label={t('hasHandicapExplain')}
                        register={register('hasHandicapExplain')}
                        placeholder={null}
                        error={errors.hasHandicapExplain || undefined}
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

export default Step2;
