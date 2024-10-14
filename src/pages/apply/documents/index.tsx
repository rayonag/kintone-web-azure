'use client';
// Import necessary modules from React
import React, { useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/styles/Layout_fadeIn';
import { useDashboardUser } from '@/common/context/dashboardUser';
import GreenCheckMark from '@/components/icons/GreenCheckMark';
import useUserStore from '@/features/common/store';

// Define the functional component Page
const Page: React.FC = () => {
    const dashboardUser = useDashboardUser();
    const loginUser = dashboardUser;
    const Check = () => (
        <div className="absolute right-[-2.5rem]">
            <GreenCheckMark height={30} />
        </div>
    );
    const isSubmitted = (document: string) => loginUser.documents?.includes(document);
    const office = useUserStore((state) => state.nationalOffice);
    const type = useUserStore((state) => state.applicationType);
    const requiredDocumentsCount = () => {
        if (!type || !office) return '-';
        if (office == 'USA') {
            if (type == 'Short Term') return 5;
            if (type == 'Long Term' || type == 'Zealous') return 6;
        } else {
            if (type == 'Short Term') return 4;
            if (type == 'Long Term' || type == 'Zealous') return 5;
        }
    };

    if (!office) return <></>;
    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-[95vh] text-white overflow-hidden">
                {/* Content */}
                <div className="relative flex flex-col items-center justify-center text-center">
                    <div>
                        <h1 className="text-xl my-10">Documents Submission</h1>
                        <h1 className="text-xl my-10">
                            {loginUser.documents?.length || '-'}/{requiredDocumentsCount()} Completed
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

                    {type == 'Short Term' || (
                        <div className="relative flex items-center">
                            <Link href="./documents/criminal-check" className="btn">
                                {office == 'USA' ? 'FBI Criminal Background Check' : 'Criminal Check'}
                            </Link>
                            {isSubmitted('Criminal Check') && <Check />}
                        </div>
                    )}

                    {office == 'USA' && (
                        <div className="relative flex items-center">
                            <Link href="./documents/social-security-card" className="btn">
                                Social Security Card
                            </Link>
                            {isSubmitted('Social Security Card') && <Check />}
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
