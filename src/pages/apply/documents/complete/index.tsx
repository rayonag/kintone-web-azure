'use client';

import Layout from './Layout';
import Link from 'next/link';
import GreenCheckMark from '@/components/icons/GreenCheckMark';
const Complete = () => {
    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-screen  text-white overflow-hidden">
                <GreenCheckMark />
                <div className="text-2xl">Document Submitted!</div>
                <Link href="/apply/documents" className="btn">
                    Go to Top
                </Link>
            </div>
        </Layout>
    );
};
export default Complete;
