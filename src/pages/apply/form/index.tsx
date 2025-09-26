'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDashboardUser } from '@/common/context/dashboardUser';
import { usePageTransition } from '@/common/context/pageTransition';
import { KintoneUserName, KintonePassword, OnlineVolunteerApplicationAppID, VolunteerApplicationAppID } from '@/common/env';
import { REST_OnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import { KintoneRecordField, KintoneRestAPIClient } from '@kintone/rest-api-client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { parseCookies } from 'nookies';
import postIsFirstTime from '@/common/checklist/postIsFirstTime';
import Link from 'next/link';
import { REST_VolunteerApplicationForm, REST_SavedVolunteerApplicationForm } from '@/types/VolunteerApplicationForm';
import logError from '@/common/logError';
import { NationalOffice } from '@/common/context/offices';
import FirstTimeTips from './FirstTimeTips';
import 'react-loading-skeleton/dist/skeleton.css';
import ApplicationForm from '@/features/common/forms/applicationForm';

import ViewApplicationForm from '@/features/common/viewForms/applicationForm/ViewApplicationForm';
import dynamic from 'next/dynamic';

// Dynamically import PDFDownloadLink to ensure it is only loaded on the client side
const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink), { ssr: false });
const BlobProvider = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.BlobProvider), { ssr: false });

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer), {
    ssr: false
});

const Page = ({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [isFirstTimeOnForm, setIsFirstTimeOnForm] = useState(false);
    const [viewMyForm, setViewMyForm] = useState(false);
    const [isPdfReady, setIsPdfReady] = useState(false);
    const dashboardUser = useDashboardUser();
    const router = useRouter();
    const pageTransition = usePageTransition();

    const type = repo?.type || null;
    const formSubmitted = repo?.formSubmitted || false;

    useEffect(() => {
        const ref = dashboardUser.ref;
        if (ref == undefined) {
            router.push('/apply');
            return;
        }
        setIsFirstTimeOnForm(repo?.isFirstTimeOnForm || false);

        // End page transition after component mounts and data is loaded
        // Timing matches the slide animation duration
        if (repo) {
            setTimeout(() => {
                pageTransition.endTransition();
            }); // Match the slide animation duration + buffer
        }
    }, [dashboardUser, repo]);
    const handleContinueOnFirstTime = async () => {
        if (!dashboardUser.ref) return;
        await postIsFirstTime(dashboardUser.ref);
        setIsFirstTimeOnForm(false);
    };
    return (
        <>
            {formSubmitted ? (
                <>
                    <>
                        <div className="">
                            <div>Thank you for submitting {type} application form.</div>
                            {viewMyForm ? (
                                <>
                                    <button className="mt-4 p-2 bg-red-500 text-white rounded-full w-10 h-10" onClick={() => setViewMyForm(false)}>
                                        ✕
                                    </button>
                                    <PDFViewer width="80%" height="80%">
                                        <ViewApplicationForm record={repo?.submittedFormRecord} />
                                    </PDFViewer>
                                </>
                            ) : (
                                <>
                                    {/* <button className="btn" onClick={() => setViewMyForm(true)}>
                                        View Your Response
                                    </button> */}
                                    <BlobProvider document={<ViewApplicationForm record={repo?.submittedFormRecord} />}>
                                        {({ blob, url, loading, error }) => {
                                            if (loading) {
                                                return (
                                                    <div className="btn bg-gray-400 cursor-not-allowed flex items-center justify-center">
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                        Processing PDF...
                                                    </div>
                                                );
                                            }
                                            if (error) {
                                                return <div className="btn bg-red-500 cursor-not-allowed">Error generating PDF</div>;
                                            }
                                            if (blob && url) {
                                                return (
                                                    <a href={url} download="application_form.pdf" className="btn">
                                                        Download Your Response
                                                    </a>
                                                );
                                            }
                                            return <div className="btn bg-gray-400 cursor-not-allowed">Preparing PDF...</div>;
                                        }}
                                    </BlobProvider>
                                    {/* TODO: send via email?
                                    <div>
                                        <div className="mt-4">Send Your Response to:</div>
                                        <input placeholder="example@mail.com" />
                                        <button className="btns">Send</button>
                                    </div> */}
                                </>
                            )}
                            <Link href="/apply" className="btn">
                                Go to Top
                            </Link>
                        </div>
                    </>
                </>
            ) : (
                <>
                    {isFirstTimeOnForm ? (
                        <FirstTimeTips type={type} handleContinueOnFirstTime={handleContinueOnFirstTime} />
                    ) : (
                        <ApplicationForm repo={repo} />
                    )}
                </>
            )}
        </>
    );
};

// Export the component for use in other files
export default Page;

type Repo = {
    isFirstTimeOnForm: boolean;
    type: string | null;
    formSubmitted: boolean;
    office: NationalOffice;
    prefilledFormRecord: REST_VolunteerApplicationForm | null;
    submittedFormRecord: REST_VolunteerApplicationForm | null;
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
                app: OnlineVolunteerApplicationAppID as string,
                id: cookies.ref
            })
            .catch((e) => {
                throw new Error('resp:' + e);
            });
        const resp2 = await client.record
            .getAllRecords<REST_SavedVolunteerApplicationForm>({
                app: VolunteerApplicationAppID as string,
                condition: `ref="${cookies.ref}" and currentStep = "Complete"`
            })
            .catch((e) => {
                throw new Error('resp2:' + e);
            });
        const resp3 = await client.record
            .getAllRecords<REST_SavedVolunteerApplicationForm>({
                app: VolunteerApplicationAppID as string,
                condition: `ref="${cookies.ref}" and currentStep != "Complete"`
            })
            .catch((e) => {
                throw new Error('resp2:' + e);
            });
        let prefilledFormRecord = resp3[0] ? resp3[0] : null;
        // check if form is already submitted
        if (resp2.length > 0) {
            if (resp.record['formSubmission'].value.findIndex((arr) => arr == 'Application Form Completed') == -1) {
                // check if form is submitted
                if (resp2[0]) {
                    await client.record.updateRecord({
                        app: OnlineVolunteerApplicationAppID as string,
                        id: cookies.ref,
                        record: {
                            formSubmission: { value: [...resp.record['formSubmission'].value, 'Application Form Completed'] }
                        }
                    });
                    resp = await client.record.getRecord<REST_OnlineVolunteerApplication>({
                        app: OnlineVolunteerApplicationAppID as string,
                        id: cookies.ref
                    });
                }
            }
        }
        const repo: Repo = {
            isFirstTimeOnForm: resp.record['isFirstTimeOnForm'].value == 'true',
            type: resp.record['type'].value || null,
            formSubmitted: resp.record['formSubmission'].value.findIndex((arr) => arr == 'Application Form Completed') > -1,
            office: resp.record['office'].value,
            prefilledFormRecord: prefilledFormRecord,
            submittedFormRecord: resp2[0] || null
        };
        // Pass data to the page via props
        return { props: { repo } };
    } catch (e: any) {
        logError(e, e.errors || null, 'apply/form/getServerSideProps');
        return { props: {} };
    }
}) satisfies GetServerSideProps<{ repo: Repo } | {}>;
