'use client';

import Layout from './Layout';
import Link from 'next/link';
import GreenCheckMark from '@/components/icons/GreenCheckMark';

const Complete = () => {
    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-screen  text-white overflow-hidden">
                <GreenCheckMark />
                <div className="text-2xl">Reference Form Submitted!</div>
            </div>
        </Layout>
    );
};
export default Complete;
