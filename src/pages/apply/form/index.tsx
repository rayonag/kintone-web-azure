'use client';
// Import necessary modules from React
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDashboardUser } from '@/pages/_app';
import { KintoneUserName, KintonePassword, VolunteerApplicationMasterAppID, VolunteerApplicationAppID } from '@/common/env';
import { REST_VolunteerApplicationMaster } from '@/types/VolunteerApplicationMaster';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { parseCookies } from 'nookies';
import { shortTermApplicationURL, volunteerApplicationURL, zealousAplicationURL } from './iframeLinks';
import postIsFirstTime from '@/common/checklist/postIsFirstTime';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import Link from 'next/link';
import Layout_fadeIn from '@/styles/Layout_fadeIn';
import { REST_VolunteerApplicationForm } from '@/types/VolunteerApplicationForm';
import logError from '@/common/logError';

const ApplicationForm = ({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    // State to track whether the iframe content is loading
    const [isLoading, setIsLoading] = useState(true);
    const [ref, setRef] = useState('');
    const { dashboardUser, setDashboardUser } = useDashboardUser();
    const user = dashboardUser;
    const router = useRouter();
    // server props
    if (typeof window !== undefined) {
        if (!repo?.formSubmitted) {
            alert('Something went wrong.');
            router.push('/apply');
            return;
        }
    }
    const isFirstTimeOnForm = repo.isFirstTimeOnForm;
    const type = repo.type;
    const formSubmitted = repo.formSubmitted;

    const getIframeLink = (type: string | null) => {
        switch (type) {
            case 'Long Term':
                return volunteerApplicationURL;
            case 'Short Term':
                return shortTermApplicationURL;
            case 'Zealous':
                return zealousAplicationURL;
            default:
                return '';
        }
    };
    const iframeLink = getIframeLink(type);
    // console.log('type', type);
    // console.log(user);
    useEffect(() => {
        const ref = user.ref;
        if (ref == undefined) {
            router.push('/apply');
            return;
        }
        setRef(ref);
        // if first time no loading
        if (isFirstTimeOnForm) setIsLoading(false);
    }, []);
    // Function to handle iframe load event
    const handleIframeLoad = () => {
        // Set isLoading to false when the iframe has finished loading
        // added 2 seconds for lagging loading time
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };
    const handleContinueOnFirstTime = async () => {
        if (!dashboardUser.ref) return;
        setIsLoading(true);
        await postIsFirstTime(dashboardUser.ref);
        location.reload();
    };
    // confirm before leave
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    return (
        // Use a wrapper div for the entire page
        <Layout_fadeIn>
            <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
                {formSubmitted ? (
                    <>
                        <div className="flex flex-col items-center justify-center h-screen">
                            <div>Thank you for submitting application form.</div>
                            <Link href="/apply" className="btn">
                                Go to Top
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        {isFirstTimeOnForm ? (
                            <>
                                {isLoading && <LoadingSpinner />}
                                <div className="flex flex-col items-center justify-center h-screen">
                                    <div className="text-3xl m-5">Some tips...</div>
                                    <div className="m-3">This is a volunteer application for: {type}</div>
                                    <div className="m-3">If you're not intended for {type} please let us know</div>
                                    <div className="m-3">You can save your progress by Temporary Save button on the buttom of each page.</div>
                                    <button onClick={handleContinueOnFirstTime} className="btn">
                                        Continue
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                {isLoading && <LoadingSpinner />}

                                {/* Iframe component */}
                                <iframe
                                    title="Embedded Content"
                                    src={`${iframeLink}&ref=${ref}`} // Replace with your desired URL
                                    style={{ flex: 1, border: 'none' }} // Make the iframe fill the remaining space
                                    onLoad={handleIframeLoad}
                                ></iframe>
                            </>
                        )}
                    </>
                )}
            </div>
        </Layout_fadeIn>
    );
};

// Export the component for use in other files
export default ApplicationForm;

type Repo = {
    isFirstTimeOnForm: boolean;
    type: string | null;
    formSubmitted: boolean;
};
export const getServerSideProps = (async (context) => {
    try {
        const cookies = parseCookies(context);
        if (typeof cookies.auth == 'undefined') return;
        const client = new KintoneRestAPIClient({
            baseUrl: 'https://bfp.kintone.com',
            auth: {
                username: KintoneUserName,
                password: KintonePassword
            }
        });
        let resp = await client.record.getRecord<REST_VolunteerApplicationMaster>({
            app: VolunteerApplicationMasterAppID as string,
            id: cookies.ref
        });
        const resp2 = await client.record.getAllRecords<REST_VolunteerApplicationForm>({
            app: VolunteerApplicationAppID as string,
            condition: `ref="${cookies.ref}"`
        });
        // check if not yet
        if (resp2.length > 0) {
            if (resp.record['formSubmission'].value.findIndex((arr) => arr == 'Application Form Completed') == -1) {
                console.log('first', [...resp.record['formSubmission'].value, 'Application Form Completed']);
                await client.record.updateRecord({
                    app: VolunteerApplicationMasterAppID as string,
                    id: cookies.ref,
                    record: {
                        formSubmission: { value: [...resp.record['formSubmission'].value, 'Application Form Completed'] }
                    }
                });
                resp = await client.record.getRecord<REST_VolunteerApplicationMaster>({
                    app: VolunteerApplicationMasterAppID as string,
                    id: cookies.ref
                });
            }
        }
        //console.log('resp', resp);
        const repo: Repo = {
            isFirstTimeOnForm: resp.record['isFirstTimeOnForm'].value == 'true',
            type: resp.record['type'].value || null,
            formSubmitted: resp.record['formSubmission'].value.findIndex((arr) => arr == 'Application Form Completed') > -1
        };
        // Pass data to the page via props
        return { props: { repo } };
    } catch (e) {
        logError(e, e.errors || null, 'apply/form/getServerSideProps');
        console.log('error');
        return { props: {} };
    }
}) satisfies GetServerSideProps<{ repo: Repo }>;
