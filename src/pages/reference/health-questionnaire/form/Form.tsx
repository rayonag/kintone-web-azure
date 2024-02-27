'use client';
import { FC, useCallback } from 'react';
import { HealthQuestionnaireSchema, HealthQuestionnaireType } from './schema/healthQuestionnaireSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, useFieldArray, useWatch, SubmitErrorHandler } from 'react-hook-form';
import { useState } from 'react';

import FirstPage from './views/firstPage';
import SecondPage from './views/secondPage';

import { useTranslation } from 'react-i18next';

import { useReducer } from 'react';
import { langReducer } from './hooks/lang';

import { customErrorMap } from './schema/healthQuestionnaireSchema';
import { z } from 'zod';
import postToKintone from './hooks/postToKintone';

import './translations/config'; //i18

const HealthQuestionnaire = () => {
    // getData("https://bfp.kintone.com/k/v1/record.json?app=217&id=1").then((data) => {
    //     console.log(data); // `data.json()` の呼び出しで解釈された JSON データ
    // });

    const [page, setPage] = useState(0);
    const { t } = useTranslation();
    const initialLang = 'en';
    const [locale, dispatch] = useReducer<(state: string, actions: string) => string>(langReducer, initialLang);
    z.setErrorMap(customErrorMap(t));

    const onSubmit: SubmitHandler<HealthQuestionnaireType> = (data) => {
        console.log('onsubmit');
        console.log(data);
        postToKintone(data);
    };
    const onInvalid: SubmitErrorHandler<HealthQuestionnaireType> = (data) => {
        console.log('oninvalid');
        console.log(data);
    };

    const {
        handleSubmit,
        formState: { errors: formatError, isValid },
        trigger,
        getValues,
        register
    } = useForm<HealthQuestionnaireType>({
        mode: 'onChange',
        resolver: zodResolver(HealthQuestionnaireSchema)
    });

    console.log('errors: ' + Object.keys(formatError));
    console.log('isvalidAll: ' + isValid);
    console.log(getValues());
    const fields = ['name', 'age', 'height', 'ftcm', 'weight', 'lbskg'] as const;
    const validate = async () => {
        const isValids = await trigger(fields);
        console.log('isValid FirstPage: ' + isValids);
        if (isValids) return true;
        else return false;
    };
    return (
        <form
            onSubmit={(e) => {
                handleSubmit(onSubmit, onInvalid)(e);
            }}
            className="flex flex-col p-[10%]"
        >
            <button onClick={() => dispatch('lang_he')}>Hebrew</button>
            {page === 0 && <FirstPage setPage={setPage} errors={formatError} register={register} trigger={trigger} t={t} />}
            {page === 1 && <SecondPage setPage={setPage} errors={formatError} register={register} trigger={trigger} t={t} />}

            {/* {page === 1 && <SecondPage />} */}
            {page == 0 && (
                <button
                    type="button"
                    onClick={async () => {
                        const valid = await validate();
                        if (valid) setPage(1);
                    }}
                    className="bg-[#012c66] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6 md:max-w-xs"
                >
                    {t('next')}
                </button>
            )}
            <button
                type="submit"
                // onClick={handleSubmit(onSubmit, onInvalid)}
                // disabled={!isValid || isSubmitting}
                className="bg-slate-800 hover:bg-slate-600 rounded px-4 py-2 text-white  disabled:bg-gray-300 md:self-center"
            >
                Click to submit
            </button>
        </form>
    );
};

export default HealthQuestionnaire;
