'use client';
import { Input, Select, Radio, Checkbox, Number } from './../components/FormComponents';
import { Birthday } from '../components/Birthday';
import { useTranslation } from 'react-i18next';

export default function FirstPage(props: any) {
    const setPage = props.setPage;
    const errors = props.errors;
    const register = props.register;
    const trigger = props.trigger;
    const { t } = useTranslation();

    return (
        <>
            <div className="text-2xl font-bold my-10">
                <div>BRIDGES FOR PEACE</div>
                <div>PERSONAL HEALTH QUESTIONNAIRE</div>
            </div>
            <div className="flex flex-wrap mb-6">
                <Input label={t('name')} register={register('name')} placeholder={t('name')} error={errors.name || undefined} />
                <Number label={t('age')} register={register('age')} placeholder={t('age')} error={errors.age || undefined} />
            </div>
            <div className="flex flex-wrap mb-6">
                <Number label={t('height')} register={register('height')} placeholder={t('height')} error={errors.height || undefined} />
                <Checkbox label={null} register={register('heightUnit')} options={['ft', 'cm']} error={errors.ftcm || undefined} />
                <Number label={t('weight')} register={register('weight')} placeholder={t('weight')} error={errors.weight || undefined} />
                <Checkbox label={null} register={register('weightUnit')} options={['lbs', 'kg']} error={errors.lbskg || undefined} />
            </div>
        </>
    );
}
