"use client";
// Import necessary modules from React
import React, { useState } from "react";
import Link from "next/link";
import { destroyCookie } from "nookies";

import Layout from "./Layout";

// Define the functional component Page
const Page: React.FC = () => {
    // Function to handle iframe load event
    const handleLogout = () => {
        destroyCookie({}, "auth", {
            path: "/", // THE KEY IS TO SET THE SAME PATH
        });
        location.reload();
    };

    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
                {/* Content */}
                <div className="flex flex-col items-center justify-center">
                    <Link href="/apply/dashboard" className="btn">
                        Go to Dashboard
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
