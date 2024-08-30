import React, { FC } from 'react';
import SectionTitle from '../../components/SectionTitle';
import Input from '../../components/Input';
import { TFunction } from 'i18next';
import { UseFormRegister, FieldErrors, UseFormGetValues } from 'react-hook-form';
import { ApplicationFormType } from '../schema';
import Row from '../../components/Row';
import { YesNo } from '../enums';
import { Radio } from '../../components/Radio';
import Textarea from '../../components/Textarea';

type Step9Props = {
    register: UseFormRegister<ApplicationFormType>;
    errors: FieldErrors<ApplicationFormType>;
    getValues: UseFormGetValues<ApplicationFormType>;
    t: any;
    type: string | undefined;
};
const Step9: FC<Step9Props> = ({ register, errors, getValues, t, type }) => {
    return (
        <div>
            <section>
                <SectionTitle title={t('sectionTitle.9')} />
                <div className="mt-2 text-black">{t('referenceTitle')}</div>
                <div className="font-semibold mt-2 text-black">{t('refPastorTitle')}</div>
                <Row>
                    <Input
                        label={null}
                        register={register('refPastorName')}
                        placeholder={t('refPastorName')}
                        error={errors.refPastorName || undefined}
                    />
                    <Input
                        label={null}
                        register={register('refPastorPhone')}
                        placeholder={t('refPastorPhone')}
                        error={errors.refPastorPhone || undefined}
                    />
                    <Input
                        label={null}
                        register={register('refPastorEmail')}
                        placeholder={t('refPastorEmail')}
                        error={errors.refPastorEmail || undefined}
                    />
                    <Input
                        label={null}
                        register={register('refPastorAddress')}
                        placeholder={t('refPastorAddress')}
                        error={errors.refPastorAddress || undefined}
                    />
                </Row>
                <div className="font-semibold mt-2 text-black">{t('refEmployerTitle')}</div>
                <Row>
                    <Input
                        label={null}
                        register={register('refEmployerName')}
                        placeholder={t('refEmployerName')}
                        error={errors.refEmployerName || undefined}
                    />
                    <Input
                        label={null}
                        register={register('refEmployerPhone')}
                        placeholder={t('refEmployerPhone')}
                        error={errors.refEmployerPhone || undefined}
                    />
                    <Input
                        label={null}
                        register={register('refEmployerEmail')}
                        placeholder={t('refEmployerEmail')}
                        error={errors.refEmployerEmail || undefined}
                    />
                    <Input
                        label={null}
                        register={register('refEmployerAddress')}
                        placeholder={t('refEmployerAddress')}
                        error={errors.refEmployerAddress || undefined}
                    />
                </Row>
                <div className="font-semibold mt-2 text-black">{t('refFriendTitle')}</div>
                <Row>
                    <Input
                        label={null}
                        register={register('refFriendName')}
                        placeholder={t('refFriendName')}
                        error={errors.refFriendName || undefined}
                    />
                    <Input
                        label={null}
                        register={register('refFriendPhone')}
                        placeholder={t('refFriendPhone')}
                        error={errors.refFriendPhone || undefined}
                    />
                    <Input
                        label={null}
                        register={register('refFriendEmail')}
                        placeholder={t('refFriendEmail')}
                        error={errors.refFriendEmail || undefined}
                    />
                    <Input
                        label={null}
                        register={register('refFriendAddress')}
                        placeholder={t('refFriendAddress')}
                        error={errors.refFriendAddress || undefined}
                    />
                </Row>
                <div className="font-semibold mt-2 text-black">{t('refOtherTitle')}</div>
                {type == 'Long Term' && (
                    <Row>
                        <Input
                            label={null}
                            register={register('refOtherName')}
                            placeholder={t('refOtherName')}
                            error={errors.refOtherName || undefined}
                        />
                        <Input
                            label={null}
                            register={register('refOtherPhone')}
                            placeholder={t('refOtherPhone')}
                            error={errors.refOtherPhone || undefined}
                        />
                        <Input
                            label={null}
                            register={register('refOtherEmail')}
                            placeholder={t('refOtherEmail')}
                            error={errors.refOtherEmail || undefined}
                        />
                        <Input
                            label={null}
                            register={register('refOtherAddress')}
                            placeholder={t('refOtherAddress')}
                            error={errors.refOtherAddress || undefined}
                        />
                        <Input
                            label={null}
                            register={register('refOtherRelationship')}
                            placeholder={t('refOtherRelationship')}
                            error={errors.refOtherRelationship || undefined}
                        />
                    </Row>
                )}
                <Row>
                    <Radio
                        label={t('hasFriendsIsrael')}
                        register={register('hasFriendsIsrael')}
                        options={YesNo(t)}
                        error={errors.hasFriendsIsrael || undefined}
                    />
                    <Textarea
                        label={''}
                        register={register('hasFriendsIsraelExplain')}
                        placeholder={t('hasFriendsIsraelExplain')}
                        error={errors.hasFriendsIsraelExplain || undefined}
                    />
                </Row>
            </section>
        </div>
    );
};

export default Step9;
