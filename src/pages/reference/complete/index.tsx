'use client';

import Layout from './Layout';
import Link from 'next/link';
import GreenCheckMark from '@/components/icons/GreenCheckMark';

const Complete = () => {
    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-screen  text-white overflow-hidden">
                <GreenCheckMark />
                <div className="text-2xl">Thank you for sending the Reference Form!</div>
                <div className="m-4 text-xl">You may close this page now</div>
                {/* <Link href="/reference" className="btn">
                    Go to Top
                </Link> */}
            </div>
        </Layout>
    );
};
export default Complete;
