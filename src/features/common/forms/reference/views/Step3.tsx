import React, { FC } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { UseFormRegister, FieldErrors, UseFormGetValues, Control, useWatch } from 'react-hook-form';
import { ReferenceFormType } from '../schema';
import Row from '../../components/Row';
import { Radio } from '../../components/Radio';
import Textarea from '../../components/Textarea';
import { YesNo } from '../enums';

type Step3Props = {
    register: UseFormRegister<ReferenceFormType>;
    errors: FieldErrors<ReferenceFormType>;
    getValues: UseFormGetValues<ReferenceFormType>;
    t: any;
    control: Control<ReferenceFormType>;
};
const Step3: FC<Step3Props> = ({ register, errors, getValues, t, control }) => {
    const relationshipField = useWatch({ control, name: 'relationship' });
    const isOther = relationshipField == 'Other';
    return (
        <div>
            <section>
                <SectionTitle title={''} />
                <Row>
                    <Textarea
                        label={t('demonstratedServantHeart')}
                        register={register('demonstratedServantHeart')}
                        placeholder="Enter here"
                        error={errors.demonstratedServantHeart || undefined}
                    />
                </Row>
                <Row>
                    <Textarea
                        label={t('dealtProblem')}
                        register={register('dealtProblem')}
                        placeholder="Enter here"
                        error={errors.dealtProblem || undefined}
                    />
                </Row>
                <Row>
                    <Textarea
                        label={t('familyRelationship')}
                        register={register('familyRelationship')}
                        placeholder="Enter here"
                        error={errors.familyRelationship || undefined}
                    />
                </Row>
                <Row>
                    <Radio label={t('guest')} register={register('guest')} options={YesNo(t)} error={errors.guest} />
                    <Textarea
                        label={t('guestExplain')}
                        register={register('guestExplain')}
                        placeholder="Enter here"
                        error={errors.guestExplain || undefined}
                    />
                </Row>
                <Row>
                    <Radio label={t('showInterest')} register={register('showInterest')} options={YesNo(t)} error={errors.showInterest} />
                    <Textarea
                        label={t('showInterestComment')}
                        register={register('showInterestComment')}
                        placeholder="Enter here"
                        error={errors.showInterestComment || undefined}
                    />
                </Row>
                <Row>
                    <Radio
                        label={t('christianJewishRelations')}
                        register={register('christianJewishRelations')}
                        options={YesNo(t)}
                        error={errors.christianJewishRelations}
                    />
                    <Textarea
                        label={t('christianJewishRelationsComment')}
                        register={register('christianJewishRelationsComment')}
                        placeholder="Enter here"
                        error={errors.christianJewishRelationsComment || undefined}
                    />
                </Row>
                <Row>
                    <Textarea
                        label={t('aptitudes')}
                        register={register('aptitudes')}
                        placeholder="Enter here"
                        error={errors.aptitudes || undefined}
                    />
                </Row>
            </section>
        </div>
    );
};

export default Step3;
