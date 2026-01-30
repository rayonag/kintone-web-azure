import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { SubmitHandler, UseFormGetValues } from 'react-hook-form';
import Modal from 'react-modal';
import { HealthQuestionnaireType, formFields } from '../schema';
import { useRouter } from 'next/router';
import { useDashboardUser } from '@/common/context/dashboardUser';

type ButtonProps = {
    label: string;
    isHover: boolean;
    setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
    onclick: (props: any) => any;
    disabled?: boolean;
};
const Button: FC<ButtonProps> = ({ label, setIsHover, onclick, disabled = false }) => {
    const buttonStyle = {
        color: 'white',
        padding: '.5rem 1rem',
        border: 'none',
        borderRadius: '2rem',
        cursor: 'pointer',
        fontSize: '1rem'
    };
    return (
        <button
            className="btn"
            style={{
                ...buttonStyle,
                opacity: disabled ? 0.7 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer'
            }}
            onClick={onclick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

type ConfirmationModalProps = {
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
    getValues: UseFormGetValues<HealthQuestionnaireType>;
    t: any;
    onSubmit: SubmitHandler<HealthQuestionnaireType>;
    isSubmitting?: boolean;
};
const ConfirmationModal: FC<ConfirmationModalProps> = ({ modalIsOpen, setModalIsOpen, getValues, t, onSubmit, isSubmitting = false }) => {
    const [isHoverSubmit, setIsHoverSubmit] = useState(false);
    const [isHoverCancel, setIsHoverCancel] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const dashboardUser = useDashboardUser();
    const formData = getValues();
    const router = useRouter();
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

    return (
        <div className="relative">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={modalStyle}
                shouldCloseOnOverlayClick={false}
                ariaHideApp={false}
            >
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
                            if (field === 'heightUnit' || field === 'weightUnit') return <div>{formData[field]}</div>;
                            return (
                                <div className="py-1">
                                    {t(field)}:{<span className="font-semibold"> {formData[field]}</span>}
                                    <hr />
                                </div>
                            );
                        })}
                        <label>Have History of: </label>
                        {formFields[1].map((field) => {
                            return <>{formData[field][0] == 'Yes' && <label className="text-black py-1 font-semibold">{t(field)}, </label>}</>;
                        })}
                        <hr />
                        {/* pop() the last question */}
                        {formFields[2].slice(0, -1).map((field) => {
                            return (
                                <div className="text-black py-1">
                                    {t(field)}
                                    <div>
                                        <span className="font-semibold">{' ' + formData[field]}</span>
                                    </div>
                                    <hr />
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex flex-col justify-center">
                        <Button
                            label={isSubmitting ? 'Submitting...' : 'Submit'}
                            isHover={isHoverSubmit}
                            setIsHover={setIsHoverSubmit}
                            onclick={onSubmit}
                            disabled={isSubmitting}
                        />
                        <Button
                            label="Back"
                            isHover={isHoverCancel}
                            setIsHover={setIsHoverCancel}
                            onclick={() => setModalIsOpen(false)}
                            disabled={isSubmitting}
                        />
                    </div>
                </>
            </Modal>
        </div>
    );
};

export default ConfirmationModal;
