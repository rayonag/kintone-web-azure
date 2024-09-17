'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

import { HealthQuestionnaireDefaultValues, HealthQuestionnaireSchema, HealthQuestionnaireType, formFields } from './schema';
import { useDashboardUser } from '@/common/context/dashboardUser';
import { useTranslation } from 'react-i18next';
import { useReducer } from 'react';
import { langReducer } from './i18n/lang';
import { customErrorMap } from './schema';

import FirstPage from './views/Step1';
import SecondPage from './views/Step2';
import ThirdPage from './views/Step3';
import ConfirmationModal from './views/Confirmation';

import './i18n/translations/config'; //i18
import useUserStore from '@/features/common/store';
import { useShallow } from 'zustand/react/shallow';
import healthQuestionnaire_en from './i18n/translations/en.json';
import Step1 from './views/Step1';
import Step2 from './views/Step2';
import Step3 from './views/Step3';
import convertPrefilledFormRecord from './hooks/convertPrefilledFormRecord';
import Image from 'next/image';
import Component from './thisPage';

const FinancialObligation = (props: { repo: any }) => {
    const [page, setPage] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // for future use on multi language
    const initialLang = 'en';
    const [locale, dispatch] = useReducer<(state: string, actions: string) => string>(langReducer, initialLang);

    const dashboardUser = useDashboardUser();
    const { username } = useUserStore(
        useShallow((state) => ({
            username: state.username
        }))
    );
    // temp disable i18n
    // const { t } = useTranslation();
    const tStore = { ...healthQuestionnaire_en };
    const getNestedProperty = (obj: any, path: string) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };
    const t = (key: string) => getNestedProperty(tStore, key);
    const {
        formState: { errors: formatError },
        trigger,
        getValues,
        setValue,
        register,
        control
    } = useForm<HealthQuestionnaireType>({
        mode: 'onChange',
        defaultValues: HealthQuestionnaireDefaultValues,
        resolver: zodResolver(HealthQuestionnaireSchema)
    });

    z.setErrorMap(customErrorMap(t));

    const validate = async (page: number) => {
        const isValid = await trigger(formFields[page]);
        if (isValid) return true;
        else return false;
    };

    useEffect(() => {
        if (dashboardUser.ref) setValue('ref', dashboardUser.ref);
        if (dashboardUser.office) setValue('office', dashboardUser.office);
    }, [dashboardUser]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);
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
            convertPrefilledFormRecord(data, setValue);
        }
    }, [props]);
    return (
        <form className="flex flex-col px-10 pb-10 text-center">
            {/* <Image priority={true} src="/images/zealous-financial.jpg" width={500} height={400} alt="First Time Tips" />

            <select className="bg-blue-200 text-black text-center m-4 p-4">
                <option value="0">--Select--</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </select> */}
            <Component />
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

            <Link type="button" href="/apply" className="btn-wide">
                Back to Top
            </Link>

            {/* {page === 0 && <Step1 register={register} errors={formatError} getValues={getValues} t={t} control={control} />}
            {page === 1 && <Step2 register={register} errors={formatError} getValues={getValues} t={t} control={control} />}
            {page === 2 && <Step3 register={register} errors={formatError} t={t} control={control} />}
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
    );
};

export default FinancialObligation;
