import React, { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';
import SectionTitle from '../../components/SectionTitle';
import Input from '../../components/Input';
import { TFunction } from 'i18next';
import { UseFormRegister, FieldErrors, UseFormGetValues, Control, useWatch } from 'react-hook-form';
import { ReferenceFormType } from '../schema';
import Row from '../../components/Row';
import { Radio } from '../../components/Radio';
import { Select } from '../../components/Select';
import Textarea from '../../components/Textarea';
import { Relationship, YesNo } from '../enums';

type Step1Props = {
    register: UseFormRegister<ReferenceFormType>;
    errors: FieldErrors<ReferenceFormType>;
    getValues: UseFormGetValues<ReferenceFormType>;
    t: any;
    control: Control<ReferenceFormType>;
};
const Step1: FC<Step1Props> = ({ register, errors, getValues, t, control }) => {
    const relationshipField = useWatch({ control, name: 'relationship' });
    const isOther = relationshipField == 'Other';
    return (
        <div>
            <section>
                <SectionTitle title={''} />
                <Row>
                    <Input
                        label={t('applicantName')}
                        register={register('applicantName')}
                        placeholder={t('applicantName')}
                        error={errors.applicantName || undefined}
                    />
                    <Input
                        label={t('refereeName')}
                        register={register('refereeName')}
                        placeholder={t('refereeName')}
                        error={errors.refereeName || undefined}
                    />
                </Row>
                <Row>
                    <Radio
                        label={t('relationship.title')}
                        register={register('relationship')}
                        options={Relationship(t)}
                        error={errors.relationship}
                    />
                    {isOther && (
                        <Input
                            label={t('relationshipExplain')}
                            register={register('relationshipExplain')}
                            placeholder={t('relationshipExplain')}
                            error={errors.relationshipExplain || undefined}
                        />
                    )}
                </Row>
            </section>
        </div>
    );
};

export default Step1;
