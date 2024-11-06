'use client';
import React, { useEffect, useReducer, useState } from 'react';
import Step1 from './views/Step1';
import { useDashboardUser } from '@/common/context/dashboardUser';
import { langReducer } from '@/features/common/forms/healthQuestionnaire/i18n/lang';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { useShallow } from 'zustand/react/shallow';
import useUserStore from '../../store';
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
import Header from '@/components/header menu/Header';
import convertPrefilledFormRecord from './hooks/convertPrefilledFormRecord';
import Modal from 'react-modal';
import ReactModal from 'react-modal';
import postTempApplicationForm from './hooks/postTempApplicationForm';
import applicationForm_en from './i18n/translations/en.json';
import common_en from '@/libs/i18n/common/en.json';

const tStore = { ...applicationForm_en, ...common_en };
const getNestedProperty = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};
export const t = (key: string) => getNestedProperty(tStore, key);

const ApplicationForm = (props: any) => {
    const [step, setStep] = useState(1);
    const { setIsLoading } = useLoading();
    const { username, name, type, initUser } = useUserStore(
        useShallow((state) => ({
            username: state.username,
            name: state.name,
            knownAs: state.knownAs,
            type: state.applicationType,
            initUser: state.initUser
        }))
    );
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isDialogOpen) {
            (async () => {
                setTimeout(() => {
                    setIsDialogOpen(false);
                }, 3000);
            })();
        }
    }, [isDialogOpen]);
    //const [modalIsOpen, setModalIsOpen] = useState(false);
    // for future use on multi language
    // currently disabled
    // const { t } = useTranslation('applicationForm');
    const tStore = { ...applicationForm_en, ...common_en };
    const getNestedProperty = (obj: any, path: string) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };
    const t = (key: string) => getNestedProperty(tStore, key);
    //const initialLang = 'en';
    //const [locale, dispatch] = useReducer<(state: string, actions: string) => string>(langReducer, initialLang);

    const dashboardUser = useDashboardUser();
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
            const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
            console.log('errorElement', firstErrorField);
            if (errorElement) {
                errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return false;
        }
    };

    useEffect(() => {
        if (dashboardUser.ref) setValue('ref', dashboardUser.ref);
        if (dashboardUser.office) setValue('office.office', dashboardUser.office);
    }, [dashboardUser]);
    useEffect(() => {
        if (type) setValue('type.type', type);
    }, [type]);

    useEffect(() => {
        document.querySelector('#section-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [step]);
    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            if (!isSubmitting) {
                event.preventDefault();
                event.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isSubmitting]);
    // load prefilled data
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        if (props.repo?.prefilledFormRecord) {
            setIsModalOpen(true);
        }
    }, []);
    const handleModalResponse = (isResume: boolean) => {
        if (!isResume) {
            if (!window.confirm('Are you sure you want to delete your progress and start from scratch?')) {
                return;
            } else {
                setIsModalOpen(false);
                postTempApplicationForm(null as unknown as ApplicationFormType, dashboardUser.ref || '0', 10); // step 10 to delete progress. TODO: review type
                return;
            }
        } else if (isResume) {
            const data = props.repo.prefilledFormRecord;
            convertPrefilledFormRecord(data, setValue);
            //debugger;
            setStep(parseInt(data['currentStep'].value) || 1);
            setIsModalOpen(false);
        } else {
            // Handle starting from scratch if needed
            // For example, reset the form
        }
    };
    useEffect(() => {
        // for modal
        ReactModal.setAppElement('#__next');
    }, []);
    const router = useRouter();
    const onSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        const valid = await validate();
        if (!valid) return;
        if (!window.confirm('Do you want to submit?')) return;
        const values = getValues();
        setIsLoading(true);
        const res = await postApplicationForm(values, dashboardUser.ref || undefined);
        if (res) {
            postTempApplicationForm(values, dashboardUser.ref || '0', step);
            alert('Your form has been submitted!');
            setIsLoading(false);
            window.location.reload();
        } else {
            alert('Failed to submit the form. Please try again.');
            setIsLoading(false);
        }
    };
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };
    const handleSaveExit = () => {
        postTempApplicationForm(getValues(), dashboardUser.ref || '0', step);
        router.push('/apply');
    };

    return (
        <>
            <div className="grid justify-center px-10 pb-10 max-h-screen overflow-y-scroll">
                <div
                    className={`absolute top-20 right-20 bg-[#012c66] font-bold opacity-80 rounded-md text-white p-4 ${
                        isDialogOpen ? 'max-w-40 block' : 'max-w-0 hidden'
                    } transition-all duration-500 ease-in overflow-hidden`}
                >
                    <p>Progress Saved</p>
                </div>
                <Modal isOpen={isModalOpen} style={customStyles}>
                    <div className="text-black flex flex-col text-center">
                        <h1 className="text-xl font-semibold">There is a saved record of your progress.</h1>
                        <button className="btn" onClick={() => handleModalResponse(true)}>
                            Resume from the saved point.
                        </button>
                        <button className="btn-disabled" onClick={() => handleModalResponse(false)}>
                            Delete your progress and start from scratch
                        </button>
                    </div>
                </Modal>
                <form
                    onSubmit={(e) => onSubmit(e)}
                    className="flex flex-col my-14 p-10 max-w-[95vw] md:w-[50rem] md:max-w-screen bg-gray-50 border rounded-md"
                >
                    <ProgressBar steps={10} setStep={setStep} currentStep={step} />
                    {step == 1 && <Step1 register={register} getValues={getValues} errors={formatError} t={t} control={control} />}
                    {step == 2 && <Step2 register={register} getValues={getValues} errors={formatError} t={t} />}
                    {step == 3 && <Step3 register={register} getValues={getValues} errors={formatError} t={t} />}
                    {step == 4 && <Step4 register={register} getValues={getValues} errors={formatError} t={t} control={control} type={type} />}
                    {step == 5 && <Step5 register={register} getValues={getValues} errors={formatError} t={t} control={control} />}
                    {step == 6 && <Step6 register={register} getValues={getValues} errors={formatError} t={t} />}
                    {step == 7 && <Step7 register={register} getValues={getValues} errors={formatError} t={t} control={control} />}
                    {step == 8 && <Step8 register={register} getValues={getValues} errors={formatError} t={t} control={control} />}
                    {step == 9 && <Step9 register={register} getValues={getValues} errors={formatError} t={t} type={dashboardUser.type} />}
                    {step == 10 && <Step10 register={register} getValues={getValues} errors={formatError} t={t} />}
                    {step != 10 && (
                        <button
                            type="button"
                            onClick={async () => {
                                const valid = await validate();
                                if (valid) {
                                    // temp save
                                    postTempApplicationForm(getValues(), dashboardUser.ref || '0', step);
                                    setIsDialogOpen(true);
                                    setStep(step + 1);
                                }
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
                    <button type="button" className="text-center btn-wide" onClick={() => handleSaveExit()}>
                        Save & Exit
                    </button>
                </form>
            </div>
        </>
    );
};

export default ApplicationForm;
