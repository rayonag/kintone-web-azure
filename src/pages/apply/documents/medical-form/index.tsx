import SubmitDocument from '@/components/documents/SubmitDocument';
import Link from 'next/link';
import React from 'react';

const MedicalForm = () => {
    const Help = () => (
        <Link href="./medical-form/example" className="link">
            What is Medical Status Form?
        </Link>
    );
    return (
        <>
            <SubmitDocument document="medicalForm" title="Please Upload Medical Status Form" Help={Help}></SubmitDocument>
        </>
    );
};

export default MedicalForm;
