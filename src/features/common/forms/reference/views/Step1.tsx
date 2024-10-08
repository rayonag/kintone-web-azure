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
import Image from 'next/image';
import { bridgesLogoBase64 } from '../../../../../../public/base64/bridgesLogoBase64';

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
                <div className="text-md md:text-xl flex font-[Eurostile Regular]">
                    <div className="w-fit pr-4 flex items-center">
                        <Image src={'/images/bridges-logo.png'} alt="Bridges Logo" width={100} height={100} />
                    </div>
                    <div className="my-4 text-blue-900">
                        <SectionTitle title={'BRIDGES FOR PEACE'} theme="dark" />
                        <div className="font-semibold mt-2">VOLUNTEER REFERENCE</div>
                    </div>
                </div>
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
