'use client';

import { KintoneUserName, KintonePassword, VolunteerApplicationMasterAppID, PersonalHealthQuestionnaireAppID } from '@/common/env';
import { REST_OnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import Layout_fadeIn from '@/styles/Layout_fadeIn';
import logError from '@/common/logError';
import FinancialObligation from '@/features/common/forms/financialObligation';
import Layout_fadeIn_zealous from '@/styles/Layout_fadeIn_zealous';

const Dashboard = ({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <Layout_fadeIn_zealous key="page">
                <div className="flex flex-col items-center justify-center min-h-[95vh] w-full overflow-hidden">
                    <FinancialObligation repo={repo} />
                </div>
            </Layout_fadeIn_zealous>
        </>
    );
};
export default Dashboard;

type Repo = {
    selectedOption: any;
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
            .getAllRecords({
                app: 82, // financial obligation app
                condition: `ref=${cookies.ref}`
            })
            .catch((e) => {
                throw new Error('resp:' + e);
            });
        const selectedOption = resp[0]?.paymentOption.value || null;
        const repo: Repo = {
            selectedOption
        };
        // Pass data to the page via props
        return { props: { repo } };
    } catch (e) {
        logError(e, context, 'getServerSideProps');
        return { props: {} };
    }
}) satisfies GetServerSideProps<{ repo: Repo } | {}>;
