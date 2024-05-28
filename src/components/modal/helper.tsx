import { ApplicationSteps, handleCheckListClick } from '@/pages/apply';
import { color } from 'framer-motion';
import React, { useState, ChangeEvent, FC, ReactElement } from 'react';
import Modal from 'react-modal';
import Link from 'next/link';

interface HelperProps {
    currentStep: ApplicationSteps;
    userRef: string;
}
const Helper: React.FC<HelperProps> = ({ currentStep, userRef }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

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

    const helperSteps: { [key in ApplicationSteps]: ReactElement } = {
        reviewWebsite: (
            <div>
                For those visiting our website for the first time, a great starting point would be to review the{' '}
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
        step3: <>'Step 3: Do this and that'</>
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
