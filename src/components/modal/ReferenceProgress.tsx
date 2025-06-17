import { ApplicationSteps, handleCheckListClick } from '@/pages/apply';
import React, { useState, ChangeEvent, FC, ReactElement } from 'react';
import Modal from 'react-modal';
import Link from 'next/link';
import useUserStore from '@/features/common/store';

interface ReferenceProgressProps {
    referenceCount: number;
    referenceRequired: number;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
const ReferenceProgress: React.FC<ReferenceProgressProps> = ({ referenceCount, referenceRequired, isModalOpen, setIsModalOpen, buttonProps }) => {
    const modalStyle = {
        content: {
            top: '50%',
            right: 'auto',
            bottom: 'auto',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            maxWidth: '25rem',
            maxHeight: '80svh',
            overflow: 'auto',
            width: '80%',
            color: 'black'
        }
    };

    const Message = () => (
        <div>
            <div>
                {referenceCount} out of {referenceRequired} references have been received.
            </div>
            <br />
        </div>
    );

    return (
        <>
            <button {...buttonProps} onClick={() => setIsModalOpen(true)}>
                Reference Form {referenceCount}/{referenceRequired}
            </button>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={modalStyle}>
                <h1
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '1rem'
                    }}
                >
                    Reference Form Progress
                </h1>
                <div>
                    <label htmlFor="name">
                        <span className="text-xl"></span> <Message />
                    </label>
                </div>
                <div className="flex justify-center">
                    <button className="btn" onClick={() => setIsModalOpen(false)}>
                        Close
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default ReferenceProgress;
