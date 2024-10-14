import { ApplicationSteps, handleCheckListClick } from '@/pages/apply';
import { color } from 'framer-motion';
import React, { useState, ChangeEvent, FC, ReactElement } from 'react';
import Modal from 'react-modal';
import Link from 'next/link';
import useUserStore from '@/features/common/store';

interface HelperProps {
    currentStep: ApplicationSteps;
    userRef: string;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Helper: React.FC<HelperProps> = ({ currentStep, userRef, isModalOpen, setIsModalOpen }) => {
    const modalStyle = {
        content: {
            top: '50%',
            right: 'auto',
            bottom: 'auto',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            maxWidth: '25rem',
            width: '80%',
            color: 'black'
        }
    };

    const type = useUserStore((state) => state.applicationType);

    const helperSteps: { [key in ApplicationSteps]: ReactElement } = {
        reviewWebsite: (
            <div>
                For those visiting our website for the first time, a great starting point would be to review the{' '}
                {type === 'Zealous' ? (
                    <>
                        <Link
                            className="text-blue-500 underline"
                            href="https://zealous82.bridgesforpeace.com/about/"
                            onClick={async () => await handleCheckListClick('reviewAbout', userRef)}
                            target="_blank"
                        >
                            About Zealous Project
                        </Link>{' '}
                        and{' '}
                        <Link
                            className="text-blue-500 underline"
                            href="https://zealous82.bridgesforpeace.com/zproject-faq/"
                            onClick={async () => await handleCheckListClick('reviewFaq', userRef)}
                            target="_blank"
                        >
                            ZProject FAQ
                        </Link>{' '}
                    </>
                ) : (
                    <>
                        <Link
                            className="text-blue-500 underline"
                            href="https://www.bridgesforpeace.com/meet-us/our-vision/"
                            onClick={async () => await handleCheckListClick('reviewAbout', userRef)}
                            target="_blank"
                        >
                            About Us
                        </Link>{' '}
                        and{' '}
                        <Link
                            className="text-blue-500 underline"
                            href="https://www.bridgesforpeace.com/get-involved/volunteer/faqs/"
                            onClick={async () => await handleCheckListClick('reviewFaq', userRef)}
                            target="_blank"
                        >
                            Frequently Asked Questions
                        </Link>{' '}
                    </>
                )}
                sections to gain insight into our organization and requirements for volunteers.
            </div>
        ),
        submitApplication: (
            <>
                Next, complete your{' '}
                <Link className="text-blue-500 underline" href="/apply/form">
                    Online Application Form
                </Link>{' '}
                and{' '}
                <Link className="text-blue-500 underline" href="/apply/health-questionnaire">
                    Personal Health Questionnaire
                </Link>
                <br />
                If you have any questions, don't hesitate to reach out to us from{' '}
                <Link className="text-blue-500 underline" href="/contact">
                    Contact Us
                </Link>
            </>
        ),
        submitDocuments: (
            <div>
                Last thing to do is to{' '}
                <Link className="text-blue-500 underline" href="/apply/documents">
                    Submit Necessary Documents.
                </Link>
                <br />
                If you have any questions, don't hesitate to reach out to us from{' '}
                <Link className="text-blue-500 underline" href="/contact">
                    Contact Us
                </Link>
            </div>
        ),
        complete: (
            <div>
                <div>You have completed all the steps. We will review your application and get back to you soon.</div>
                <br />
                <div className="text-sm">
                    Note:{' '}
                    {type == 'Zealous'
                        ? `The application deadline is March 31, 2025. After this date the applications will be reviewed and notification about whether or
                    not you are accepted will be sent in May.`
                        : `The application process usually takes between two to three months, from the time the application documents are submitted
                            to receiving a definitive answer from the Jerusalem office. Several factors affect the processing time, including length of service time requested, availability of positions and when
                            references are received.`}
                </div>
            </div>
        )
    };

    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>What should I do next?</button>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={modalStyle}>
                <h1
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '1rem'
                    }}
                >
                    Things to do Next:
                </h1>
                <div>
                    <label htmlFor="name">
                        <span className="text-xl"></span> {helperSteps[currentStep]}
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

export default Helper;
