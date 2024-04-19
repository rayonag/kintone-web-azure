'use client';
// Import necessary modules from React
import React, { useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/styles/Layout_fadeIn';
import fetchUserApplicationMaster from '@/common/fetchUserApplicationMaster';
import { useDashboardUser } from '@/pages/_app';

// Define the functional component Page
const Page: React.FC = () => {
    const { dashboardUser, setDashboardUser } = useDashboardUser();
    const loginUser = dashboardUser;
    console.log('loginUser', loginUser);
    fetchUserApplicationMaster();
    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden">
                {/* Content */}
                <div className="flex flex-col items-center justify-center text-center">
                    <div>
                        <h1 className="text-xl my-10">Documents Submission</h1>
                        <h1 className="text-xl my-10">{loginUser.documents?.length || 0}/4 Completed</h1>
                    </div>
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
