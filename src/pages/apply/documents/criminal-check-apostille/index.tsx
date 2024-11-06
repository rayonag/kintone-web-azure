'use client';
import Link from 'next/link';
import SubmitDocument from '@/features/common/documents/SubmitDocument';
import useUserStore from '@/features/common/store';

const CriminalCheck = () => {
    const office = useUserStore((state) => state.nationalOffice);
    const Help = () => (
        <Link href="./criminal-check-apostille/example" className="link">
            {office == 'USA' ? 'What is FBI Criminal Background Check Apostille?' : 'What is Criminal Check Apostille?'}
        </Link>
    );
    return (
        <>
            <SubmitDocument
                document="criminalCheckApostille"
                title={`Please Upload Your ${office == 'USA' ? 'FBI Criminal Background Check Apostille' : 'Criminal Check Apostille'}`}
                Help={Help}
            ></SubmitDocument>
        </>
    );
};
export default CriminalCheck;
