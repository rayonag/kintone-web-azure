'use client';
import Link from 'next/link';
import SubmitDocument from '@/features/common/documents/SubmitDocument';

const RecentPhoto = () => {
    const Help = () => (
        <Link href="./recent-photo/example" className="link">
            Recent Photo Requirements
        </Link>
    );
    return (
        <>
            <SubmitDocument document="recentPhoto" title="Please Upload Your Recent Photo" Help={Help}></SubmitDocument>
        </>
    );
};
export default RecentPhoto;
