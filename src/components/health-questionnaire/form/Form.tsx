'use client';
import { HealthQuestionnaireDefaultValues, HealthQuestionnaireSchema, HealthQuestionnaireType, formFields } from './schema/healthQuestionnaireSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, useFieldArray, useWatch, SubmitErrorHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';

import FirstPage from './views/FirstPage';
import SecondPage from './views/SecondPage';

import { useTranslation } from 'react-i18next';

import { useReducer } from 'react';
import { langReducer } from './hooks/lang';

import { customErrorMap } from './schema/healthQuestionnaireSchema';
import { z } from 'zod';
import postToKintone from './hooks/postPersonalHealthQuestionnaire';

import './translations/config'; //i18
import ThirdPage from './views/ThirdPage';
import ConfirmationModal from './views/Confirmation';
import { useDashboardUser } from '@/common/context/dashboardUser';
import Link from 'next/link';

const HealthQuestionnaire = () => {
    const dashboardUser = useDashboardUser();
    const [page, setPage] = useState(0);
    const { t } = useTranslation();
    const initialLang = 'en';
    const [locale, dispatch] = useReducer<(state: string, actions: string) => string>(langReducer, initialLang);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    z.setErrorMap(customErrorMap(t));

    const onInvalid: SubmitErrorHandler<HealthQuestionnaireType> = (data) => {};

    const {
        handleSubmit,
        formState: { errors: formatError },
        trigger,
        getValues,
        setValue,
        register
    } = useForm<HealthQuestionnaireType>({
        mode: 'onChange',
        defaultValues: HealthQuestionnaireDefaultValues,
        resolver: zodResolver(HealthQuestionnaireSchema)
    });
    const validate = async (page: number) => {
        const isValid = await trigger(formFields[page]);
        if (isValid) return true;
        else return false;
    };
    useEffect(() => {
        console.log('dashboardUser', dashboardUser);
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
    return (
        <form className="flex flex-col py-[6%] text-center">
            {page === 0 && <FirstPage register={register} errors={formatError} getValues={getValues} t={t} />}
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
            )}
        </form>
    );
};

export default HealthQuestionnaire;
