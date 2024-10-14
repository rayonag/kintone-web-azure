'use client';

import useUserStore from '@/features/common/store';
import Link from 'next/link';

const Example_CriminalCheck = () => {
    const office = useUserStore((state) => state.nationalOffice);
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen pt-10 text-white overflow-hidden">
            <section className="my-4 w-4/5 grow md:w-1/3">Criminal Background Check Document Requirement:</section>
            {office == 'USA' && (
                <>
                    <section className="my-4 w-4/5 grow md:w-1/3">
                        All individuals wishing to serve as a volunteer in Israel for longer than three months are required to submit with their
                        completed application:
                    </section>
                    <section className="my-4 w-4/5 grow md:w-1/3">1.FBI Criminal Background Check and </section>
                    <section className="my-4 w-4/5 grow md:w-1/3">2.Apostille Verification</section>
                    <section className="my-4 w-4/5 grow md:w-1/3">
                        The easiest and quickest way to accomplish step 1 is by using the FBI-approved channeler service, National Background
                        Information. You should receive your FBI CBC report through the National Background Information agency in approximately one
                        week.
                    </section>
                    <section className="my-4 w-4/5 grow md:w-1/3">
                        Please note: There are other FBI approved channeler services, but they only provide an on- line digital report. Israel
                        requires a printed official report on FBI letterhead, watermarked paper, with a signature and seal. At this time, National
                        Background Information is the only service which will meet these requirements.
                    </section>
                    <section className="my-4 w-4/5 grow md:w-1/3">
                        On their website you will find detailed instructions, payment and submission requirements, and all needed forms. Detailed list
                        of the steps required:{' '}
                        <Link className="underline text-blue-500" target="_blank" href="https://www.nbinformation.com/order.php">
                            https://www.nbinformation.com/order.php
                        </Link>
                    </section>
                    <section className="my-4 w-4/5 grow md:w-1/3">
                        Once you’ve received your FBI Criminal Background Check in the mail, you need to apply for step 2, an apostille verification
                        through the U.S. State Department.
                    </section>
                    <section className="my-4 w-4/5 grow md:w-1/3">
                        The steps required to apply for an apostille verification of your FBI CBC can be found here:
                    </section>
                    <section className="my-4 w-4/5 grow md:w-1/3">
                        <Link
                            className="underline text-blue-500"
                            target="_blank"
                            href="https://travel.state.gov/content/travel/en/replace-certify-docs/authenticate-your-document/requesting-authentication-services.html"
                        >
                            https://travel.state.gov/content/travel/en/replace-certify-docs/authenticate-your-document/
                            requesting-authentication-services.html
                        </Link>
                    </section>
                    <section className="my-4 w-4/5 grow md:w-1/3">
                        Processing time appears to be 11 weeks, however recently volunteers received their’s in about a month.
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
