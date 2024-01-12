"use client";
// Import necessary modules from React
import React, { useEffect } from "react";
import Link from "next/link";
import { destroyCookie } from "nookies";

import { useDashboardUser, setDashboardUser } from "../_app";

import Layout from "./Layout";

export const handleLogout = () => {
    destroyCookie({}, "auth", {
        path: "/", // THE KEY IS TO SET THE SAME PATH
    });
    location.reload();
};

// Define the functional component Page
const Page: React.FC = () => {
    const loginUser = useDashboardUser();
    const setUser = setDashboardUser();
    const username = loginUser.username;
    // fetch user information
    if (!loginUser.isLoggedIn) {
        useEffect(() => {
            const fetchUser = async () => {
                const res = await fetch("/api/fetchUserKintone", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username: username }),
                });
                const user = await res.json();
                setUser((prev) => ({ ...prev, name: user["name"].value, ref: user["ref"].value, isLoggedIn: true }));
            };
            fetchUser();
        }, [loginUser]);
    }
    // Function to handle iframe load event

    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
                {/* Content */}
                <div className="flex flex-col items-center justify-center">
                    <div>
                        <h1 className="text-xl my-10">Welcome back, {loginUser?.name}!</h1>
                    </div>
                    <Link href="/apply/form" className="btn">
                        Online Application Form
                    </Link>
                    <button className="btn">Get Ready for Departure</button>
                    <a href="https://www.bridgesforpeace.com" className="btn">
                        About Bridges for Peace
                    </a>
                    <button className="btn">Contact Us</button>
                    <button className="btn" onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            </div>
        </Layout>
    );
};

// Export the component for use in other files
export default Page;
