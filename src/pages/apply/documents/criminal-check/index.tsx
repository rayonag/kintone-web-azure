'use client';
import Link from 'next/link';
import SubmitDocument from '@/features/common/documents/SubmitDocument';
import useUserStore from '@/features/common/store';

const CriminalCheck = () => {
    const office = useUserStore((state) => state.nationalOffice);
    const Help = () => (
        <Link href="./criminal-check/example" className="link">
            {office == 'USA' ? 'What is FBI Criminal Background Check?' : 'What is Criminal Check?'}
        </Link>
    );
    return (
        <>
            <SubmitDocument
                document="criminalCheck"
                title={`Please Upload Your ${office == 'USA' ? 'FBI Criminal Background Check' : 'Criminal Check document'}`}
                Help={Help}
            ></SubmitDocument>
        </>
    );
};
export default CriminalCheck;
