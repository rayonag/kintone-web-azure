'use client';
// Import necessary modules from React
import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { destroyCookie, parseCookies } from 'nookies';

import Layout from '@/styles/Layout_fadeIn';
import fetchUserApplicationMaster from '../../common/fetchUserApplicationMaster';

import getUserApplicationRef from '@/common/getUserApplicationRef';
import postReview from '@/common/checklist/postReview';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { useDashboardUser } from '../_app';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { KintoneUserName, KintonePassword, VolunteerApplicationAppID, VolunteerApplicationMasterAppID } from '@/common/env';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { REST_VolunteerApplicationMaster } from '@/types/VolunteerApplicationMaster';
import ReactModal from 'react-modal';
import Helper, { HelperSteps } from '@/components/modal/helper';

export const handleLogout = () => {
    destroyCookie({}, 'auth', {
        path: '/' // THE KEY IS TO SET THE SAME PATH
    });
    destroyCookie({}, 'ref', {
        path: '/' // THE KEY IS TO SET THE SAME PATH
    });
    location.reload();
};
// TODO: review validation and return val
export const handleCheckListClick = async (field: string, userRef: string) => {
    await postReview(field, userRef);
    location.reload();
};

// Define the functional component Page
const Page = ({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    console.log('repo', repo);
    fetchUserApplicationMaster();
    const { dashboardUser, setDashboardUser } = useDashboardUser();
    console.log('dashboardUser', dashboardUser);
    const userRef = dashboardUser.ref;
    const [userApplicationRef, setUserApplicationRef] = useState('');

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

    // helper modal
    const [currentStep, setCurrentStep] = useState<HelperSteps>(
        repo?.reviewAbout == 'ok' && repo.reviewFaq == 'ok' ? 'submitDocuments' : 'reviewWebsite'
    );
    const needsRevieWebsite = currentStep == 'reviewWebsite' ? true : false;
    useEffect(() => {
        // for modal
        ReactModal.setAppElement('#__next');
    }, []);
    //if (!userApplicationRef) return <LoadingSpinner />;
    const buttonProps = {
        className: `${needsRevieWebsite ? 'btn-disabled pointer-events-none' : 'btn'}`,
        'aria-disabled': needsRevieWebsite,
        tabIndex: needsRevieWebsite ? -1 : undefined
    };
    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden">
                {userRef ? (
                    <div className="flex flex-col items-center justify-center">
                        <div>
                            <h1 className="text-xl my-10">Welcome back, {dashboardUser.name}!</h1>
                        </div>
                        <Link
                            href="https://www.bridgesforpeace.com/meet-us/our-vision/"
                            className="btn"
                            target="_blank"
                            onClick={async () => await handleCheckListClick('reviewAbout', userRef)}
                        >
                            About Bridges for Peace
                        </Link>
                        <Link
                            href="https://www.bridgesforpeace.com/get-involved/volunteer/faqs/"
                            className="btn"
                            target="_blank"
                            onClick={async () => await handleCheckListClick('reviewFaq', userRef)}
                        >
                            Frequently Asked Questions
                        </Link>
                        <Link href="/apply/form" {...buttonProps}>
                            Online Application Form
                        </Link>
                        <Link href="/apply/health-questionnaire" {...buttonProps}>
                            Personal Health Questionnaire
                        </Link>
                        <Link href="/apply/documents" {...buttonProps}>
                            Submit Necessary Documents
                        </Link>
                        <Helper currentStep={currentStep} userRef={userRef} />
                        <button className="btn">Contact Us</button>
                        <button className="btn" onClick={handleLogout}>
                            Log out
                        </button>
                    </div>
                ) : (
                    <LoadingSpinner />
                )}
            </div>
        </Layout>
    );
};

// Export the component for use in other files
export default Page;

type Repo = {
    reviewAbout: string | null;
    reviewFaq: string | null;
};
export const getServerSideProps = (async (context) => {
    const cookies = parseCookies(context);
    if (typeof cookies.auth == 'undefined') return { props: {} };
    const client = new KintoneRestAPIClient({
        baseUrl: 'https://bfp.kintone.com',
        auth: {
            username: KintoneUserName,
            password: KintonePassword
        }
    });
    const resp = await client.record.getRecord<REST_VolunteerApplicationMaster>({
        app: VolunteerApplicationMasterAppID as string,
        id: cookies.ref
    });
    console.log('resp', resp);
    const repo: Repo = { reviewAbout: resp.record['reviewAbout'].value[0] || null, reviewFaq: resp.record['reviewFaq'].value[0] || null };
    // Pass data to the page via props
    return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: Repo }>;
