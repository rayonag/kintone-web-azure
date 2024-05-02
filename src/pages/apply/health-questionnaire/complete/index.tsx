'use client';

import Layout_fadeIn from '@/styles/Layout_fadeIn';

import Link from 'next/link';
import GreenCheckMark from '@/components/icons/GreenCheckMark';
import { useDashboardUser } from '@/common/context/dashboardUser';
const Complete = () => {
    const { dashboardUser } = useDashboardUser();
    return (
        <Layout_fadeIn>
            <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
                <GreenCheckMark />
                <div className="text-2xl">Your answers were submitted successfully</div>
                <Link href="/apply" className="btn">
                    Go to Top
                </Link>
            </div>
        </Layout_fadeIn>
    );
};
export default Complete;
