import React, { FC } from 'react';
import SectionTitle from '../../components/SectionTitle';
import Input from '../../components/Input';
import { UseFormRegister, FieldErrors, UseFormGetValues, Control } from 'react-hook-form';
import { ApplicationFormType } from '../schema';
import Row from '../../components/Row';
import { AreaInterested, YesNo } from '../enums';
import Textarea from '../../components/Textarea';
import Checkbox from '../../components/Checkbox';
import { Radio } from '../../components/Radio';
import Date from '../../components/Date';

type Step4Props = {
    register: UseFormRegister<ApplicationFormType>;
    errors: FieldErrors<ApplicationFormType>;
    getValues: UseFormGetValues<ApplicationFormType>;
    t: any;
    control: Control<ApplicationFormType>;
    type?: string | null;
};
const Step4: FC<Step4Props> = ({ register, errors, getValues, t, control, type }) => (
    <section>
        <SectionTitle title={t('sectionTitle.4')} />
        <Row>
            <Textarea
                label={t('describeMotivation')}
                register={register('describeMotivation')}
                placeholder={null}
                error={errors.describeMotivation || undefined}
            />
        </Row>
        <Row>
            <Checkbox
                label={t('areaInterested.title')}
                name={'areaInterested'}
                control={control}
                options={AreaInterested(t)}
                error={errors.areaInterested || undefined}
            />
        </Row>
        <Row>
            <Input
                label={t('otherAreaInterested')}
                register={register('otherAreaInterested')}
                placeholder={'Enter here'}
                error={errors.otherAreaInterested || undefined}
            />
        </Row>
        {type == 'Zealous' || (
            <>
                <Row>
                    <Input
                        label={t('minAvailability')}
                        register={register('minAvailability')}
                        placeholder={'Enter here'}
                        error={errors.minAvailability || undefined}
                    />
                    <Input
                        label={t('maxAvailability')}
                        register={register('maxAvailability')}
                        placeholder={type == 'Short Term' ? 'up to 3 months' : 'Enter here'}
                        error={errors.maxAvailability || undefined}
                    />
                </Row>

                <div className="font-semibold mt-2 text-black">{t('preferredStartDate.title')}</div>
                <Row>
                    <Date
                        label={t('preferredStartDate.option1')}
                        register={register('preferredStartDate')}
                        placeholder={t('preferredStartDate')}
                        error={errors.preferredStartDate || undefined}
                    />
                    <Date
                        label={t('preferredStartDate.option2')}
                        register={register('preferredStartDate2')}
                        placeholder={t('preferredStartDate2')}
                        error={errors.preferredStartDate2 || undefined}
                    />
                </Row>
                <Row>
                    <Radio
                        label={t('ifNoPosition')}
                        options={YesNo(t)}
                        register={register('ifNoPosition')}
                        error={errors.ifNoPosition || undefined}
                    />
                </Row>
            </>
        )}
    </section>
);

export default Step4;
