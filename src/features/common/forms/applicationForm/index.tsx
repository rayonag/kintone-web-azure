import React, { useEffect, useReducer, useState } from 'react';
import Step1 from './views/Step1';
import { useDashboardUser } from '@/common/context/dashboardUser';
import { langReducer } from '@/components/health-questionnaire/form/hooks/lang';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { useShallow } from 'zustand/react/shallow';
import useUserStore from '../../portal/store';
import { ApplicationFormDefaultValues, ApplicationFormFields, ApplicationFormSchema, ApplicationFormType, customErrorMap } from './schema';
import ProgressBar from '../components/ProgressBar';
import './i18n/translations/config'; //i18
import Link from 'next/link';
import Step2 from './views/Step2';
import Step3 from './views/Step3';
import Step4 from './views/Step4';
import Step5 from './views/Step5';
import Step6 from './views/Step6';
import Step7 from './views/Step7';
import Step8 from './views/Step8';
import Step9 from './views/Step9';
import Step10 from './views/Step10';

const ApplicationForm = (props: { repo: any }) => {
    const [step, setStep] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // for future use on multi language
    const { t } = useTranslation('applicationForm');
    const initialLang = 'en';
    const [locale, dispatch] = useReducer<(state: string, actions: string) => string>(langReducer, initialLang);

    const dashboardUser = useDashboardUser();
    const { username } = useUserStore(
        useShallow((state) => ({
            username: state.username
        }))
    );
    const {
        formState: { errors: formatError },
        trigger,
        getValues,
        setValue,
        register,
        control,
        ...rest
    } = useForm<ApplicationFormType>({
        mode: 'onBlur',
        // reValidateMode: 'onChange', // works only after form submission
        defaultValues: ApplicationFormDefaultValues,
        resolver: zodResolver(ApplicationFormSchema)
    });

    z.setErrorMap(customErrorMap(t));

    const validate = async () => {
        const values = getValues();
        console.log('values', values);
        const isValid = await trigger(ApplicationFormFields[step] as any); // TODO: review type
        if (isValid) return true;
        else {
            const firstErrorField = Object.keys(formatError)[0];
            console.log('firstErrorField', firstErrorField);
            const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
            if (errorElement) {
                errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return false;
        }
    };

    useEffect(() => {
        if (dashboardUser.ref) setValue('ref', dashboardUser.ref);
        if (dashboardUser.office) setValue('office', dashboardUser.office);
    }, [dashboardUser]);

    useEffect(() => {
        document.querySelector('#section-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [step]);
    // confirm before leave page. TODO: dirty form check not working
    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            event.preventDefault();
            event.returnValue = '';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    useEffect(() => {
        if (props.repo.prefilledFormRecord) {
            const data = props.repo.prefilledFormRecord;
            console.log('data', data);
            Object.keys(data).forEach((key: any) => {
                if (ApplicationFormFields.includes(key)) {
                    if (data[key].type === 'DROP_DOWN') setValue(key, [data[key].value]);
                    //if (data[key].type === 'RADIO_BUTTON') setValue(key, [data[key].value]);
                    else setValue(key, data[key].value);
                }
            });
        }
    }, [props]);
    return (
        <div className="grid justify-center p-10 max-h-screen overflow-y-scroll">
            <form className="flex flex-col my-14 p-10 max-w-[95vw] md:w-[50rem] md:max-w-screen bg-gray-50 border rounded-md">
                <ProgressBar steps={10} setStep={setStep} currentStep={step} />
                {step == 1 && <Step1 register={register} getValues={getValues} errors={formatError} t={t} control={control} />}
                {step == 2 && <Step2 register={register} getValues={getValues} errors={formatError} t={t} />}
                {step == 3 && <Step3 register={register} getValues={getValues} errors={formatError} t={t} />}
                {step == 4 && <Step4 register={register} getValues={getValues} errors={formatError} t={t} control={control} />}
                {step == 5 && <Step5 register={register} getValues={getValues} errors={formatError} t={t} control={control} />}
                {step == 6 && <Step6 register={register} getValues={getValues} errors={formatError} t={t} />}
                {step == 7 && <Step7 register={register} getValues={getValues} errors={formatError} t={t} control={control} />}
                {step == 8 && <Step8 register={register} getValues={getValues} errors={formatError} t={t} control={control} />}
                {step == 9 && <Step9 register={register} getValues={getValues} errors={formatError} t={t} />}
                {step == 10 && <Step10 register={register} getValues={getValues} errors={formatError} t={t} />}
                {step != 10 && (
                    <button
                        type="button"
                        onClick={async () => {
                            const valid = await validate();
                            if (valid) setStep(step + 1);
                        }}
                        className="btn-wide"
                    >
                        {t('system.next')}
                    </button>
                )}
                {step == 10 && (
                    <button
                        type="button"
                        onClick={async () => {
                            // const valid = await validate(step);
                            // if (valid) setModalIsOpen(true);
                        }}
                        className="btn-wide"
                    >
                        {t('system.submit')}
                    </button>
                )}
                {step != 1 && (
                    <button type="button" onClick={() => setStep(step - 1)} className="btn-wide">
                        {t('system.back')}
                    </button>
                )}
                {step == 1 && (
                    <Link type="button" href="/apply" className="btn-wide">
                        Back to Top
                    </Link>
                )}
                {/* {page === 0 && <FirstPage register={register} errors={formatError} getValues={getValues} t={t} />}
            {page === 1 && <SecondPage register={register} errors={formatError} getValues={getValues} t={t} />}
            {page === 2 && <ThirdPage register={register} errors={formatError} t={t} />}
            <ConfirmationModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} getValues={getValues} t={t} />
            {page != 2 && (
                <button
                    type="button"
                    onClick={async () => {
                        const valid = await validate(page);
                        if (valid) setPage(page + 1);
                    }}
                    className="btn-wide"
                >
                    {t('system.next')}
                </button>
            )}
            {page == 2 && (
                <button
                    type="button"
                    onClick={async () => {
                        const valid = await validate(page);
                        if (valid) setModalIsOpen(true);
                    }}
                    className="btn-wide"
                >
                    {t('system.submit')}
                </button>
            )}
            {page != 0 && (
                <button type="button" onClick={() => setPage(page - 1)} className="btn-wide">
                    {t('system.back')}
                </button>
            )}
            {page == 0 && (
                <Link type="button" href="/apply" className="btn-wide">
                    Back to Top
                </Link>
            )} */}
            </form>
        </div>
    );
};

export default ApplicationForm;
