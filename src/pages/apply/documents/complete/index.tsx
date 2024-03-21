'use client';
import { useEffect, useState, useCallback } from 'react';

import Layout from './Layout';

import Link from 'next/link';
import GreenCheckMark from '@/components/icons/GreenCheckMark';
import { useDashboardUser, setDashboardUser } from '@/common/dashboardUser';

const Complete = () => {
    const loginUser = useDashboardUser();
    const setUser = setDashboardUser();
    const username = loginUser.username;

    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
                <GreenCheckMark />
                <div className="text-2xl">Your answers were submitted successfully</div>
                <Link href="/documents" className="btn">
                    Go to Top
                </Link>
            </div>
        </Layout>
    );
};
export default Complete;
