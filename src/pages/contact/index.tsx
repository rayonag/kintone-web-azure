'use client';
import { useDashboardUser } from '@/common/context/dashboardUser';
import RateUs from '@/components/modal/RateUs';
import Layout from '@/styles/Layout_fadeIn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import Modal from 'react-modal';

type InputProps = { val: string; label: string; register: Dispatch<SetStateAction<string>> };
const Input: FC<InputProps> = ({ val, label, register }) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <label className="flex flex-col my-2 w-80 me-5 md:max-w-sm">
            <div className={`font-semibold text-2xl mb-1 transition duration-500 ${isFocused || val.length || 'text-gray-400 translate-y-10'}`}>
                {label}
            </div>
            <input
                type="text"
                value={val}
                onChange={(e) => register(e.currentTarget.value)}
                className={'text-white border-b-2 py-2 px-3 bg-transparent focus:outline focus:outline-sky-500 focus:ring-4 focus:ring-sky-500/30'}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </label>
    );
};
type TextAreaProps = { val: string; label: string; register: Dispatch<SetStateAction<string>> };
const TextArea: FC<TextAreaProps> = ({ val, label, register }) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <label className="flex flex-col my-2 w-80 me-5 md:max-w-sm">
            <div className={`font-semibold text-2xl mb-1 transition duration-500 ${isFocused || val.length || 'text-gray-400 translate-y-10'}`}>
                {label}
            </div>
            <textarea
                rows={5}
                value={val}
                onChange={(e) => register(e.currentTarget.value)}
                className={'text-white border-b-2 py-2 px-3 bg-transparent focus:outline focus:outline-sky-500 focus:ring-4 focus:ring-sky-500/30'}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </label>
    );
};

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { office } = useDashboardUser();
    const router = useRouter();
    const handleSubmit = () => {
        if (!name) {
            setIsModalOpen(true);
            return;
        }
        fetch('/api/sendgrid/contactUs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone, message, office })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                router.push('/contact/success');
            });
    };
    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-screen py-10">
                <span className="text-3xl font-bold">Contact Us</span>
                <span className="text-xl mt-16 m-5">We will endeaver to get back to you within 3 business days</span>
                <Input val={name} label="Name" register={setName} />
                <Input val={email} label="Email" register={setEmail} />
                {/* <Input val={phone} label="Phone" register={setPhone} /> */}
                <TextArea val={message} label="Message" register={setMessage} />
                <button className="btn" onClick={handleSubmit}>
                    Submit
                </button>
                <Link className="underline" href="/apply">
                    Go to Top
                </Link>
            </div>
            <ErrorMessageModal modalIsOpen={isModalOpen} setModalIsOpen={setIsModalOpen} message="Please fill out all fields" />
        </Layout>
    );
};

export default Contact;

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
        <button
            className="btn hover:opacity-70"
            style={buttonStyle}
            onClick={onclick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {label}
        </button>
    );
};

type ErrorMessageModalProps = {
    modalIsOpen: boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
};
const ErrorMessageModal: FC<ErrorMessageModalProps> = ({ modalIsOpen, setModalIsOpen, message }) => {
    const [isButtonHover, setIsButtonHover] = useState(false);
    const modalStyle = {
        content: {
            top: '50%',
            right: 'auto',
            bottom: 'auto',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            maxWidth: '30rem'
        }
    };

    return (
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={modalStyle} shouldCloseOnOverlayClick={false}>
            <h1
                style={{
                    color: '#333',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem'
                }}
            >
                {message}
            </h1>
            <Button label="OK" isHover={isButtonHover} setIsHover={setIsButtonHover} onclick={() => setModalIsOpen(false)} />
        </Modal>
    );
};
