'use client';
import Link from 'next/link';
import SubmitDocument from '@/features/common/documents/SubmitDocument';

const Passport = () => {
    const Help = () => (
        <Link href="./passport/example" className="link">
            Passport Copy Requirements
        </Link>
    );
    return (
        <>
            <SubmitDocument document="passport" title="Please Upload Copy of Your Passport" Help={Help}></SubmitDocument>
        </>
    );
};
export default Passport;
