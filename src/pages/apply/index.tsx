'use client';
// Import necessary modules from React
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { destroyCookie } from 'nookies';

import Layout from '@/styles/Layout';
import fetchUserApplicationMaster from '../../common/fetchUserApplicationMaster';

import getUserApplicationRef from '@/common/getUserApplicationRef';
import postReview from '@/common/checklist/postReview';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { useDashboardUser } from '../_app';

export const handleLogout = () => {
    destroyCookie({}, 'auth', {
        path: '/' // THE KEY IS TO SET THE SAME PATH
    });
    location.reload();
};

// Define the functional component Page
const Page: React.FC = () => {
    const { dashboardUser, setDashboardUser } = useDashboardUser();
    const userRef = dashboardUser.ref;
    fetchUserApplicationMaster();
    const [userApplicationRef, setUserApplicationRef] = useState('');
    // early return. TODO: review validation
    if (!userRef) {
        return <LoadingSpinner />;
    }
    //get applicationRef
    useEffect(() => {
        (async () => {
            // early return. TODO: review validation
            if (!userRef) {
                return;
            }
            const userApplicationRef = await getUserApplicationRef({ ref: userRef });
            setUserApplicationRef(userApplicationRef || '');
        })();
    }, []);

    // UserapplicationrefはもうCookieに設定しちゃおうかな。いったんそれで
    // TODO: review validation and return val
    if (!userApplicationRef) return <LoadingSpinner />;
    const handleCheckListClick = (field: string) => {
        debugger;
        if (typeof userApplicationRef != 'string') return;
        postReview(field, userApplicationRef);
    };
    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden">
                {/* Content */}
                <div className="flex flex-col items-center justify-center">
                    <div>
                        <h1 className="text-xl my-10">Welcome back, {dashboardUser.name}!</h1>
                    </div>
                    <Link
                        href="https://www.bridgesforpeace.com/meet-us/our-vision/"
                        className="btn"
                        target="_blank"
                        onClick={() => handleCheckListClick('reviewAbout')}
                    >
                        About Bridges for Peace
                    </Link>
                    <Link
                        href="https://www.bridgesforpeace.com/get-involved/volunteer/faqs/"
                        className="btn"
                        target="_blank"
                        onClick={() => handleCheckListClick('reviewFaq')}
                    >
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
