'use client';
import Link from 'next/link';
import GreenCheckMark from '@/components/icons/GreenCheckMark';

const Complete = () => {
    return (
        <>
            <div className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden">
                <GreenCheckMark />
                <div className="text-2xl m-5">Thank you for contacting us</div>
                <div className="text-2xl">We will endeaver to get back to you within 3 business days</div>
                <Link href="/apply" className="btn">
                    Go to Top
                </Link>
            </div>
        </>
    );
};
export default Complete;
