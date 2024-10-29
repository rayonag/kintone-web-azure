import SubmitDocument from '@/features/common/documents/SubmitDocument';
import Link from 'next/link';
import React from 'react';

const MedicalForm = () => {
    const Help = () => (
        <Link href="./medical-form/example" className="link">
            How to complete Medical Status Form?
        </Link>
    );
    return (
        <>
            <SubmitDocument document="medicalStatusForm" title="Please Upload Medical Status Form" Help={Help}></SubmitDocument>
        </>
    );
};

export default MedicalForm;
