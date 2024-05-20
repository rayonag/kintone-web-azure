'use client';
import Link from 'next/link';
import SubmitDocument from '@/components/documents/SubmitDocument';

const SocialSecurityCard = () => {
    const Help = () => (
        <Link href="./social-security/example" className="link">
            Social Security Card Requirement
        </Link>
    );
    return (
        <>
            <SubmitDocument document="ssn" title="Please Upload Your Social Security Card" Help={Help}></SubmitDocument>
        </>
    );
};
export default SocialSecurityCard;
