'use client';

import useUserStore from '@/features/common/store';
import Link from 'next/link';

const Example_CriminalCheck = () => {
    const office = useUserStore((state) => state.nationalOffice);
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen pt-10 text-white overflow-hidden">
            <section className="my-4 w-4/5 grow md:w-1/3">Criminal Background Check Document Example & Requirement:</section>
            {office == 'USA' && (
                <>
                    <section className="my-4 w-4/5 grow md:w-1/3">If you are U.S. citizen...</section>
                    <section className="my-4 w-4/5 grow md:w-1/3">
                        More Information found{' '}
                        <Link
                            className="underline text-blue-500"
                            target="_blank"
                            href="https://travel.state.gov/content/travel/en/international-travel/while-abroad/criminal-record-checks.html"
                        >
                            here
                        </Link>
                    </section>
                </>
            )}
            <div className="flex justify-center">
                <Link href="/apply/documents/criminal-check" className="btn">
                    Back
                </Link>
            </div>
        </div>
    );
};
export default Example_CriminalCheck;
