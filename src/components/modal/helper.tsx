import { ApplicationSteps, handleCheckListClick } from '@/pages/apply';
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
            height: '80svh',
            overflow: 'scroll',
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
                {type === 'Zealous' ? (
                    <>
                        <div>Congratulations! You have completed all the parts of your Zealous Israel Project application!</div>
                        <br />
                        <div className="italic">Things to do Next:</div>
                        <div>
                            Please keep an eye on your emails for updates or news from your national office. They may reach out to clarify details
                            about your application parts. Also make sure you have let your references know to watch their emails for the reference
                            forms from us. Your application won't be reviewed in Jerusalem until all your references have responded.{' '}
                        </div>
                        <br />
                        <div className="text-sm">
                            Note: All of the Zealous Israel Project applications will be reviewed after the deadline of March 31, 2025. Notfitications
                            about whether or not you are accepted will be sent in May 2025. If you are accepted you will then begin the Visa Process
                            and work closely with your national office. Until then, please keep an eye on your emails, pray for Israel and seek God's
                            heart.
                        </div>
                    </>
                ) : (
                    <>
                        <div>You have completed all the steps. We will review your application and get back to you soon.</div>
                        <br />
                        <div className="text-sm">
                            Note: The application process usually takes between two to three months, from the time the application documents are
                            submitted to receiving a definitive answer from the Jerusalem office. Several factors affect the processing time,
                            including length of service time requested, availability of positions and when references are received.
                        </div>
                    </>
                )}
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
