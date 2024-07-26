'use client';
import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { setCookie } from 'nookies';
import { AnimatePresence, motion } from 'framer-motion';

import Layout from './Layout';
import StartButton from './StartButton';
import Layout_fadeIn from '@/styles/Layout_fadeIn';

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
    const router = useRouter();

    const handleNext = async () => {
        try {
            const res = await fetch('/api/loginWithKintone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username.value }) // Replace with your data
            });

            if (res.ok) {
                const kintoneUser = await res.json();
                setKintoneUser({
                    userName: {
                        value: kintoneUser['username'].value
                    },
                    password: {
                        value: kintoneUser['password'].value
                    },
                    ref: {
                        value: kintoneUser['ref'].value
                    }
                });
                if (kintoneUser['password'].value == '') setSection('CreatePassword');
                else if (kintoneUser['password'].value) setSection('Password');
                return;
            } else {
                setUsername({ value: username.value, isError: true });
                return;
            }
        } catch (e) {
            console.log('error on authentication', e);
        }
    };
    const handleConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword !== password.value) {
            password.isError = true;
            password.errorMessage = 'Passwords do not match';
            return;
        } else if (confirmPassword.length == 0) {
            password.isError = true;
            password.errorMessage = 'Password is empty';
            return;
        } else if (confirmPassword.length < 8) {
            password.isError = true;
            password.errorMessage = 'Password must be at least 8 characters';
            return;
        } else password.isError = false;
        return;
    };
    const handleCreatePassword = async () => {
        if (password.isError) return alert(password.errorMessage);
        try {
            const res = await fetch('/api/createPasswordKintone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username.value, password: password.value }) // Replace with your data
            });
            console.log(res);
            if (res.ok) {
                console.log('resok');
                setCookie(null, 'auth', username.value, {
                    maxAge: 7 * 24 * 60 * 60, // お好きな期限を
                    path: '/'
                });
                setCookie(null, 'ref', kintoneUser?.ref.value || 'null', {
                    maxAge: 7 * 24 * 60 * 60, // お好きな期限を
                    path: '/'
                });
                router.push('/apply');
            } else {
                console.log('Error: password not created');
                alert('Something wrong. Please start from the top.');
                router.push('/apply');
                return;
            }
        } catch (e) {
            console.log('Error on creating password', e);
        }
    };
    const handleLogin = async () => {
        if (username.value == kintoneUser?.userName.value && password.value == kintoneUser?.password.value) {
            setCookie(null, 'auth', username.value, {
                maxAge: 7 * 24 * 60 * 60, // お好きな期限を
                path: '/'
            });
            setCookie(null, 'ref', kintoneUser?.ref.value, {
                maxAge: 7 * 24 * 60 * 60, // お好きな期限を
                path: '/'
            });
            // setCookie(null, 'applicationRef', kintoneUser?.applicationRef.value, {
            //     maxAge: 7 * 24 * 60 * 60, // お好きな期限を
            //     path: '/'
            // });
            router.push('/apply');
        } else {
            console.log('password not matched');
            setPassword({ value: password.value, isError: true });
        }
    };
    const allowEnterKeydown = (e: KeyboardEvent, func: () => void) => {
        if (e.key === 'Enter') func();
    };
    const [transitioning, setTransitioning] = useState(false);

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
                                onKeyDown={(e) => allowEnterKeydown(e, handleNext)}
                                placeholder="Email"
                                className="mt-5 p-2 border rounded bg-gray-600 w-72 max-w-full"
                                autoFocus
                            />
                            {username.isError && <div className="text-red-600">Invalid Email Address</div>}
                            <div className="text-center">
                                <button className="btn" onClick={handleNext}>
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
                                onKeyDown={(e) => allowEnterKeydown(e, handleLogin)}
                                placeholder="Password"
                                className="mt-5 p-2 border rounded bg-gray-600 w-72 max-w-full"
                                autoFocus
                            />
                            {password.isError && <div className="text-red-600">Invalid Password</div>}
                            <div className="text-center">
                                <button className="btn" onClick={handleLogin}>
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
                                onChange={(e) => setPassword({ value: e.target.value })}
                                onKeyDown={(e) => allowEnterKeydown(e, handleLogin)}
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
                                    handleConfirmPassword(e.target.value);
                                }}
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
