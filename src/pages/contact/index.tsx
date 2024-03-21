'use client';
import Layout from '@/styles/Layout';
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
    const [comment, setComment] = useState('');
    const handleSubmit = () => {};
    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-screen">
                <span className="text-3xl font-bold">Contact Us</span>
                <span className="text-xl font-semibold">Hours</span>
                <span>Monday-Thursday: 9:00am-5:00pm</span>
                <span>Friday: 9:00am-1:00pm</span>
                <Input val={name} label="Name" register={setName} />
                <Input val={email} label="Email" register={setEmail} />
                <Input val={phone} label="Phone" register={setPhone} />
                <label className="flex flex-col my-2 w-80 me-5 md:max-w-sm">
                    <div className="font-semibold mb-1">Comment</div>
                    <textarea
                        rows={5}
                        value={comment}
                        onChange={(e) => setComment(e.currentTarget.value)}
                        className={'text-gray-800 rounded-md border py-2 px-3 focus:outline focus:outline-sky-500 focus:ring-4 focus:ring-sky-500/30'}
                        placeholder="Comment"
                    />
                </label>
                <button className="btn" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </Layout>
    );
};

export default Contact;
