"use client";
// Import necessary modules from React
import React, { useState } from "react";
import Link from "next/link";
import { destroyCookie } from "nookies";

import { useDashboardUser } from "../_app";

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
                        Submit online application form
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
