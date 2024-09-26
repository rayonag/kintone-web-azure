'use client';
// Import necessary modules from React
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDashboardUser } from '@/common/context/dashboardUser';
import {
    KintoneUserName,
    KintonePassword,
    VolunteerApplicationMasterAppID,
    VolunteerApplicationAppID,
    TempVolunteerApplicationAppID
} from '@/common/env';
import { REST_OnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import { KintoneRecordField, KintoneRestAPIClient } from '@kintone/rest-api-client';
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
import ApplicationForm from '@/features/common/forms/applicationForm';

import i18n from '@/features/common/forms/healthQuestionnaire/i18n/translations/config';
import ViewApplicationForm from '@/features/common/viewForms/applicationForm/ViewApplicationForm';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer), {
    ssr: false
});

const Page = ({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [ref, setRef] = useState('');
    const [office, setOffice] = useState<NationalOffice | undefined>(undefined);
    const [isFirstTimeOnForm, setIsFirstTimeOnForm] = useState(false);
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
        const office = repo?.office;
        setRef(ref);
        setOffice(office);
        setIsFirstTimeOnForm(repo?.isFirstTimeOnForm || false);
    }, [dashboardUser]);
    const handleContinueOnFirstTime = async () => {
        if (!dashboardUser.ref) return;
        await postIsFirstTime(dashboardUser.ref);
        setIsFirstTimeOnForm(false);
    };
    const [viewMyForm, setViewMyForm] = useState(false);
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
                                        <ViewApplicationForm />
                                    </PDFViewer>
                                </>
                            ) : (
                                <>
                                    <button className="btn" onClick={() => setViewMyForm(true)}>
                                        View Your Response
                                    </button>
                                </>
                            )}

                            {/* {viewMyForm ? (
                                    <ViewMyForm />
                                ) : 
                                (
                                    <button className="btn" onClick={() => setViewMyForm(true)}>
                                        View Your Response
                                    </button>
                                )
                                } */}
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
        // check if not yet
        // const getPrefilledFormURL = (record: REST_SavedVolunteerApplicationForm) => {
        //     let query = '';
        //     Object.keys(record).forEach((key) => {
        //         const typedKey = key as keyof REST_VolunteerApplicationForm;
        //         // ref
        //         if (key === 'ref') {
        //             query += `${key}=${cookies.ref}&`;
        //             return;
        //         }
        //         if (!Array.isArray(record[typedKey].value) || record[typedKey].value.length === 0) {
        //             // if text box, radio, select, number, date
        //             query += `${key}=${record[typedKey].value}&`;
        //             return;
        //         }
        //         if (typeof record[typedKey].value[0] === 'object' && record[typedKey].value[0] !== null) {
        //             // if tables
        //             if (record[typedKey].value[0].value) {
        //                 record[typedKey].value.forEach((table: any, index: number) => {
        //                     Object.keys(table.value).forEach((tableKey) => {
        //                         const typedTableKey = tableKey as keyof REST_VolunteerApplicationForm;
        //                         query += `${key}-${index}-${tableKey}=${table.value[typedTableKey].value}&`;
        //                     });
        //                 });
        //             }
        //             // if files
        //             return;
        //         }
        //         if (typeof record[typedKey].value[0] === 'string') {
        //             // if checkbox array
        //             query += `${key}=${record[typedKey].value.join(',')}&`;
        //             return;
        //         }
        //     });
        //     return `${getIframeLink(resp.record['type'].value)}?${query}`;
        // };
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
        // if (resp.record['returnRef'].value) {
        //     const resp3 = await client.record.getAllRecords<REST_SavedVolunteerApplicationForm>({
        //         app: VolunteerApplicationAppID as string,
        //         condition: `ref=${resp.record['returnRef'].value}`
        //     });
        //     if (resp3) prefilledFormURL = getPrefilledFormURL(resp3[0]);
        // }
        const repo: Repo = {
            isFirstTimeOnForm: resp.record['isFirstTimeOnForm'].value == 'true',
            type: resp.record['type'].value || null,
            formSubmitted: resp.record['formSubmission'].value.findIndex((arr) => arr == 'Application Form Completed') > -1,
            office: resp.record['office'].value,
            prefilledFormRecord: prefilledFormRecord
        };
        // Pass data to the page via props
        return { props: { repo } };
    } catch (e: any) {
        logError(e, e.errors || null, 'apply/form/getServerSideProps');
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
