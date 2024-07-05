'use client';

import Link from 'next/link';

const Example_RecentPhoto = () => {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen pt-10 text-white overflow-hidden">
            <section className="my-4 w-4/5 grow md:w-1/3">Criminal Background Check Document Example & Requirement:</section>
            <section className="my-4 w-4/5 grow md:w-1/3">
                Every country has different requirement. Make sure you will contact your national office for more details.
            </section>
            <section className="my-4 w-4/5 grow md:w-1/3">Needs Apostille?</section>
            <div className="flex justify-center">
                <Link href="/apply/documents/criminal-check" className="btn">
                    Back
                </Link>
            </div>
        </div>
    );
};
export default Example_RecentPhoto;
