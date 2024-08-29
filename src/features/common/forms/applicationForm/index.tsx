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
import { useLoading } from '@/common/context/loading';
import postApplicationForm from './hooks/postApplicationForm';
import { useRouter } from 'next/router';

const ApplicationForm = (props: any) => {
    const [step, setStep] = useState(1);
    const { setIsLoading } = useLoading();

    //const [modalIsOpen, setModalIsOpen] = useState(false);
    // for future use on multi language
    const { t } = useTranslation('applicationForm');
    const initialLang = 'en';
    //const [locale, dispatch] = useReducer<(state: string, actions: string) => string>(langReducer, initialLang);
    const form = props.repo;
    console.log('form', form);
    const dashboardUser = useDashboardUser();
    // const { username } = useUserStore(
    //     useShallow((state) => ({
    //         username: state.username
    //     }))
    // );
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
            console.log('firstErrorField', formatError);
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
        if (props.repo?.prefilledFormRecord) {
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
    const router = useRouter();
    const onSubmit = async (e) => {
        e.preventDefault();
        const valid = await validate();
        if (!valid) return;
        if (!window.confirm('Do you want to submit?')) return;
        const values = getValues();
        console.log('values', values);
        setIsLoading(true);
        const res = await postApplicationForm(values, dashboardUser.ref || undefined);
        if (res) {
            alert('Your form has been submitted!');
            setIsLoading(false);
            router.push('/apply');
        } else {
            alert('Failed to submit the form. Please try again.');
            setIsLoading(false);
        }
        // const res = await postPersonalHealthQuestionnaire(values, dashboardUser.ref || '0');
        // if (res) setModalIsOpen(true);
    };
    return (
        <div className="grid justify-center p-10 max-h-screen overflow-y-scroll">
            <form
                onSubmit={(e) => onSubmit(e)}
                className="flex flex-col my-14 p-10 max-w-[95vw] md:w-[50rem] md:max-w-screen bg-gray-50 border rounded-md"
            >
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
                    <button type="submit" className="btn-wide">
                        {t('system.submit')}
                    </button>
                )}
                {step != 1 && (
                    <button type="button" onClick={() => setStep(step - 1)} className="btn-wide">
                        {t('system.back')}
                    </button>
                )}
                {step == 1 && (
                    <Link href="/apply" className="text-center btn-wide">
                        Back to Top
                    </Link>
                )}
            </form>
        </div>
    );
};

export default ApplicationForm;
