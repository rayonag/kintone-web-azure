'use client';
import Link from 'next/link';
import SubmitDocument from '@/components/documents/SubmitDocument';

const CriminalCheck = () => {
    const Help = () => (
        <Link href="./criminal-check/example" className="link">
            What is a Criminal Background Check?
        </Link>
    );
    return (
        <>
            <SubmitDocument document="criminalCheck" title="Please Upload Your Criminal Check document" Help={Help}></SubmitDocument>
        </>
    );
};
export default CriminalCheck;
