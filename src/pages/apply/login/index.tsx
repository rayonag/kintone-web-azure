'use client';
import { ChangeEvent, FormEvent, KeyboardEvent, use, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { setCookie } from 'nookies';
import { AnimatePresence, motion } from 'framer-motion';

import Layout from './Layout';
import StartButton from './StartButton';
import Layout_fadeIn from '@/styles/Layout_fadeIn_main';
import { set } from 'zod';
import logError from '@/common/logError';
import Layout_fadeIn_zealous from '@/styles/Layout_fadeIn_zealous';
import Link from 'next/link';

type Login = {
    userName: {
        value: string;
        isError?: boolean;
    };
    password: {
        value: string;
        isError?: boolean;
        errorMessage?: string;
    };
    ref: {
        value: string;
        isError?: boolean;
    };
};
export type Section = 'Top' | 'Email' | 'Password' | 'CreatePassword';
const Login: React.FC = () => {
    const [username, setUsername] = useState<Login['userName']>({ value: '' });
    const [password, setPassword] = useState<Login['password']>({ value: '' });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [section, setSection] = useState<Section>('Top');
    const [transitioning, setTransitioning] = useState(false);
    const router = useRouter();

    // useEffect(() => {
    //     // log screen width
    //     alert('screen width: ' + window.innerWidth);
    // }, []);

    const handleUsername = async () => {
        try {
            const res = await fetch('/api/login/loginUsername', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username.value }) // Replace with your data
            });

            if (res.ok) {
                const data = await res.json();
                if (data['hasPassword']) setSection('Password');
                else setSection('CreatePassword');
                return;
            } else {
                setUsername({ value: username.value, isError: true });
                return;
            }
        } catch (e) {
            logError(e, username.value, 'loginUsername');
        }
    };
    const validatePassword = (type?: 'password' | 'confirmPassword', value?: string) => {
        const vPassword = type == 'password' ? value : password.value;
        const vConfirmPassword = type == 'confirmPassword' ? value : confirmPassword;
        let errorMessage = '';

        if (!vPassword || vPassword.length == 0) {
            errorMessage = 'Password is empty';
        } else if (vPassword.length < 8) {
            errorMessage = 'Password must be at least 8 characters';
        } else if (vConfirmPassword !== vPassword) {
            errorMessage = 'Passwords do not match';
        }

        if (errorMessage) {
            setPassword({ ...password, isError: true, errorMessage });
        } else {
            setPassword({ ...password, isError: false, errorMessage: '' });
        }
    };

    useEffect(() => {
        if (!confirmPassword) return;
        if (section == 'CreatePassword') {
            validatePassword('password', password.value);
        }
    }, [confirmPassword]);
    const handleCreatePassword = async () => {
        if (!confirmPassword) {
            password.isError = true;
            password.errorMessage = 'Confirm your password';
            return;
        }
        validatePassword();
        if (password.isError) return;
        try {
            const res = await fetch('/api/createPasswordKintone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username.value, password: password.value }) // Replace with your data
            });
            if (res.ok) {
                const data = await res.json();
                setCookie(null, 'auth', username.value.toLowerCase(), {
                    maxAge: 7 * 24 * 60 * 60, // お好きな期限を
                    path: '/'
                });
                setCookie(null, 'ref', data.ref || 'null', {
                    maxAge: 7 * 24 * 60 * 60, // お好きな期限を
                    path: '/'
                });
                setCookie(null, 'isZealous', data.isZealous, {
                    maxAge: 7 * 24 * 60 * 60, // お好きな期限を
                    path: '/'
                });
                router.push('/apply');
            } else {
                alert('Something wrong. Please start from the top.');
                router.push('/apply');
                return;
            }
        } catch (e) {
            logError(e, password.value, 'handleCreatePassword');
        }
    };
    const loginPassword = async () => {
        try {
            const res = await fetch('/api/login/loginPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username.value, password: password.value })
            });

            if (res.ok) {
                const data = await res.json();
                setCookie(null, 'auth', username.value, {
                    maxAge: 7 * 24 * 60 * 60, // お好きな期限を
                    path: '/'
                });
                setCookie(null, 'ref', data.ref, {
                    maxAge: 7 * 24 * 60 * 60, // お好きな期限を
                    path: '/'
                });
                setCookie(null, 'isZealous', data.isZealous, {
                    maxAge: 7 * 24 * 60 * 60, // お好きな期限を
                    path: '/'
                });
                router.push('/apply');
            } else {
                setPassword({ value: password.value, isError: true });
                return;
            }
        } catch (e) {
            logError(e, password.value, 'loginPassword');
        }
    };
    const allowEnterKeydown = (e: KeyboardEvent, func: () => void) => {
        if (e.key === 'Enter') func();
    };

    return (
        <div className="flex flex-col items-center justify-center ">
            <Layout_fadeIn key="top">
                <div className="flex flex-col h-[95vh] justify-center ">
                    <div className="text-center text-3xl italic font-serif mb-10">Please select:</div>
                    <div className="flex">
                        <Link href="/apply/login/main" className="flex flex-col justify-center m-4 cursor-pointer">
                            <div
                                className="h-40 w-40 rounded-full hover:scale-110 transition-transform duration-500 ease-in-out"
                                style={{
                                    backgroundImage: "url('/images/bridges-logo-round.png')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            ></div>
                            <div className="font-xl text-white text-center m-4 font-bold">・Long Term</div>{' '}
                            <div className="font-xl text-white text-center m-4 font-bold">・Short Term</div>
                        </Link>
                        <Link href="/apply/login/zealous" className="flex flex-col justify-center m-4">
                            <div
                                className="h-40 w-40 rounded-full hover:scale-110 transition-transform duration-500 ease-in-out"
                                style={{
                                    backgroundImage: "url('/images/zealous/zealous-logo-round.png')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            ></div>
                            <div className="font-xl text-white text-center m-4 font-bold">・ZProject</div>
                            <div className="font-xl text-white text-center m-4 font-bold h-4"></div>
                        </Link>
                    </div>
                </div>
            </Layout_fadeIn>
        </div>
    );
};
export default Login;
