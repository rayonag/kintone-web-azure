import useUserStore from '@/features/common/store';
import React, { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';
import SectionTitle from '../../components/SectionTitle';
import Input from '../../components/Input';
import { TFunction } from 'i18next';
import { UseFormRegister, FieldErrors, UseFormGetValues, Control } from 'react-hook-form';
import { ApplicationFormType } from '../schema';
import Row from '../../components/Row';
import { Character1, Character2, Character3, Character4, HealthCondition, YesNo } from '../enums';
import Checkbox from '../../components/Checkbox';

type Step8Props = {
    register: UseFormRegister<ApplicationFormType>;
    errors: FieldErrors<ApplicationFormType>;
    getValues: UseFormGetValues<ApplicationFormType>;
    t: any;
    control: Control<ApplicationFormType>;
};
const Step8: FC<Step8Props> = ({ register, errors, getValues, t, control }) => {
    return (
        <div>
            <section>
                <SectionTitle title={t('sectionTitle.8')} />
                <div className="font-semibold mt-2 text-black">{t('characterDescription')}</div>
                <Row>
                    <Checkbox label={null} name={'character1'} control={control} options={Character1(t)} error={errors.character1 || undefined} />
                    <Checkbox label={null} name={'character2'} control={control} options={Character2(t)} error={errors.character2 || undefined} />
                    <Checkbox label={null} name={'character3'} control={control} options={Character3(t)} error={errors.character3 || undefined} />
                    <Checkbox label={null} name={'character4'} control={control} options={Character4(t)} error={errors.character4 || undefined} />
                </Row>
            </section>
        </div>
    );
};

export default Step8;
