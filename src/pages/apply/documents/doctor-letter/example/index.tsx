'use client';

import Link from 'next/link';

const Example_DoctorLetter = () => {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen pt-10 text-white overflow-hidden">
            <section className="my-4 w-4/5 grow md:w-1/3">
                <div className="text-2xl my-4">Please complete the Medical Status Form by following the instructions below:</div>
                <div className="italic">Note: You may not complete the form on your own. You need to have your doctor fill it out.</div>
                <div>Step 1: Download the Medical Status Form. </div>
                <div className="flex justify-center">
                    <a href="/files/Medical Form 2022.pdf" download="Medical Status Form.pdf" className="btn">
                        Download Medical Status Form
                    </a>
                </div>
                <div>Step 2: Make doctor's appointment. </div>
                <div>Tell them that you have a document that needs to be filled out,</div>
                <div> and for them to write a letter stating you're in a good condition.</div>
            </section>

            <section className="my-4 w-4/5 grow md:w-1/3">
                <div>You will also need your doctor to write the Medical Letter.</div>
                <div>You can download the sample to see the format of the letter.</div>
                <div>NOTE: It must include an official letter header, and must be stamped and signed by the doctor</div>
                <div className="flex justify-center">
                    <a href="/files/Sample Medical Letter.pdf" download className="btn">
                        Download Sample Medical Letter
                    </a>
                </div>
                <div className="flex justify-center">
                    <Link href="/apply/documents/doctor-letter" className="btn">
                        Back
                    </Link>
                </div>
            </section>
        </div>
    );
};
export default Example_DoctorLetter;
