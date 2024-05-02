'use client';
import { useEffect, useState, useCallback } from 'react';

import Layout from './Layout';

import Link from 'next/link';
import HealthQuestionnaire from '@/components/health-questionnaire/form/Form';
import { useDashboardUser } from '@/common/context/dashboardUser';
import fetchUserApplicationMaster from '@/common/fetchUserApplicationMaster';
import { KintoneUserName, KintonePassword, VolunteerApplicationMasterAppID } from '@/common/env';
import { REST_VolunteerApplicationMaster } from '@/types/VolunteerApplicationMaster';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

const Dashboard = ({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { dashboardUser } = useDashboardUser();
    const formSubmitted = repo?.formSubmitted;
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
                {formSubmitted ? (
                    <>
                        <div>Thank you for submitting Personal Health Questionnaire.</div>
                        <Link href="/apply" className="btn">
                            Go to Top
                        </Link>
                    </>
                ) : (
                    <HealthQuestionnaire />
                )}
            </div>
        </Layout>
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
    console.log('resp', resp);
    const repo: Repo = { formSubmitted: resp.record['formSubmission'].value.findIndex((arr) => arr == 'Personal Health Questionaire') > -1 };
    // Pass data to the page via props
    return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: Repo } | {}>;
