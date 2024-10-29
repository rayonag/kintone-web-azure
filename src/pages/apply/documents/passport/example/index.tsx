'use client';

import PopoverImage from '@/components/images/PopoverImage';
import Image from 'next/image';
import Link from 'next/link';

const Example_Passport = () => {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen pt-10 text-white overflow-hidden">
            <section className="my-4 w-4/5 grow md:w-1/3">
                <PopoverImage imageSrc="/uploads/passport-requirement.webp" altTag="passport" />
                <div className="flex justify-center">
                    <Link href="/apply/documents/passport" className="btn">
                        Back
                    </Link>
                </div>
            </section>
        </div>
    );
};
export default Example_Passport;
