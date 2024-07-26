'use client';
// Import necessary modules from React
import React, { useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/styles/Layout_fadeIn';
import { useDashboardUser } from '@/common/context/dashboardUser';
import GreenCheckMark from '@/components/icons/GreenCheckMark';

// Define the functional component Page
const Page: React.FC = () => {
    const dashboardUser = useDashboardUser();
    const loginUser = dashboardUser;
    console.log('loginUser', loginUser);
    const Check = () => (
        <div className="absolute right-[-2.5rem]">
            <GreenCheckMark height={30} />
        </div>
    );
    const isSubmitted = (document: string) => loginUser.documents?.includes(document);
    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden">
                {/* Content */}
                <div className="relative flex flex-col items-center justify-center text-center">
                    <div>
                        <h1 className="text-xl my-10">Documents Submission</h1>
                        <h1 className="text-xl my-10">
                            {/* TODO: review */}
                            {loginUser.documents?.length || '-'}/
                            {loginUser['type'] == 'Short Term' ? (loginUser['office'] == 'USA' ? 5 : 4) : loginUser['office'] == 'USA' ? 6 : 5}{' '}
                            Completed
                        </h1>
                    </div>
                    <div className="relative flex items-center">
                        <Link href="./documents/medical-form" className="btn">
                            Medical Form
                        </Link>
                        {isSubmitted('Medical Status Form') && <Check />}
                    </div>
                    <div className="relative flex items-center">
                        <Link href="./documents/doctor-letter" className="btn">
                            Doctor's Letter
                        </Link>
                        {isSubmitted("Doctor's Letter") && <Check />}
                    </div>

                    <div className="relative flex items-center">
                        <Link href="./documents/passport" className="btn">
                            Copy of Passport
                        </Link>
                        {isSubmitted('Passport') && <Check />}
                    </div>

                    <div className="relative flex items-center">
                        <Link href="./documents/recent-photo" className="btn">
                            Recent Photo
                        </Link>
                        {isSubmitted('Recent Photo') && <Check />}
                    </div>

                    {dashboardUser['type'] != 'Short Term' && (
                        <div className="relative flex items-center">
                            <Link href="./documents/criminal-check" className="btn">
                                Criminal Check
                            </Link>
                            {isSubmitted('Criminal Check') && <Check />}
                        </div>
                    )}

                    <div className="relative flex items-center">
                        <Link href="/apply" className="btn">
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

// Export the component for use in other files
export default Page;
