'use client';
// Import necessary modules from React
import React, { useEffect } from 'react';
import Link from 'next/link';
import { destroyCookie } from 'nookies';

import Layout from '@/styles/Layout';
import fetchUserApplicationMaster from '../../common/fetchUserApplicationMaster';
import { useDashboardUser } from '@/common/dashboardUser';

export const handleLogout = () => {
    destroyCookie({}, 'auth', {
        path: '/' // THE KEY IS TO SET THE SAME PATH
    });
    location.reload();
};

// Define the functional component Page
const Page: React.FC = () => {
    const loginUser = useDashboardUser();
    fetchUserApplicationMaster();
    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
                {/* Content */}
                <div className="flex flex-col items-center justify-center">
                    <div>
                        <h1 className="text-xl my-10">Welcome back, {loginUser.name}!</h1>
                    </div>
                    <Link href="https://www.bridgesforpeace.com/meet-us/our-vision/" className="btn" target="_blank" onClick={() => {}}>
                        About Bridges for Peace
                    </Link>
                    <Link href="https://www.bridgesforpeace.com/get-involved/volunteer/faqs/" className="btn" target="_blank" onClick={() => {}}>
                        Frequently Asked Questions
                    </Link>
                    <Link href="/apply/form" className="btn">
                        Online Application Form
                    </Link>
                    <Link href="/apply/documents" className="btn">
                        Submit Necessary Documents
                    </Link>
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
