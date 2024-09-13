'use client';
import { ChangeEvent, FormEvent, KeyboardEvent, use, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { setCookie } from 'nookies';
import { AnimatePresence, motion } from 'framer-motion';

import Layout from './Layout';
import StartButton from './StartButton';
import Layout_fadeIn from '@/styles/Layout_fadeIn';
import { set } from 'zod';
import logError from '@/common/logError';

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
    const [kintoneUser, setKintoneUser] = useState<Login>();
    const [section, setSection] = useState<Section>('Top');
    const [transitioning, setTransitioning] = useState(false);
    const router = useRouter();

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
        <div className="flex flex-col items-center justify-center">
            <AnimatePresence>
                {section == 'Top' && (
                    <Layout_fadeIn key="top">
                        <div className="flex flex-col h-[95vh] justify-center">
                            <div className="text-center text-3xl italic font-serif">Bridges for Peace Volunteer Application Portal</div>
                            <StartButton setSection={setSection} transitioning={transitioning} setTransitioning={setTransitioning} />
                            <button className="btn" onClick={() => router.push('/contact')}>
                                Need help? Contact us
                            </button>
                        </div>
                    </Layout_fadeIn>
                )}
                {section == 'Email' && (
                    <Layout_fadeIn key="email">
                        <div className="flex flex-col h-[95vh] justify-center items-center">
                            <div className="text-center w-72">Enter your email</div>
                            <input
                                value={username.value}
                                onChange={(e) => setUsername({ value: e.target.value })}
                                onKeyDown={(e) => allowEnterKeydown(e, handleUsername)}
                                placeholder="Email"
                                className="mt-5 p-2 border rounded bg-gray-600 w-72 max-w-full"
                                autoFocus
                            />
                            {username.isError && <div className="text-red-600">Invalid Email Address</div>}
                            <div className="text-center">
                                <button className="btn" onClick={handleUsername}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </Layout_fadeIn>
                )}
                {section == 'Password' && (
                    <Layout_fadeIn key="password">
                        <div className="flex flex-col h-[95vh] justify-center items-center">
                            <div className="m-4 w-52">Email: {username?.value}</div>
                            <div className="text-center">Enter your password</div>
                            <input
                                type="password"
                                value={password.value}
                                onChange={(e) => setPassword({ value: e.target.value })}
                                onKeyDown={(e) => allowEnterKeydown(e, loginPassword)}
                                placeholder="Password"
                                className="mt-5 p-2 border rounded bg-gray-600 w-72 max-w-full"
                                autoFocus
                            />
                            {password.isError && <div className="text-red-600">Invalid Password</div>}
                            <div className="text-center">
                                <button className="btn" onClick={loginPassword}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </Layout_fadeIn>
                )}
                {section == 'CreatePassword' && (
                    <Layout_fadeIn key="createPassword">
                        <div className="flex flex-col h-[95vh] justify-center items-center">
                            <div className="m-4 w-52">Email: {username?.value}</div>
                            <div className="text-center">Enter your password</div>
                            <input
                                type="password"
                                value={password.value}
                                onChange={(e) => setPassword({ ...password, value: e.target.value })}
                                placeholder="Password"
                                className="my-5 p-2 border rounded bg-gray-600 w-72 max-w-full"
                                autoFocus
                            />
                            <div className="text-center">Confirm your password</div>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                                onKeyDown={(e) => allowEnterKeydown(e, handleCreatePassword)}
                                placeholder="Re-enter Password"
                                className="mt-5 p-2 border rounded bg-gray-600 w-72 max-w-full"
                            />
                            {password.isError && <div className="text-red-600">{password.errorMessage}</div>}
                            <div className="text-center">
                                <button className="btn" onClick={handleCreatePassword}>
                                    Create Password
                                </button>
                            </div>
                        </div>
                    </Layout_fadeIn>
                )}
            </AnimatePresence>
        </div>
    );
};
export default Login;
