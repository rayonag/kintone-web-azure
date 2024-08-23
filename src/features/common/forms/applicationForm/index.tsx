import React, { useEffect, useReducer, useState } from 'react';
import Step1 from './views/Step1';
import { useDashboardUser } from '@/common/context/dashboardUser';
import { langReducer } from '@/components/health-questionnaire/form/hooks/lang';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { useShallow } from 'zustand/react/shallow';
import useUserStore from '../../portal/store';
import { ApplicationFormFields, ApplicationFormSchema, ApplicationFormType, customErrorMap } from './schema';
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
    console.log('username', username);
    const {
        formState: { errors: formatError },
        trigger,
        getValues,
        setValue,
        register
    } = useForm<ApplicationFormType>({
        mode: 'onChange',
        defaultValues: {},
        resolver: zodResolver(ApplicationFormSchema)
    });

    z.setErrorMap(customErrorMap(t));

    const validate = async (page: number) => {
        // const isValid = await trigger(ApplicationFormFields[page]);
        // if (isValid) return true;
        // else return false;
        return true;
    };

    useEffect(() => {
        if (dashboardUser.ref) setValue('ref', dashboardUser.ref);
        if (dashboardUser.office) setValue('office', dashboardUser.office);
    }, [dashboardUser]);

    useEffect(() => {
        window.scrollTo(0, 0);
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
        <div className="p-10 max-h-screen overflow-scroll">
            <form className="flex flex-col my-14 p-10 bg-gray-50 border rounded-md">
                <ProgressBar steps={9} setStep={setStep} currentStep={step} />
                {step == 1 && <Step1 register={register} getValues={getValues} errors={formatError} t={t} />}
                {step == 2 && <Step2 register={register} getValues={getValues} errors={formatError} t={t} />}
                {step == 3 && <Step3 register={register} getValues={getValues} errors={formatError} t={t} />}
                {step == 4 && <Step4 register={register} getValues={getValues} errors={formatError} t={t} />}
                {step == 5 && <Step5 register={register} getValues={getValues} errors={formatError} t={t} />}
                {step == 6 && <Step6 register={register} getValues={getValues} errors={formatError} t={t} />}
                {step == 7 && <Step7 register={register} getValues={getValues} errors={formatError} t={t} />}
                {step == 8 && <Step8 register={register} getValues={getValues} errors={formatError} t={t} />}
                {step == 9 && <Step9 register={register} getValues={getValues} errors={formatError} t={t} />}
                {step != 9 && (
                    <button
                        type="button"
                        onClick={async () => {
                            const valid = await validate(step);
                            if (valid) setStep(step + 1);
                        }}
                        className="btn-wide"
                    >
                        {t('system.next')}
                    </button>
                )}
                {step == 9 && (
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
