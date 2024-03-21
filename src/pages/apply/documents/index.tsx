'use client';
// Import necessary modules from React
import React, { useEffect } from 'react';
import Link from 'next/link';
import { destroyCookie } from 'nookies';
import Layout from '@/styles/Layout';
import fetchUserApplicationMaster from '@/common/fetchUserApplicationMaster';
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
                <div className="flex flex-col items-center justify-center text-center">
                    <div>
                        <h1 className="text-xl my-10">Documents Submission</h1>
                        <h1 className="text-xl my-10">{loginUser.checkList?.length || 0}/6 Completed</h1>
                    </div>
                    <Link href="./documents/health-questionnaire" className="btn">
                        Health Questionnaire
                    </Link>
                    <Link href="./documents/medical-form" className="btn">
                        Medical Form
                    </Link>
                    <Link href="./documents/doctor-letter" className="btn">
                        Doctor's Letter
                    </Link>
                    <Link href="./documents/passport" className="btn">
                        Copy of Passport
                    </Link>
                    <Link href="./documents/recent-photo" className="btn">
                        Recent Photo
                    </Link>
                    <Link href="/apply" className="btn">
                        Return to Home
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

// Export the component for use in other files
export default Page;
