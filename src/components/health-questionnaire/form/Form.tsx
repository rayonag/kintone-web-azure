'use client';
import { HealthQuestionnaireDefaultValues, HealthQuestionnaireSchema, HealthQuestionnaireType, formFields } from './schema/healthQuestionnaireSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, useFieldArray, useWatch, SubmitErrorHandler } from 'react-hook-form';
import { useState } from 'react';

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

const HealthQuestionnaire = () => {
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
    console.log('getval', getValues());
    // console.log('error', formatError);
    return (
        <form className="flex flex-col p-[10%] text-center">
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
                    className="self-center w-80 bg-[#012c66] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6 md:max-w-xs"
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
                    className="self-center w-80 bg-[#012c66] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6 md:max-w-xs"
                >
                    {t('system.submit')}
                </button>
            )}
            {page != 0 && (
                <button
                    type="button"
                    onClick={() => setPage(page - 1)}
                    className="self-center w-80 bg-[#012c66] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6 md:max-w-xs"
                >
                    {t('system.back')}
                </button>
            )}
        </form>
    );
};

export default HealthQuestionnaire;
