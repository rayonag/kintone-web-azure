import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { SubmitHandler, UseFormGetValues } from 'react-hook-form';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { useDashboardUser } from '@/common/context/dashboardUser';
import { ReferenceFormFields, ReferenceFormType } from '../schema';
import { DateTime } from 'luxon';

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
    getValues: UseFormGetValues<ReferenceFormType>;
    t: any;
    onSubmit: SubmitHandler<ReferenceFormType>;
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
                        {ReferenceFormFields[1].map((field) => {
                            if (field === 'relationship') {
                                return (
                                    <div className="py-2">
                                        {t('relationship.title')}:<span className="font-semibold">{' ' + formData[field]}</span>
                                        <hr />
                                    </div>
                                );
                            }
                            return (
                                <div className="py-2">
                                    {t(field)}:<span className="font-semibold">{' ' + formData[field]}</span>
                                    <hr />
                                </div>
                            );
                        })}
                        {ReferenceFormFields[2].map((field) => {
                            if (field === 'indicationDesire') {
                                return (
                                    <div className="py-2">
                                        {t('indicationDesire.title')}:<span className="font-semibold">{' ' + formData[field]}</span>
                                        <hr />
                                    </div>
                                );
                            }
                            return (
                                <div className="py-2">
                                    {t(field)}:<span className="font-semibold">{' ' + formData[field]}</span>
                                    <hr />
                                </div>
                            );
                        })}
                        {ReferenceFormFields[3].map((field) => {
                            return (
                                <div className="py-2">
                                    {t(field)}:<span className="font-semibold">{' ' + formData[field]}</span>
                                    <hr />
                                </div>
                            );
                        })}
                        <div className="py-2">{t('traitTitle')}</div>
                        <div className="flex flex-wrap text-sm md:text-md justify-between mt-2 text-black">
                            <div className="mr-2">5 = Strong</div> <div className="mr-2">4 = Above average</div>{' '}
                            <div className="mr-2">3 = Average</div>
                            <div className="mr-2">2 = Below average</div> <div>1 = Weak</div>
                            <div className="mr-2">X = Not observed</div>
                        </div>
                        <div className="flex flex-wrap text-sm md:text-md justify-between mt-2 text-black">
                            {ReferenceFormFields[4].map((field) => {
                                if (field === 'characters') {
                                    return <></>;
                                }
                                return (
                                    <div className="py-2">
                                        {t(field)}:<span className="font-semibold">{' ' + formData[field]}</span>
                                        <hr />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="py-2">{t('characterTitle')}</div>
                        <div className="flex flex-wrap text-sm md:text-md justify-between mt-2 text-black">
                            <div className="py-2">
                                {formData['characters']['character1']?.map((c, i) => (
                                    <span className="font-semibold">
                                        {c}
                                        {formData['characters']['character1']?.length != i + 1 && ','}{' '}
                                    </span>
                                ))}
                                {formData['characters']['character2']?.map((c, i) => (
                                    <span className="font-semibold">
                                        {c}
                                        {formData['characters']['character2']?.length != i + 1 && ','}{' '}
                                    </span>
                                ))}
                                {formData['characters']['character3']?.map((c, i) => (
                                    <span className="font-semibold">
                                        {c}
                                        {formData['characters']['character3']?.length != i + 1 && ','}{' '}
                                    </span>
                                ))}
                                {formData['characters']['character4']?.map((c, i) => (
                                    <span className="font-semibold">
                                        {c}
                                        {formData['characters']['character4']?.length != i + 1 && ','}{' '}
                                    </span>
                                ))}
                                <hr />
                            </div>
                        </div>
                        {ReferenceFormFields[5].map((field) => {
                            return (
                                <div className="py-2">
                                    {t(field)}:<span className="font-semibold">{' ' + formData[field]}</span>
                                    <hr />
                                </div>
                            );
                        })}
                        <div className="py-2">
                            {t('signatureDate')}:{' '}
                            <span className="font-semibold">
                                {DateTime.fromObject({
                                    day: parseInt(formData['signatureDate']?.day || '0'),
                                    month: parseInt(formData['signatureDate']?.month || '0'),
                                    year: parseInt(formData['signatureDate']?.year || '0')
                                }).toFormat('dd/LLL/yyyy')}
                            </span>
                            <hr />
                        </div>
                    </div>
                    {/* TODO: add auto-reply email */}
                    {/* <label className="flex justify-center my-4 text-black">
                        <div className="flex-col flex text-center justify-center mr-2">
                            <input className="w-6 h-6" type="checkbox" />
                        </div>
                        <div className="flex-col flex text-left justify-center">
                            <div>Check this box to send copy of </div>
                            <div>your response to: "{formData['email']}"</div>
                        </div>
                    </label> */}
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
