'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

import { HealthQuestionnaireDefaultValues, HealthQuestionnaireSchema, HealthQuestionnaireType, formFields } from './schema/healthQuestionnaireSchema';
import { useDashboardUser } from '@/common/context/dashboardUser';
import { useTranslation } from 'react-i18next';
import { useReducer } from 'react';
import { langReducer } from './hooks/lang';
import { customErrorMap } from './schema/healthQuestionnaireSchema';

import FirstPage from './views/FirstPage';
import SecondPage from './views/SecondPage';
import ThirdPage from './views/ThirdPage';
import ConfirmationModal from './views/Confirmation';

import './translations/config'; //i18
import useUserStore from '@/features/common/portal/store';
import { useShallow } from 'zustand/react/shallow';
import healthQuestionnaire_en from './translations/en.json';

const HealthQuestionnaire = (props: { repo: any }) => {
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
    console.log('username', username);
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
        register
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
            console.log('data', data);
            Object.keys(data).forEach((key: any) => {
                if (formFields.includes(key)) {
                    if (data[key].type === 'DROP_DOWN') setValue(key, [data[key].value]);
                    //if (data[key].type === 'RADIO_BUTTON') setValue(key, [data[key].value]);
                    else setValue(key, data[key].value);
                }
            });
        }
    }, [props]);
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
