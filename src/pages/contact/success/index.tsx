'use client';
import Link from 'next/link';
import GreenCheckMark from '@/components/icons/GreenCheckMark';
import { useDashboardUser } from '@/common/context/dashboardUser';
import Layout_fadeIn from '@/styles/Layout_fadeIn';

const Complete = () => {
    const { dashboardUser, setDashboardUser } = useDashboardUser();
    const username = dashboardUser.username;

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
