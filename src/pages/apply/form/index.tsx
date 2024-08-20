'use client';
// Import necessary modules from React
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDashboardUser } from '@/common/context/dashboardUser';
import { KintoneUserName, KintonePassword, VolunteerApplicationMasterAppID, VolunteerApplicationAppID } from '@/common/env';
import { REST_OnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { parseCookies } from 'nookies';
import { shortTermApplicationURL, volunteerApplicationURL, zealousAplicationURL } from '@/common/env';
import postIsFirstTime from '@/common/checklist/postIsFirstTime';
import Link from 'next/link';
import Layout_fadeIn from '@/styles/Layout_fadeIn';
import { REST_VolunteerApplicationForm, REST_SavedVolunteerApplicationForm } from '@/types/VolunteerApplicationForm';
import logError from '@/common/logError';
import { NationalOffice } from '@/common/context/offices';
import FirstTimeTips from './FirstTimeTips';
import { useLoading } from '@/common/context/loading';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ViewMyForm from './ViewMyForm';
import Application from '@/features/common/forms/application';

const ApplicationForm = ({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <Application />;

    // State to track whether the iframe content is loading
    const { setIsLoading } = useLoading();
    const [isIframeLoading, setIsIframeLoading] = useState(false);
    const [isIframeLoaded, setIsIframeLoaded] = useState(false);
    const [ref, setRef] = useState('');
    const [office, setOffice] = useState<NationalOffice | undefined>(undefined);
    const [isFirstTimeOnForm, setIsFirstTimeOnForm] = useState(false);
    const dashboardUser = useDashboardUser();
    const router = useRouter();

    const type = repo?.type || null;
    const formSubmitted = repo?.formSubmitted || false;
    const iframeLink = repo?.prefilledFormURL || `${getIframeLink(type)}&ref=${ref}&office=${office}`;
    useEffect(() => {
        const ref = dashboardUser.ref;
        if (ref == undefined) {
            router.push('/apply');
            return;
        }
        const office = repo?.office;
        setRef(ref);
        setOffice(office);
        // if first time no loading
        if (isFirstTimeOnForm) setIsLoading(false);
        setIsFirstTimeOnForm(repo?.isFirstTimeOnForm || false);
    }, [dashboardUser]);
    // Function to handle iframe load event
    const handleIframeLoad = () => {
        setIsIframeLoaded(true);
        setTimeout(() => {
            setIsIframeLoading(false);
        }, 4000); // Minimum 4 seconds delay
    };

    useEffect(() => {
        if (isIframeLoaded) {
            const timer = setTimeout(() => {
                setIsIframeLoading(false);
            }, 7000); // Minimum 4 seconds delay
            return () => clearTimeout(timer);
        }
    }, [isIframeLoaded]);

    const handleContinueOnFirstTime = async () => {
        if (!dashboardUser.ref) return;
        await postIsFirstTime(dashboardUser.ref);
        setIsFirstTimeOnForm(false);
        //location.reload();
    };
    // confirm before leave page
    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            event.preventDefault();
            event.returnValue = '';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    // back to top after receiving postmessage from FormBridge
    useEffect(() => {
        const receiveMessage = async (event: any) => {
            let data = null;
            try {
                data = JSON.parse(event.data);
            } catch (e) {
                console.log('error', e);
                return;
            }
            if (data?.form?.publicCode) {
                const res = await fetch('/api/reference/postApplicationForm', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ref: dashboardUser.ref }) // Replace with your data
                });
                //alert('Thank you for submitting application form.');
                router.push('/apply');
            }
        };
        window.addEventListener('message', receiveMessage);
        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('message', receiveMessage);
        };
    }, []);

    useEffect(() => {
        if (!isIframeLoading && !formSubmitted && !isFirstTimeOnForm && !isIframeLoaded) setIsIframeLoading(true);
    }, [formSubmitted, isFirstTimeOnForm]);
    const [viewMyForm, setViewMyForm] = useState(false);

    return (
        // Use a wrapper div for the entire page
        <>
            <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
                {formSubmitted ? (
                    <>
                        <Layout_fadeIn key="page">
                            <div className="flex flex-col items-center justify-center h-[95vh]">
                                <div>Thank you for submitting {type} application form.</div>
                                {viewMyForm ? (
                                    <ViewMyForm />
                                ) : (
                                    <button className="btn" onClick={() => setViewMyForm(true)}>
                                        View Your Response
                                    </button>
                                )}
                                <Link href="/apply" className="btn">
                                    Go to Top
                                </Link>
                            </div>
                        </Layout_fadeIn>
                    </>
                ) : (
                    <>
                        {isFirstTimeOnForm ? (
                            <>
                                <FirstTimeTips type={type} handleContinueOnFirstTime={handleContinueOnFirstTime} />
                            </>
                        ) : (
                            <>
                                <Layout_fadeIn key="page">
                                    <div style={{ height: '95vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
                                        {isIframeLoading && (
                                            <div className="flex justify-center mt-[2vh] h-full bg-[#012C66] p-4 md:px-16">
                                                <div className="my-10 mx-24 p-4 bg-white w-full max-w-[1250px] max-h-[500px] rounded-md">
                                                    <div className="flex h-fit items-center">
                                                        {Array(10)
                                                            .fill(0)
                                                            .map((_, index) => (
                                                                <>
                                                                    <Skeleton circle={true} key={index} height={20} width={20} />
                                                                    {index != 9 && <div className="h-1 w-40 bg-gray-300 align-middle"></div>}
                                                                </>
                                                            ))}
                                                    </div>
                                                    <Skeleton className="text-4xl my-6" style={{ width: '30rem', maxWidth: '90%' }} />
                                                    <div className="my-10"></div>{' '}
                                                    {Array(2)
                                                        .fill(0)
                                                        .map((_, index) => (
                                                            <div key={index} className="my-8">
                                                                <Skeleton className="text-2xl" style={{ width: '10rem', maxWidth: '70%' }} />
                                                                <Skeleton className="text-4xl" style={{ width: '16rem', maxWidth: '70%' }} />
                                                            </div>
                                                        ))}
                                                    <div className="mt-10 flex">
                                                        <Skeleton
                                                            className="text-3xl"
                                                            style={{ width: '5rem', maxWidth: '70%', marginRight: '10px' }}
                                                        />
                                                        <Skeleton className="text-3xl" style={{ width: '10rem', maxWidth: '70%' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {office && (
                                            <iframe
                                                title="Embedded Content"
                                                src={`${iframeLink}`} // Replace with your desired URL
                                                style={{ flex: 1, border: 'none', marginTop: '2vh', display: `${isIframeLoading ? 'none' : ''}` }} // Make the iframe fill the remaining space
                                                onLoad={handleIframeLoad}
                                            ></iframe>
                                        )}
                                    </div>
                                </Layout_fadeIn>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

// Export the component for use in other files
export default ApplicationForm;

type Repo = {
    isFirstTimeOnForm: boolean;
    type: string | null;
    formSubmitted: boolean;
    office: NationalOffice;
    prefilledFormURL: string | null;
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
        let resp = await client.record.getRecord<REST_OnlineVolunteerApplication>({
            app: VolunteerApplicationMasterAppID as string,
            id: cookies.ref
        });
        const resp2 = await client.record.getAllRecords<REST_SavedVolunteerApplicationForm>({
            app: VolunteerApplicationAppID as string,
            condition: `ref="${cookies.ref}"`
        });
        let prefilledFormURL = null;
        // check if not yet
        const getPrefilledFormURL = (record: REST_SavedVolunteerApplicationForm) => {
            let query = '';
            Object.keys(record).forEach((key) => {
                const typedKey = key as keyof REST_VolunteerApplicationForm;
                // ref
                if (key === 'ref') {
                    query += `${key}=${cookies.ref}&`;
                    return;
                }
                if (!Array.isArray(record[typedKey].value) || record[typedKey].value.length === 0) {
                    // if text box, radio, select, number, date
                    query += `${key}=${record[typedKey].value}&`;
                    return;
                }
                if (typeof record[typedKey].value[0] === 'object' && record[typedKey].value[0] !== null) {
                    // if tables
                    if (record[typedKey].value[0].value) {
                        record[typedKey].value.forEach((table: any, index: number) => {
                            Object.keys(table.value).forEach((tableKey) => {
                                const typedTableKey = tableKey as keyof REST_VolunteerApplicationForm;
                                query += `${key}-${index}-${tableKey}=${table.value[typedTableKey].value}&`;
                            });
                        });
                    }
                    // if files
                    return;
                }
                if (typeof record[typedKey].value[0] === 'string') {
                    // if checkbox array
                    query += `${key}=${record[typedKey].value.join(',')}&`;
                    return;
                }
            });
            return `${getIframeLink(resp.record['type'].value)}?${query}`;
        };
        if (resp2.length > 0) {
            if (resp.record['formSubmission'].value.findIndex((arr) => arr == 'Application Form Completed') == -1) {
                // check if form is submitted
                if (resp2[0]) {
                    await client.record.updateRecord({
                        app: VolunteerApplicationMasterAppID as string,
                        id: cookies.ref,
                        record: {
                            formSubmission: { value: [...resp.record['formSubmission'].value, 'Application Form Completed'] },
                            status: { value: 'Complete Application Form' }
                        }
                    });
                    resp = await client.record.getRecord<REST_OnlineVolunteerApplication>({
                        app: VolunteerApplicationMasterAppID as string,
                        id: cookies.ref
                    });
                }
            }
        }
        if (resp.record['returnRef'].value) {
            const resp3 = await client.record.getAllRecords<REST_SavedVolunteerApplicationForm>({
                app: VolunteerApplicationAppID as string,
                condition: `ref=${resp.record['returnRef'].value}`
            });
            if (resp3) prefilledFormURL = getPrefilledFormURL(resp3[0]);
        }
        //console.log('resp', resp);
        const repo: Repo = {
            isFirstTimeOnForm: resp.record['isFirstTimeOnForm'].value == 'true',
            type: resp.record['type'].value || null,
            formSubmitted: resp.record['formSubmission'].value.findIndex((arr) => arr == 'Application Form Completed') > -1,
            office: resp.record['office'].value,
            prefilledFormURL: prefilledFormURL
        };
        console.log('repo', repo);
        // Pass data to the page via props
        return { props: { repo } };
    } catch (e: any) {
        logError(e, e.errors || null, 'apply/form/getServerSideProps');
        console.log('error');
        return { props: {} };
    }
}) satisfies GetServerSideProps<{ repo: Repo } | {}>;
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
