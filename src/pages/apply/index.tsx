"use client";
// Import necessary modules from React
import React, { useState, createContext, useContext } from "react";
import Link from "next/link";
import Router from "next/router";
import { destroyCookie } from "nookies";

import { useDashboardUserContext } from "../_app";

// Define the functional component Page
const Page: React.FC = () => {
    // State to track whether the iframe content is loading
    const [isLoading, setIsLoading] = useState(true);

    // Function to handle iframe load event
    const handleLogout = () => {
        destroyCookie(null, "auth");
        location.reload();
    };

    return (
        // Use a wrapper div for the entire page
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
            {/* Moving sentence */}
            {/* <div className="absolute top-0 left-0 right-0 text-center mt-4">
                <p className="hello text-sm text-red-300 moveSentence">Bridges for Peace</p>
            </div> */}
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
    );
};

// Export the component for use in other files
export default Page;
