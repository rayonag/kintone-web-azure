"use client";
import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { setCookie } from "nookies";

import Layout from "./Layout";

type Login = {
    userName: {
        value: string;
        isError?: boolean;
    };
    password: {
        value: string;
        isError?: boolean;
    };
    ref: {
        value: string;
        isError?: boolean;
    };
};
const Login: React.FC = () => {
    const [username, setUsername] = useState<Login["userName"]>({ value: "" });
    const [password, setPassword] = useState<Login["password"]>({ value: "" });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [kintoneUser, setKintoneUser] = useState<Login>();
    const [section, setSection] = useState("Email");
    const router = useRouter();

    const handleNext = async () => {
        try {
            const res = await fetch("/api/loginWithKintone", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username.value }), // Replace with your data
            });

            if (res.ok) {
                const kintoneUser = await res.json();
                setKintoneUser({
                    userName: {
                        value: kintoneUser["username"].value,
                    },
                    password: {
                        value: kintoneUser["password"].value,
                    },
                    ref: {
                        value: kintoneUser["ref"].value,
                    },
                });
                if (kintoneUser["password"].value == "") setSection("CreatePassword");
                else if (kintoneUser["password"].value) setSection("Password");
                return;
            } else {
                setUsername({ value: username.value, isError: true });
                return;
            }
        } catch (e) {
            console.log("error on authentication", e);
        }
    };
    const handleConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword == password.value) {
            password.isError = false;
            return;
        } else password.isError = true;
        return;
    };
    const handleCreatePassword = async () => {
        if (password.isError) return alert("Confirm your password");
        try {
            const res = await fetch("/api/createPasswordKintone", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username.value, password: password.value }), // Replace with your data
            });
            console.log(res);
            if (res.ok) {
                setCookie(null, "auth", username.value, {
                    maxAge: 7 * 24 * 60 * 60, // お好きな期限を
                    path: "/",
                });
                router.push("/apply");
            } else {
                console.log("Error: password not created");
                alert("Something wrong. Please start from the top.");
                router.push("/apply");
                return;
            }
        } catch (e) {
            console.log("Error on creating password", e);
        }
    };
    const handleLogin = async () => {
        if (username.value == kintoneUser?.userName.value && password.value == kintoneUser?.password.value) {
            setCookie(null, "auth", username.value, {
                maxAge: 7 * 24 * 60 * 60, // お好きな期限を
                path: "/",
            });
            setCookie(null, "ref", kintoneUser?.ref.value, {
                maxAge: 7 * 24 * 60 * 60, // お好きな期限を
                path: "/",
            });
            router.push("/apply");
        } else {
            console.log("password not matched");
            setPassword({ value: password.value, isError: true });
        }
    };
    const allowEnterKeydown = (e: KeyboardEvent, func: () => void) => {
        if (e.key === "Enter") func();
    };
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen">
            {section == "Email" && (
                <Layout>
                    <div className="text-center">Enter your email</div>
                    <input value={username.value} onChange={(e) => setUsername({ value: e.target.value })} onKeyDown={(e) => allowEnterKeydown(e, handleNext)} placeholder="Email" className="mt-5 border rounded bg-gray-600 min-w-full" autoFocus />
                    {username.isError && <div className="text-red-600">Invalid Email Address</div>}
                    <div className="text-center">
                        <button className="btn" onClick={handleNext}>
                            Next
                        </button>
                    </div>
                </Layout>
            )}
            {section == "Password" && (
                <Layout>
                    <div className="m-4">Email: {username?.value}</div>
                    <div className="text-center">Enter your password</div>
                    <input type="password" value={password.value} onChange={(e) => setPassword({ value: e.target.value })} onKeyDown={(e) => allowEnterKeydown(e, handleLogin)} placeholder="Password" className="mt-5 border rounded bg-gray-600 min-w-full" autoFocus />
                    {password.isError && <div className="text-red-600">Invalid Password</div>}
                    <div className="text-center">
                        <button className="btn" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </Layout>
            )}
            {section == "CreatePassword" && (
                <Layout>
                    <div className="m-4">Email: {username?.value}</div>
                    <div className="text-center">Enter your password</div>
                    <input value={password.value} onChange={(e) => setPassword({ value: e.target.value })} onKeyDown={(e) => allowEnterKeydown(e, handleLogin)} placeholder="Password" className="my-5 border rounded bg-gray-600 min-w-full" autoFocus />
                    <div className="text-center">Confirm your password</div>
                    <input
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            handleConfirmPassword(e.target.value);
                        }}
                        placeholder="Re-enter Password"
                        className="mt-5 border rounded bg-gray-600 min-w-full"
                    />
                    {password.isError && <div className="text-red-600">Password doesn't match</div>}
                    <div className="text-center">
                        <button className="btn" onClick={handleCreatePassword}>
                            Create Password
                        </button>
                    </div>
                </Layout>
            )}
        </div>
    );
};
export default Login;
