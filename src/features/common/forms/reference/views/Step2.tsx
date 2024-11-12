import React, { FC } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { UseFormRegister, FieldErrors, UseFormGetValues, Control, useWatch } from 'react-hook-form';
import { ReferenceFormType } from '../schema';
import Row from '../../components/Row';
import { Radio } from '../../components/Radio';
import { Select } from '../../components/Select';
import Textarea from '../../components/Textarea';
import { IndicationDesire, Rate, YesNo } from '../enums';

type Step2Props = {
    register: UseFormRegister<ReferenceFormType>;
    errors: FieldErrors<ReferenceFormType>;
    getValues: UseFormGetValues<ReferenceFormType>;
    t: any;
    control: Control<ReferenceFormType>;
};
const Step2: FC<Step2Props> = ({ register, errors, getValues, t, control }) => {
    const relationshipField = useWatch({ control, name: 'relationship' });
    const isOther = relationshipField == 'Other';
    return (
        <div>
            <section>
                <SectionTitle title={''} />
                <Row>
                    <Radio
                        label={t('indicationDesire.title')}
                        register={register('indicationDesire')}
                        options={IndicationDesire(t)}
                        error={errors.indicationDesire}
                    />
                    <Textarea
                        label={t('indicationDesireExplain')}
                        register={register('indicationDesireExplain')}
                        placeholder="Enter here"
                        error={errors.indicationDesireExplain || undefined}
                    />
                </Row>
                <Row>
                    <Textarea
                        label={t('doctrinalPoint')}
                        register={register('doctrinalPoint')}
                        placeholder="Enter here"
                        error={errors.doctrinalPoint || undefined}
                    />
                </Row>
                <Row>
                    <Radio label={t('ethics')} register={register('ethics')} options={YesNo(t)} error={errors.ethics} />
                    <Textarea
                        label={t('ethicsExplain')}
                        register={register('ethicsExplain')}
                        placeholder="Enter here"
                        error={errors.ethicsExplain || undefined}
                    />
                </Row>
                <Row>
                    <Textarea
                        label={t('comeAcross')}
                        register={register('comeAcross')}
                        placeholder="Enter here"
                        error={errors.comeAcross || undefined}
                    />
                </Row>
                <Row>
                    <Select
                        label={t('rateFollowInstructions')}
                        register={register('rateFollowInstructions')}
                        options={Rate(t)}
                        error={errors.rateFollowInstructions}
                    />
                    <Select label={t('rateAttitude')} register={register('rateAttitude')} options={Rate(t)} error={errors.rateAttitude} />
                    <Select label={t('rateVocation')} register={register('rateVocation')} options={Rate(t)} error={errors.rateVocation} />
                </Row>
            </section>
        </div>
    );
};

export default Step2;
