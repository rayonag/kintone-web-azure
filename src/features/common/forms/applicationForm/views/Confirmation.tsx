import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { SubmitHandler, UseFormGetValues } from 'react-hook-form';
import Modal from 'react-modal';
import { TFunction } from 'i18next';
import postPersonalHealthQuestionnaire from '../hooks/postApplicationForm';
import { useRouter } from 'next/router';
import { useDashboardUser } from '@/common/context/dashboardUser';
import Link from 'next/link';
import { useLoading } from '@/common/context/loading';
import { ApplicationFormFields, ApplicationFormType } from '../schema';

type ButtonProps = {
    label: string;
    isHover: boolean;
    setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
    onclick: (props: any) => any;
};
const Button: FC<ButtonProps> = ({ label, setIsHover, onclick }) => {
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
    getValues: UseFormGetValues<ApplicationFormType>;
    t: any;
};
const ConfirmationModal: FC<ConfirmationModalProps> = ({ modalIsOpen, setModalIsOpen, getValues, t }) => {
    const [isHoverSubmit, setIsHoverSubmit] = useState(false);
    const [isHoverCancel, setIsHoverCancel] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const { setIsLoading } = useLoading();
    const dashboardUser = useDashboardUser();
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
    const onSubmit: SubmitHandler<ApplicationFormType> = async () => {
        setIsLoading(true);
        const data = getValues();
        // TODO: when undefined
        const res = await postPersonalHealthQuestionnaire(data, dashboardUser.ref || '0');
        //if (res) setIsComplete(true);
        //setIsLoading(false);
        // router.push('/apply/health-questionnaire/complete');
    };
    return (
        <div className="relative">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={modalStyle}
                shouldCloseOnOverlayClick={false}
                ariaHideApp={false}
            >
                {/* {isComplete ? (
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
                            {ApplicationFormFields[0].map((field) => {
                                return (
                                    <div className="py-1">
                                        {t(field)}:{' ' + formData[field]}
                                        <hr />
                                    </div>
                                );
                            })}
                            <label>Have History of: </label>
                            {ApplicationFormFields[1].map((field) => {
                                return <>{formData[field][0] == 'Yes' && <label className="text-black py-1">{t(field)}, </label>}</>;
                            })}
                            <hr />
                            {ApplicationFormFields[2].slice(0, -1).map((field) => {
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
                */}
            </Modal>
        </div>
    );
};

export default ConfirmationModal;
