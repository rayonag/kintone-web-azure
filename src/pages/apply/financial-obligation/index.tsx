'use client';
import { useEffect, useState, useCallback } from 'react';

import Link from 'next/link';
import HealthQuestionnaire from '@/features/common/forms/healthQuestionnaire';
import {
    KintoneUserName,
    KintonePassword,
    VolunteerApplicationMasterAppID,
    VolunteerApplicationAppID,
    PersonalHealthQuestionnaireAppID
} from '@/common/env';
import { REST_OnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import Layout_slideUp from '@/styles/Layout_slideUp';
import Layout_fadeIn from '@/styles/Layout_fadeIn';
import { REST_SavedVolunteerApplicationForm } from '@/types/VolunteerApplicationForm';
import logError from '@/common/logError';
import FinancialObligation from '@/features/common/forms/financialObligation';

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
                        <FinancialObligation repo={repo} />
                    </div>
                </Layout_fadeIn>
            )}
        </>
    );
};
export default Dashboard;

type Repo = {
    formSubmitted: boolean;
    prefilledFormRecord: any;
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
        const resp = await client.record
            .getRecord<REST_OnlineVolunteerApplication>({
                app: VolunteerApplicationMasterAppID as string,
                id: cookies.ref
            })
            .catch((e) => {
                throw new Error('resp:' + e);
            });
        let prefilledFormRecord = null;
        if (resp.record['returnRef'].value) {
            const resp3 = await client.record
                .getAllRecords<any>({
                    app: PersonalHealthQuestionnaireAppID as string,
                    condition: `ref=${resp.record['returnRef'].value}`
                })
                .catch((e) => {
                    throw new Error('resp3:' + e);
                });
            if (resp3) prefilledFormRecord = resp3[0];
        }
        //console.log('resp', resp);
        const repo: Repo = {
            prefilledFormRecord: prefilledFormRecord,
            formSubmitted: resp.record['formSubmission'].value.findIndex((arr) => arr == 'Personal Health Questionnaire') > -1
        };
        // Pass data to the page via props
        return { props: { repo } };
    } catch (e) {
        logError(e, context, 'getServerSideProps');
        return { props: {} };
    }
}) satisfies GetServerSideProps<{ repo: Repo } | {}>;
