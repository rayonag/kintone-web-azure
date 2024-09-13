'use client';
import Link from 'next/link';
import SubmitDocument from '@/features/common/documents/SubmitDocument';

const DoctorLetter = () => {
    const Help = () => (
        <Link href="./doctor-letter/example" className="link">
            What is Doctor's Letter?
        </Link>
    );
    return (
        <>
            <SubmitDocument document="doctorLetter" title="Please Upload Doctor's Letter" Help={Help}></SubmitDocument>
        </>
    );
};
export default DoctorLetter;
