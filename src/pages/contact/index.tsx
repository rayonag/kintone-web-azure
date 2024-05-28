'use client';
import Layout from '@/styles/Layout_fadeIn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { FieldError } from 'react-hook-form';

type InputProps = { val: string; label: string; register: Dispatch<SetStateAction<string>>; placeholder?: string };
const Input: FC<InputProps> = ({ val, label, register, placeholder }) => {
    return (
        <label className="flex flex-col my-2 w-80 me-5 md:max-w-sm">
            <div className="font-semibold mb-1">{label}</div>
            <input
                type="text"
                value={val}
                onChange={(e) => register(e.currentTarget.value)}
                className={'text-gray-800 rounded-md border py-2 px-3 focus:outline focus:outline-sky-500 focus:ring-4 focus:ring-sky-500/30'}
                placeholder={placeholder || label}
            />
        </label>
    );
};

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const handleSubmit = () => {
        fetch('/api/sendgrid/contactUs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone, message })
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
                <span className="text-xl font-semibold">Hours</span>
                <span>Monday-Thursday: 9:00am-5:00pm</span>
                <span>Friday: 9:00am-1:00pm</span>
                <Input val={name} label="Name" register={setName} />
                <Input val={email} label="Email" register={setEmail} />
                <Input val={phone} label="Phone" register={setPhone} />
                <label className="flex flex-col my-2 w-80 me-5 md:max-w-sm">
                    <div className="font-semibold mb-1">Message</div>
                    <textarea
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.currentTarget.value)}
                        className={'text-gray-800 rounded-md border py-2 px-3 focus:outline focus:outline-sky-500 focus:ring-4 focus:ring-sky-500/30'}
                        placeholder="Message"
                    />
                </label>
                <button className="btn" onClick={handleSubmit}>
                    Submit
                </button>
                <Link className="underline" href="/apply">
                    Go to Top
                </Link>
            </div>
        </Layout>
    );
};

export default Contact;
