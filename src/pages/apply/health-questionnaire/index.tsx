'use client';
import { useEffect, useState, useCallback } from 'react';

import Link from 'next/link';
import HealthQuestionnaire from '@/components/health-questionnaire/form/Form';
import { KintoneUserName, KintonePassword, VolunteerApplicationMasterAppID } from '@/common/env';
import { REST_VolunteerApplicationMaster } from '@/types/VolunteerApplicationMaster';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import Layout_slideUp from '@/styles/Layout_slideUp';
import Layout_fadeIn from '@/styles/Layout_fadeIn';

const Dashboard = ({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const formSubmitted = repo?.formSubmitted;

    return (
        <>
            {formSubmitted ? (
                <Layout_fadeIn>
                    <div className="flex flex-col items-center justify-center h-[95vh]">
                        <div>Thank you for submitting Personal Health Questionnaire.</div>
                        <Link href="/apply" className="btn">
                            Go to Top
                        </Link>
                    </div>
                </Layout_fadeIn>
            ) : (
                <Layout_fadeIn key="page">
                    <div className="flex flex-col items-center justify-center min-h-[95vh] w-full overflow-hidden">
                        <HealthQuestionnaire />
                    </div>
                </Layout_fadeIn>
            )}
        </>
    );
};
export default Dashboard;

type Repo = {
    formSubmitted: boolean;
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
    //console.log('resp', resp);
    const repo: Repo = { formSubmitted: resp.record['formSubmission'].value.findIndex((arr) => arr == 'Personal Health Questionnaire') > -1 };
    // Pass data to the page via props
    return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: Repo } | {}>;
