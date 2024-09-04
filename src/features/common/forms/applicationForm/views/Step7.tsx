import useUserStore from '@/features/common/store';
import React, { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';
import SectionTitle from '../../components/SectionTitle';
import Input from '../../components/Input';
import { TFunction } from 'i18next';
import { UseFormRegister, FieldErrors, UseFormGetValues, Control } from 'react-hook-form';
import { ApplicationFormType } from '../schema';
import Row from '../../components/Row';
import { HealthCondition, SkillSoftware, SkillSystem, YesNo } from '../enums';
import SkillRangeInput from '../../components/SkillRangeInput';
import { Radio } from '../../components/Radio';
import Image from 'next/image';
import Checkbox from '../../components/Checkbox';

type Step7Props = {
    register: UseFormRegister<ApplicationFormType>;
    errors: FieldErrors<ApplicationFormType>;
    getValues: UseFormGetValues<ApplicationFormType>;
    control: Control<ApplicationFormType>;
    t: any;
};
const Step7: FC<Step7Props> = ({ register, errors, getValues, control, t }) => {
    return (
        <div>
            <section>
                <SectionTitle title={t('sectionTitle.7')} />
                <div className="font-semibold mt-2 text-black">{t('skillIntroduction')}</div>

                <div className="flex justify-center items-center bg-gray-200 h-40 w-full rounded-lg">
                    <video src="/images/slider.webm" height={200} width={300} loop autoPlay />
                </div>
                <div className="font-semibold mt-2 text-black">{t('skillSectionA')}</div>
                <Row>
                    <SkillRangeInput
                        control={control}
                        label={t('skillCarpentry')}
                        register={register('skillCarpentry')}
                        error={errors.skillCarpentry || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillConstruction')}
                        register={register('skillConstruction')}
                        error={errors.skillConstruction || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillElectrical')}
                        register={register('skillElectrical')}
                        error={errors.skillElectrical || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillForklift')}
                        register={register('skillForklift')}
                        error={errors.skillForklift || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillMechanic')}
                        register={register('skillMechanic')}
                        error={errors.skillMechanic || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillRepair')}
                        register={register('skillRepair')}
                        error={errors.skillRepair || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillLaborer')}
                        register={register('skillLaborer')}
                        error={errors.skillLaborer || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillWelding')}
                        register={register('skillWelding')}
                        error={errors.skillWelding || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillMasonry')}
                        register={register('skillMasonry')}
                        error={errors.skillMasonry || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillPlumbing')}
                        register={register('skillPlumbing')}
                        error={errors.skillPlumbing || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillPainting')}
                        register={register('skillPainting')}
                        error={errors.skillPainting || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillWarehouseMaintenance')}
                        register={register('skillWarehouseMaintenance')}
                        error={errors.skillWarehouseMaintenance || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillTransportation')}
                        register={register('skillTransportation')}
                        error={errors.skillTransportation || undefined}
                    />
                    <Radio
                        label={t('hasHeavyLicense')}
                        register={register('hasHeavyLicense')}
                        options={YesNo(t)}
                        error={errors.hasHeavyLicense || undefined}
                    />
                </Row>

                <div className="font-semibold mt-2 text-black">{t('skillSectionB')}</div>
                <Row>
                    <SkillRangeInput
                        control={control}
                        label={t('skillWebsite')}
                        register={register('skillWebsite')}
                        error={errors.skillWebsite || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillWebDesign')}
                        register={register('skillWebDesign')}
                        error={errors.skillWebDesign || undefined}
                    />
                    <SkillRangeInput control={control} label={t('skillIT')} register={register('skillIT')} error={errors.skillIT || undefined} />
                    <SkillRangeInput
                        control={control}
                        label={t('skillVideo')}
                        register={register('skillVideo')}
                        error={errors.skillVideo || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillComputerDesign')}
                        register={register('skillComputerDesign')}
                        error={errors.skillComputerDesign || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillAdobePhotoshop')}
                        register={register('skillAdobePhotoshop')}
                        error={errors.skillAdobePhotoshop || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillAdobeInDesign')}
                        register={register('skillAdobeInDesign')}
                        error={errors.skillAdobeInDesign || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillOtherPrograms')}
                        register={register('skillOtherPrograms')}
                        error={errors.skillOtherPrograms || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillJournalism')}
                        register={register('skillJournalism')}
                        error={errors.skillJournalism || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillPublicSpeaking')}
                        register={register('skillPublicSpeaking')}
                        error={errors.skillPublicSpeaking || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillFilmmaking')}
                        register={register('skillFilmmaking')}
                        error={errors.skillFilmmaking || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillPhotography')}
                        register={register('skillPhotography')}
                        error={errors.skillPhotography || undefined}
                    />
                </Row>

                <div className="font-semibold mt-2 text-black">{t('skillSectionC')}</div>
                <Row>
                    <SkillRangeInput
                        control={control}
                        label={t('skillAccounting')}
                        register={register('skillAccounting')}
                        error={errors.skillAccounting || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillAdministration')}
                        register={register('skillAdministration')}
                        error={errors.skillAdministration || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillBookkeeping')}
                        register={register('skillBookkeeping')}
                        error={errors.skillBookkeeping || undefined}
                    />
                </Row>
                <Row>
                    <Checkbox
                        label={t('skillSystem.title')}
                        name={'skillSystem'}
                        control={control}
                        options={SkillSystem(t)}
                        error={errors.skillSystem || undefined}
                    />
                    <Checkbox
                        label={t('skillSoftware.title')}
                        name={'skillSoftware'}
                        control={control}
                        options={SkillSoftware(t)}
                        error={errors.skillSoftware || undefined}
                    />
                    {/* <SkillRangeInput
                        control={control}
                        label={t('skillOperatingSystems')}
                        register={register('skillOperatingSystems')}
                        error={errors.skillOperatingSystems || undefined}
                    /> */}
                </Row>
                <Row>
                    <SkillRangeInput
                        control={control}
                        label={t('skillOfficeSuite')}
                        register={register('skillOfficeSuite')}
                        error={errors.skillOfficeSuite || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillExcel')}
                        register={register('skillExcel')}
                        error={errors.skillExcel || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillTyping')}
                        register={register('skillTyping')}
                        error={errors.skillTyping || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillGoogleDrive')}
                        register={register('skillGoogleDrive')}
                        error={errors.skillGoogleDrive || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillSecretarial')}
                        register={register('skillSecretarial')}
                        error={errors.skillSecretarial || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillOrganizing')}
                        register={register('skillOrganizing')}
                        error={errors.skillOrganizing || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillLibrary')}
                        register={register('skillLibrary')}
                        error={errors.skillLibrary || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillReception')}
                        register={register('skillReception')}
                        error={errors.skillReception || undefined}
                    />
                </Row>

                <div className="font-semibold mt-2 text-black">{t('skillSectionD')}</div>
                <Row>
                    <SkillRangeInput
                        control={control}
                        label={t('skillProofreading')}
                        register={register('skillProofreading')}
                        error={errors.skillProofreading || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillCopyEditing')}
                        register={register('skillCopyEditing')}
                        error={errors.skillCopyEditing || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillTranslation')}
                        register={register('skillTranslation')}
                        error={errors.skillTranslation || undefined}
                    />
                </Row>

                <div className="font-semibold mt-2 text-black">{t('skillSectionE')}</div>
                <Row>
                    <SkillRangeInput
                        control={control}
                        label={t('skillCounseling')}
                        register={register('skillCounseling')}
                        error={errors.skillCounseling || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillMusicalInstrument')}
                        register={register('skillMusicalInstrument')}
                        error={errors.skillMusicalInstrument || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillJanitorial')}
                        register={register('skillJanitorial')}
                        error={errors.skillJanitorial || undefined}
                    />
                    <SkillRangeInput
                        control={control}
                        label={t('skillCooking')}
                        register={register('skillCooking')}
                        error={errors.skillCooking || undefined}
                    />
                </Row>
                <Row>
                    <Input
                        label={t('skillForeignLanguage')}
                        register={register('skillForeignLanguage')}
                        placeholder={'Enter here'}
                        error={errors.skillForeignLanguage || undefined}
                    />
                </Row>
                <Row>
                    <Input
                        label={t('skillComputer')}
                        register={register('skillComputer')}
                        placeholder={'Enter here'}
                        error={errors.skillComputer || undefined}
                    />
                </Row>
                <Row>
                    <Input
                        label={t('skillSpecialTraining')}
                        register={register('skillSpecialTraining')}
                        placeholder={'Enter here'}
                        error={errors.skillSpecialTraining || undefined}
                    />
                </Row>
            </section>
        </div>
    );
};

export default Step7;
