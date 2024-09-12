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
import { Character1, Character2, Character3, Character4, IndicationDesire, Traits, Relationship, YesNo } from '../enums';
import Checkbox from '../../components/Checkbox';

type Step4Props = {
    register: UseFormRegister<ReferenceFormType>;
    errors: FieldErrors<ReferenceFormType>;
    getValues: UseFormGetValues<ReferenceFormType>;
    t: any;
    control: Control<ReferenceFormType>;
};
const Step4: FC<Step4Props> = ({ register, errors, getValues, t, control }) => {
    const relationshipField = useWatch({ control, name: 'relationship' });
    const isOther = relationshipField == 'Other';
    return (
        <div>
            <section>
                <SectionTitle title={''} />
                <div className="font-semibold mt-2 text-black">{t('traitTitle')}</div>
                <Row>
                    <Select
                        label={t('traitPhysicalCondition')}
                        register={register('traitPhysicalCondition')}
                        options={Traits(t)}
                        error={errors.traitPhysicalCondition}
                    />
                    <Select
                        label={t('traitEmotionalStability')}
                        register={register('traitEmotionalStability')}
                        options={Traits(t)}
                        error={errors.traitEmotionalStability}
                    />
                    <Select
                        label={t('traitSelfDiscipline')}
                        register={register('traitSelfDiscipline')}
                        options={Traits(t)}
                        error={errors.traitSelfDiscipline}
                    />
                    <Select
                        label={t('traitFinancialStewardship')}
                        register={register('traitFinancialStewardship')}
                        options={Traits(t)}
                        error={errors.traitFinancialStewardship}
                    />
                    <Select
                        label={t('traitSelflessness')}
                        register={register('traitSelflessness')}
                        options={Traits(t)}
                        error={errors.traitSelflessness}
                    />
                    <Select
                        label={t('traitFriendliness')}
                        register={register('traitFriendliness')}
                        options={Traits(t)}
                        error={errors.traitFriendliness}
                    />
                    <Select
                        label={t('traitSocialAcceptability')}
                        register={register('traitSocialAcceptability')}
                        options={Traits(t)}
                        error={errors.traitSocialAcceptability}
                    />
                    <Select
                        label={t('traitServanthood')}
                        register={register('traitServanthood')}
                        options={Traits(t)}
                        error={errors.traitServanthood}
                    />
                    <Select label={t('traitLeadership')} register={register('traitLeadership')} options={Traits(t)} error={errors.traitLeadership} />
                    <Select label={t('traitTeamwork')} register={register('traitTeamwork')} options={Traits(t)} error={errors.traitTeamwork} />
                    <Select label={t('traitJudgment')} register={register('traitJudgment')} options={Traits(t)} error={errors.traitJudgment} />
                    <Select
                        label={t('traitPersonalAppearance')}
                        register={register('traitPersonalAppearance')}
                        options={Traits(t)}
                        error={errors.traitPersonalAppearance}
                    />
                    <Select
                        label={t('traitWorkmanship')}
                        register={register('traitWorkmanship')}
                        options={Traits(t)}
                        error={errors.traitWorkmanship}
                    />
                    <Select
                        label={t('traitFollowingOrders')}
                        register={register('traitFollowingOrders')}
                        options={Traits(t)}
                        error={errors.traitFollowingOrders}
                    />
                    <Select
                        label={t('traitSensitivity')}
                        register={register('traitSensitivity')}
                        options={Traits(t)}
                        error={errors.traitSensitivity}
                    />
                    <Select
                        label={t('traitAdaptability')}
                        register={register('traitAdaptability')}
                        options={Traits(t)}
                        error={errors.traitAdaptability}
                    />
                    <Select label={t('traitIndustry')} register={register('traitIndustry')} options={Traits(t)} error={errors.traitIndustry} />
                    <Select
                        label={t('traitPerseverance')}
                        register={register('traitPerseverance')}
                        options={Traits(t)}
                        error={errors.traitPerseverance}
                    />
                    <Select
                        label={t('traitOrderliness')}
                        register={register('traitOrderliness')}
                        options={Traits(t)}
                        error={errors.traitOrderliness}
                    />
                    <Select
                        label={t('traitPersonalBibleStudy')}
                        register={register('traitPersonalBibleStudy')}
                        options={Traits(t)}
                        error={errors.traitPersonalBibleStudy}
                    />
                    <Select
                        label={t('traitPersonalPrayerLife')}
                        register={register('traitPersonalPrayerLife')}
                        options={Traits(t)}
                        error={errors.traitPersonalPrayerLife}
                    />
                    <Select
                        label={t('traitTeachableSpirit')}
                        register={register('traitTeachableSpirit')}
                        options={Traits(t)}
                        error={errors.traitTeachableSpirit}
                    />
                </Row>
                <div className="font-semibold mt-2 text-black">{t('characterTitle')}</div>
                {/* <Row>
                    <Checkbox
                        label={null}
                        name={'characters.character1'}
                        control={control}
                        options={Character1(t)}
                        error={errors.characters?.character1 || undefined}
                    />
                    <Checkbox
                        label={null}
                        name={'characters.character2'}
                        control={control}
                        options={Character2(t)}
                        error={errors.characters?.character2 || undefined}
                    />
                </Row>
                <Row>
                    <Checkbox
                        label={null}
                        name={'characters.character3'}
                        control={control}
                        options={Character3(t)}
                        error={errors.characters?.character3 || undefined}
                    />
                    <Checkbox
                        label={null}
                        name={'characters.character4'}
                        control={control}
                        options={Character4(t)}
                        error={errors.characters?.character4 || undefined}
                    />
                </Row> */}
            </section>
        </div>
    );
};

export default Step4;
