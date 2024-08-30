import useUserStore from '@/features/common/portal/store';
import React, { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';
import SectionTitle from '../../components/SectionTitle';
import Input from '../../components/Input';
import { TFunction } from 'i18next';
import { UseFormRegister, FieldErrors, UseFormGetValues, Control } from 'react-hook-form';
import { ApplicationFormType } from '../schema';
import Row from '../../components/Row';
import { AreaInterested, HealthCondition, YesNo } from '../enums';
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
};
const Step4: FC<Step4Props> = ({ register, errors, getValues, t, control }) => (
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
        <Row>
            <Input
                label={t('minAvailability')}
                register={register('minAvailability')}
                placeholder={'1 week, 30 days, etc'}
                error={errors.minAvailability || undefined}
            />
            <Input
                label={t('maxAvailability')}
                register={register('maxAvailability')}
                placeholder={'3 months, 6 months, etc'}
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
            <Radio label={t('ifNoPosition')} options={YesNo(t)} register={register('ifNoPosition')} error={errors.ifNoPosition || undefined} />
        </Row>
    </section>
);

export default Step4;
