import kintone from '@/pages/api/kintone';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, UseFormGetValues } from 'react-hook-form';
import Modal from 'react-modal';
import { HealthQuestionnaireType, formFields } from '../schema/healthQuestionnaireSchema';
import { TFunction } from 'i18next';
import postPersonalHealthQuestionnaire from '../hooks/postPersonalHealthQuestionnaire';
import { Router, useRouter } from 'next/router';
import { useDashboardUser } from '@/common/context/dashboardUser';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { set } from 'zod';
import Link from 'next/link';

type ButtonProps = {
    label: string;
    isHover: boolean;
    setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
    onclick: (props: any) => any;
};
const Button: FC<ButtonProps> = ({ label, isHover, setIsHover, onclick }) => {
    const buttonStyle = {
        color: 'white',
        padding: '.5rem 1rem',
        border: 'none',
        borderRadius: '2rem',
        cursor: 'pointer',
        fontSize: '1rem'
    };
    return (
        <button className="btn" style={buttonStyle} onClick={onclick} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {label}
        </button>
    );
};

type ConfirmationModalProps = {
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
    getValues: UseFormGetValues<HealthQuestionnaireType>;
    t: TFunction<'translation'>;
};
const ConfirmationModal: FC<ConfirmationModalProps> = ({ modalIsOpen, setModalIsOpen, getValues, t }) => {
    const [isHoverSubmit, setIsHoverSubmit] = useState(false);
    const [isHoverCancel, setIsHoverCancel] = useState(false);
    const dashboardUser = useDashboardUser();
    const router = useRouter();
    const formData = getValues();
    const modalStyle = {
        content: {
            top: '50%',
            right: 'auto',
            bottom: 'auto',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '80%',
            maxWidth: '30rem',
            maxHeight: '80vh'
        }
    };
    const onSubmit: SubmitHandler<HealthQuestionnaireType> = async () => {
        setIsLoading(true);
        const data = getValues();
        // TODO: when undefined
        const res = await postPersonalHealthQuestionnaire(data, dashboardUser.ref || '0');
        if (res) setIsComplete(true);
        //setIsLoading(false);
        // router.push('/apply/health-questionnaire/complete');
    };
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    return (
        <div className="relative">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={modalStyle}
                shouldCloseOnOverlayClick={false}
                ariaHideApp={false}
            >
                {/* TODO: add spinner on loading */}
                {/* {isLoading && <LoadingSpinner />} */}
                {isComplete ? (
                    <div className="flex flex-col justify-center">
                        <div className="text-2xl m-5 mb-10 text-black font-bold">Response saved and submitted!</div>
                        <Link href="/apply" className="btn">
                            Go to Top
                        </Link>
                    </div>
                ) : (
                    <>
                        <h1
                            style={{
                                color: '#333',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem'
                            }}
                        >
                            Confirm your response
                        </h1>
                        <div className="text-black">
                            {formFields[0].map((field) => {
                                return (
                                    <div className="py-1">
                                        {t(field)}:{' ' + formData[field]}
                                        <hr />
                                    </div>
                                );
                            })}
                            <label>Have History of: </label>
                            {formFields[1].map((field) => {
                                return <>{formData[field][0] == 'Yes' && <label className="text-black py-1">{t(field)}, </label>}</>;
                            })}
                            <hr />
                            {/* pop() the last question */}
                            {formFields[2].slice(0, -1).map((field) => {
                                return (
                                    <div className="text-black py-1">
                                        {t(field)}
                                        <div>{' ' + formData[field]}</div>
                                        <hr />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex flex-col justify-center">
                            <Button label="Submit" isHover={isHoverSubmit} setIsHover={setIsHoverSubmit} onclick={onSubmit} />
                            <Button label="Back" isHover={isHoverCancel} setIsHover={setIsHoverCancel} onclick={() => setModalIsOpen(false)} />
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default ConfirmationModal;
