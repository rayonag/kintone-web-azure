'use client';

import Layout_fadeIn from '@/styles/Layout_fadeIn';

import Link from 'next/link';
import GreenCheckMark from '@/components/icons/GreenCheckMark';
const Complete = () => {
    return (
        <Layout_fadeIn>
            <div className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden">
                <GreenCheckMark />
                <div className="text-2xl">Selected payment option has been saved</div>
                <Link href="/apply" className="btn">
                    Go to Top
                </Link>
            </div>
        </Layout_fadeIn>
    );
};
export default Complete;
