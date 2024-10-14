'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDashboardUser } from '@/common/context/dashboardUser';
import { KintoneUserName, KintonePassword, VolunteerApplicationMasterAppID, VolunteerApplicationAppID } from '@/common/env';
import { REST_OnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import { KintoneRecordField, KintoneRestAPIClient } from '@kintone/rest-api-client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { parseCookies } from 'nookies';
import postIsFirstTime from '@/common/checklist/postIsFirstTime';
import Link from 'next/link';
import Layout_fadeIn from '@/styles/Layout_fadeIn';
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

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer), {
    ssr: false
});

const Page = ({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [isFirstTimeOnForm, setIsFirstTimeOnForm] = useState(false);
    const [viewMyForm, setViewMyForm] = useState(false);
    const dashboardUser = useDashboardUser();
    const router = useRouter();

    const type = repo?.type || null;
    const formSubmitted = repo?.formSubmitted || false;

    useEffect(() => {
        const ref = dashboardUser.ref;
        if (ref == undefined) {
            router.push('/apply');
            return;
        }
        setIsFirstTimeOnForm(repo?.isFirstTimeOnForm || false);
    }, [dashboardUser]);
    const handleContinueOnFirstTime = async () => {
        if (!dashboardUser.ref) return;
        await postIsFirstTime(dashboardUser.ref);
        setIsFirstTimeOnForm(false);
    };
    return (
        <>
            {formSubmitted ? (
                <>
                    <Layout_fadeIn key="page">
                        <div className="flex flex-col items-center justify-center h-[95vh]">
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
                                    <PDFDownloadLink
                                        document={<ViewApplicationForm record={repo?.submittedFormRecord} />}
                                        fileName="application_form.pdf"
                                    >
                                        <div className="btn">Download Your Response</div>
                                    </PDFDownloadLink>
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
                    </Layout_fadeIn>
                </>
            ) : (
                <>
                    {isFirstTimeOnForm ? (
                        <>
                            <FirstTimeTips type={type} handleContinueOnFirstTime={handleContinueOnFirstTime} />
                        </>
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

type REST_TempVolunteerApplicationForm = REST_VolunteerApplicationForm & { keepingTempRecord: KintoneRecordField.RadioButton };
type Repo = {
    isFirstTimeOnForm: boolean;
    type: string | null;
    formSubmitted: boolean;
    office: NationalOffice;
    prefilledFormRecord: REST_TempVolunteerApplicationForm | null;
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
                app: VolunteerApplicationMasterAppID as string,
                id: cookies.ref
            })
            .catch((e) => {
                throw new Error('resp:' + e);
            });
        const resp2 = await client.record
            .getAllRecords<REST_SavedVolunteerApplicationForm>({
                app: VolunteerApplicationAppID as string,
                condition: `ref="${cookies.ref}"`
            })
            .catch((e) => {
                throw new Error('resp2:' + e);
            });
        const resp3 = await client.record
            .getAllRecords<REST_TempVolunteerApplicationForm>({
                app: 235, //TempVolunteerApplicationAppID as string,
                condition: `ref="${cookies.ref}" and keepingTempRecord in ("true")`,
                orderBy: '$id desc'
            })
            .catch((e) => {
                throw new Error('resp3:' + e);
            });
        let prefilledFormRecord = resp3[0] ? await resp3[0] : null;
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
