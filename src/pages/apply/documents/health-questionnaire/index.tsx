'use client';
import { useEffect, useState, useCallback } from 'react';

import Layout from './Layout';

import Link from 'next/link';
import HealthQuestionnaire from '@/components/health-questionnaire/form/Form';
import { useDashboardUser, setDashboardUser } from '@/common/dashboardUser';

const Dashboard = () => {
    const loginUser = useDashboardUser();
    const setUser = setDashboardUser();
    const username = loginUser.username;

    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
                <HealthQuestionnaire />
            </div>
        </Layout>
    );
};
export default Dashboard;
