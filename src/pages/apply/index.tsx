'use client';
// Import necessary modules from React
import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { destroyCookie, parseCookies } from 'nookies';

import Layout from '@/styles/Layout_fadeIn';

import postReview from '@/common/checklist/postReview';
import { useDashboardUser } from '@/common/context/dashboardUser';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { KintoneUserName, KintonePassword, VolunteerApplicationAppID, VolunteerApplicationMasterAppID } from '@/common/env';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { REST_OnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import ReactModal from 'react-modal';
import Helper from '@/components/modal/helper';
import { REST_VolunteerApplicationForm } from '@/types/VolunteerApplicationForm';
import GreenCheckMark from '@/components/icons/GreenCheckMark';
import ArrowUpRight from '@/components/icons/ArrowUpRight';
import logError from '@/common/logError';
import { useRouter } from 'next/router';
import RateUs from '@/components/modal/RateUs';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useUserStore from '@/features/common/store';
import { useShallow } from 'zustand/react/shallow';
import Vara from 'vara';
// application steps that matches the kintone app
export type ApplicationStepsMasterApp =
    | 'Applying'
    | 'Complete Application Form'
    | 'Necessary Documents Submitted'
    | 'National Office Review'
    | 'SDD Review'
    | 'Accepted'
    | 'Rejected';
export const applicationStepsMasterApp = {
    Applying: 0,
    'Complete Application Form': 1,
    'Necessary Documents Submitted': 2,
    'National Office Review': 3,
    'SDD Review': 4,
    Accepted: 5,
    Rejected: 6
};
export type ApplicationSteps = 'reviewWebsite' | 'submitApplication' | 'submitDocuments' | 'complete';
export const applicationSteps = {
    reviewWebsite: 0,
    submitApplication: 1,
    submitDocuments: 2,
    complete: 3
};
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
    const [isLoaded, setIsLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dashboardUser = useDashboardUser();
    const userRef = dashboardUser.ref;
    useEffect(() => {
        if (dashboardUser.isLoggedIn) setIsLoaded(true);
    }, [dashboardUser]);
    // helper modal
    const [currentStep, setCurrentStep] = useState<ApplicationSteps>('reviewWebsite');
    useEffect(() => {
        if (!repo) return;
        if (repo.reviewAbout !== 'ok' || repo.reviewFaq !== 'ok') {
            setCurrentStep('reviewWebsite');
        } else if (!dashboardUser.formSubmission?.includes('Application Form Completed')) {
            setCurrentStep('submitApplication');
        } else if (!repo.allDocumentsSubmitted) {
            setCurrentStep('submitDocuments');
        } else {
            setCurrentStep('complete');
        }
    }, [dashboardUser]);
    const setIsCompleteTrue = async (ref: string | undefined) => {
        if (!ref) return;
        const body = {
            userRef: ref
        };
        const res = await fetch('/api/application/checklist/postIsComplete', {
            method: 'POST',
            body: JSON.stringify(body)
        });
        if (res.ok) {
            return res;
        } else {
            throw new Error('Failed to edit Kintone record');
        }
    };
    useEffect(() => {
        if (!repo?.isComplete && currentStep == 'complete') {
            setIsModalOpen(true);
            setIsCompleteTrue(dashboardUser.ref);
        }
    }, [currentStep]);
    const needsRevieWebsite = currentStep == 'reviewWebsite' ? true : false;
    useEffect(() => {
        // for modal
        ReactModal.setAppElement('#__next');
    }, []);
    const buttonProps = (availableOn: ApplicationSteps) => ({
        className: `${applicationSteps[availableOn] <= applicationSteps[currentStep] ? 'btn' : 'btn-disabled pointer-events-none'}`,
        'aria-disabled': needsRevieWebsite,
        tabIndex: needsRevieWebsite ? -1 : undefined
    });
    const Check = () => (
        <div className="absolute right-[-0.5rem]">
            <GreenCheckMark height={30} width={30} />
        </div>
    );
    const { username, name, type, initUser } = useUserStore(
        useShallow((state) => ({
            username: state.username,
            name: state.name,
            knownAs: state.knownAs,
            type: state.applicationType,
            initUser: state.initUser
        }))
    );
    const knownAs = useUserStore((state) => state.knownAs);
    const all = useUserStore();
    console.log('all', all);

    function VaraText() {
        let fontSize = 72;
        if (window.screen.width < 700) fontSize = 32;
        else if (window.screen.width < 1200) fontSize = 56;
        useEffect(() => {
            if (type == 'Zealous')
                new Vara('#vara-container', 'fonts/test4.json', [
                    {
                        text: 'Zealous 8:2',
                        fontSize: fontSize,
                        strokeWidth: 1.5,
                        color: '#fff',
                        delay: 20000,
                        textAlign: 'center'
                    },
                    {
                        text: 'Thus says the Lord of hosts:',
                        fontSize: fontSize * 0.85,
                        strokeWidth: 1.5,
                        color: '#fff',
                        delay: 1000,
                        textAlign: 'center'
                    },
                    {
                        text: '"I am zealous for Zion with great zeal;',
                        fontSize: fontSize * 0.85,
                        strokeWidth: 1.5,
                        color: '#fff',
                        textAlign: 'center'
                    },
                    {
                        text: 'with great fervor I am zealous for her."',
                        fontSize: fontSize * 0.85,
                        strokeWidth: 1.5,
                        color: '#fff',
                        textAlign: 'center'
                    },
                    {
                        text: 'Zechariah 8:2',
                        fontSize: fontSize * 0.85,
                        strokeWidth: 1.5,
                        color: '#fff',
                        textAlign: 'center'
                    }
                ]).animationEnd((i, o) => {
                    if (typeof i == 'number') {
                        //console.log('time', (5 - i) * 2);
                        o.container.style.transition = `opacity 2s ${(5 - i) * 2}s ease-in-out`;
                        o.container.style.opacity = '0';
                    }
                });
            else
                new Vara('#vara-container', 'fonts/test4.json', [
                    {
                        text: 'Bridges for Peace',
                        fontSize: fontSize,
                        strokeWidth: 1,
                        color: '#fff',
                        delay: 200,
                        textAlign: 'center'
                    },
                    {
                        text: '...Your Israel Connection',
                        fontSize: fontSize * 0.85,
                        strokeWidth: 1,
                        delay: 5000,
                        color: '#fff',
                        textAlign: 'center'
                    }
                ]).animationEnd((i, o) => {
                    if (typeof i == 'number') {
                        //console.log('time', (5 - i) * 2);
                        o.container.style.transition = `all 20s ${i == 0 ? 5 : 0}s ease-in-out`;
                        o.container.style.opacity = '0';
                        o.container.style.transform = 'translate(20vw, 20vh)';
                    }
                });
        }, []);

        return <div id="vara-container" className="min-w-[80%] pt-[20vh]"></div>;
    }
    return (
        <Layout>
            {/* TODO: vara text on background
            {isLoaded && (
                <div className="fixed h-full w-full flex justify-center z-[-1]">
                    <VaraText />
                </div>
            )} */}
            <div className="flex flex-col items-center justify-center min-h-[95vh] text-white overflow-hidden">
                {isLoaded && userRef ? (
                    <>
                        <div className="flex flex-col items-center justify-center">
                            <div>
                                <h1 className="text-xl my-10">Long Term Volunteer Application Checklist</h1>
                            </div>
                            <div>
                                <h1 className="text-xl my-10">
                                    Welcome{currentStep != 'reviewWebsite' && ' back'} <span>{knownAs || name || ''}</span>!
                                    {/* TODO: review welcome message */}
                                </h1>
                            </div>
                            <Link
                                href="https://www.bridgesforpeace.com/meet-us/our-vision/"
                                className="btn flex"
                                target="_blank"
                                onClick={async () => await handleCheckListClick('reviewAbout', userRef)}
                            >
                                About Bridges for Peace
                                <ArrowUpRight />
                            </Link>
                            <Link
                                href="https://www.bridgesforpeace.com/get-involved/volunteer/faqs/"
                                className="btn flex"
                                target="_blank"
                                onClick={async () => await handleCheckListClick('reviewFaq', userRef)}
                            >
                                Frequently Asked Questions
                                <ArrowUpRight />
                            </Link>
                            <div className="relative flex items-center">
                                <Link href="/apply/form" {...buttonProps('submitApplication')}>
                                    Online Application Form
                                </Link>
                                {dashboardUser.formSubmission?.includes('Application Form Completed') && <Check />}
                            </div>
                            {type == 'Zealous' && (
                                <div className="relative flex items-center">
                                    <Link href="/apply/financial-obligation" {...buttonProps('submitApplication')}>
                                        Financial Obligation Policy
                                    </Link>
                                    {dashboardUser.formSubmission?.includes('Application Form Completed') && <Check />}
                                </div>
                            )}
                            <div className="relative flex items-center">
                                <Link href="/apply/health-questionnaire" {...buttonProps('submitApplication')}>
                                    Personal Health Questionnaire
                                </Link>
                                {dashboardUser.formSubmission?.includes('Personal Health Questionnaire') && <Check />}
                            </div>
                            <div className="relative flex items-center">
                                <Link href="/apply/documents" {...buttonProps('submitDocuments')}>
                                    Submit Necessary Documents
                                </Link>
                                {repo?.allDocumentsSubmitted && <Check />}
                            </div>
                            <Helper currentStep={currentStep} userRef={userRef} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                            {currentStep == 'complete' && <RateUs />}
                            <Link href="/contact" className="btn">
                                Contact Us
                            </Link>
                            <button className="btn" onClick={handleLogout}>
                                Log out
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <LoadingSpinner />
                    </>
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
    allDocumentsSubmitted: boolean;
    isComplete: boolean;
};
export const getServerSideProps = (async (context) => {
    try {
        const cookies = parseCookies(context);
        if (typeof cookies.auth == 'undefined') return { props: {} };
        const client = new KintoneRestAPIClient({
            baseUrl: 'https://bfp.kintone.com',
            auth: {
                username: KintoneUserName,
                password: KintonePassword
            }
        });
        let resp = await client.record
            .getRecord<REST_OnlineVolunteerApplication>({
                app: VolunteerApplicationMasterAppID as string,
                id: cookies.ref
            })
            .catch((e) => {
                // if no record found with the cookie ref, delete the cookie and return
                destroyCookie(context, 'auth', {
                    path: '/' // THE KEY IS TO SET THE SAME PATH
                });
                destroyCookie(context, 'ref', {
                    path: '/' // THE KEY IS TO SET THE SAME PATH
                });
                // redirect to login page on server side
                context.res.writeHead(302, { Location: '/apply/login' });
                return undefined;
            });
        const resp2 = await client.record
            .getAllRecords<REST_VolunteerApplicationForm>({
                app: VolunteerApplicationAppID as string,
                condition: `ref="${cookies.ref}"`
            })
            .catch((e) => {
                throw new Error('resp2:' + e);
            });
        if (!resp) return { props: {} };
        // check if not yet
        if (resp2.length > 0) {
            if (resp.record['formSubmission'].value.findIndex((arr) => arr == 'Application Form Completed') == -1) {
                await client.record.updateRecord({
                    app: VolunteerApplicationMasterAppID as string,
                    id: cookies.ref,
                    record: {
                        formSubmission: { value: [...resp.record['formSubmission'].value, 'Application Form Completed'] }
                    }
                });
                resp = await client.record
                    .getRecord<REST_OnlineVolunteerApplication>({
                        app: VolunteerApplicationMasterAppID as string,
                        id: cookies.ref
                    })
                    .catch((e) => {
                        throw new Error('resp_2:' + e);
                    });
            }
            // update status
            if (
                applicationStepsMasterApp[resp.record['status'].value as ApplicationStepsMasterApp] <
                applicationStepsMasterApp['Complete Application Form']
            ) {
                await client.record
                    .updateRecord({
                        app: VolunteerApplicationMasterAppID as string,
                        id: cookies.ref,
                        record: {
                            status: { value: 'Complete Application Form' }
                        }
                    })
                    .catch((e) => {
                        throw new Error('updateRecord:' + e);
                    });
            }
        }
        // documents submission
        const type = resp.record['type'].value;
        const office = resp.record['office'].value;
        const documents = resp.record['documents'].value;
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
        const isAllDocumentsSubmitted = documents.length == requiredDocumentsCount();
        if (isAllDocumentsSubmitted) {
            // update status
            if (
                applicationStepsMasterApp[resp.record['status'].value as ApplicationStepsMasterApp] <
                applicationStepsMasterApp['Necessary Documents Submitted']
            ) {
                await client.record
                    .updateRecord({
                        app: VolunteerApplicationMasterAppID as string,
                        id: cookies.ref,
                        record: {
                            status: { value: 'Necessary Documents Submitted' }
                        }
                    })
                    .catch((e) => {
                        throw new Error('updateRecord_2:' + e);
                    });
            }
        }
        const repo: Repo = {
            reviewAbout: resp.record['reviewAbout'].value[0] || null,
            reviewFaq: resp.record['reviewFaq'].value[0] || null,
            allDocumentsSubmitted: isAllDocumentsSubmitted,
            isComplete: resp.record['isComplete'].value == 'true' || false
        };

        // Pass data to the page via props
        return { props: { repo } };
    } catch (e) {
        logError(e, null, 'apply/getServerSideProps');
        return { props: {} };
    }
}) satisfies GetServerSideProps<{ repo: Repo } | {}>;
