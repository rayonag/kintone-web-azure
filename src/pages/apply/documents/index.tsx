'use client';
// Import necessary modules from React
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDashboardUser } from '@/common/context/dashboardUser';
import GreenCheckMark from '@/components/icons/GreenCheckMark';
import useUserStore from '@/features/common/store';
import ArrowUpRight from '@/components/icons/ArrowUpRight';
import logError from '@/common/logError';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { parseCookies } from 'nookies';

// Define the functional component Page
const Page: React.FC = ({ isZealous }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const dashboardUser = useDashboardUser();
    const loginUser = dashboardUser;
    const user = useUserStore((state) => state);
    const Check = () => (
        <div className="absolute right-[-2.5rem]">
            <GreenCheckMark height={30} />
        </div>
    );
    console.log('loginUser.documents', user);
    const isSubmitted = (document: string) => user.documents?.includes(document);
    const office = useUserStore((state) => state.nationalOffice);
    const type = useUserStore((state) => state.applicationType);
    // const requiredDocumentsCount = () => {
    //     if (!type || !office) return '-';
    //     if (office == 'USA') {
    //         if (type == 'Short Term') return 5;
    //         if (type == 'Long Term' || type == 'Zealous') return 6;
    //     } else {
    //         if (type == 'Short Term') return 4;
    //         if (type == 'Long Term' || type == 'Zealous') return 5;
    //     }
    // };
    const uploadsArray = office == 'USA' ? ['Passport', 'Recent Photo', 'Social Security Card'] : ['Passport', 'Recent Photo'];
    const medicalFormArray = ['Medical Status Form', "Doctor's Letter"];
    const criminalCheckArray = ['Criminal Check', 'Criminal Check Apostille'];

    if (!office) return <></>;
    return (
        <>
            <div className="relative flex flex-col items-center justify-center min-h-[95vh] text-white overflow-hidden">
                {/* Content */}
                <div className="relative flex flex-col items-center justify-center text-center">
                    <h1 className="text-2xl mt-12 mb-8">Documents Submission</h1>
                    <h1 className="text-xl mb-4">
                        {user.documents?.length}/{uploadsArray.length + medicalFormArray.length + criminalCheckArray.length} Completed
                    </h1>
                    <div className="relative flex flex-col items-center justify-center text-center w-[30rem] bg-opacity-20 bg-gray-50 p-8 m-4 rounded-xl">
                        <div className="flex">
                            <div className="flex self-center border-b-2 border-white w-8" />
                            <div className="flex self-center m-4 text-xl">
                                Uploads {uploadsArray.filter((element) => user.documents?.includes(element)).length}/{uploadsArray.length} Completed
                            </div>
                            <div className="flex self-center border-b-2 border-white w-8" />
                        </div>
                        <div className="relative flex items-center">
                            <Link href="./documents/passport" className="btn">
                                Copy of Passport
                            </Link>
                            {isSubmitted('Passport') && <Check />}
                        </div>

                        <div className="relative flex items-center">
                            <Link href="./documents/recent-photo" className="btn">
                                Recent Photo
                            </Link>
                            {isSubmitted('Recent Photo') && <Check />}
                        </div>
                        {office == 'USA' && (
                            <div className="relative flex items-center">
                                <Link href="./documents/social-security-card" className="btn">
                                    Social Security Card
                                </Link>
                                {isSubmitted('Social Security Card') && <Check />}
                            </div>
                        )}
                        {/* <h1 className="text-xl my-10">
                            {loginUser.documents?.length || '-'}/{requiredDocumentsCount()} Completed
                        </h1> */}
                    </div>
                    <div className="relative flex flex-col items-center justify-center text-center w-[30rem] bg-opacity-20 bg-gray-50 p-8 m-4 rounded-xl">
                        <div className="flex">
                            <div className="flex self-center border-b-2 border-white w-8" />
                            <div className="flex self-center m-4 text-xl">
                                Medical Form {medicalFormArray.filter((element) => user.documents?.includes(element)).length}/
                                {medicalFormArray.length} Completed
                            </div>
                            <div className="flex self-center border-b-2 border-white w-8" />
                        </div>
                        <div className="flex justify-center mt-4">
                            <Link href="./documents/medical-form/example" className="flex hover:text-blue-400 hover:to-blue-100">
                                How to complete Medical Form?
                                <ArrowUpRight />
                            </Link>
                        </div>

                        <div className="relative flex items-center">
                            <Link href="./documents/medical-form" className="btn">
                                Medical Status Form
                            </Link>
                            {isSubmitted('Medical Status Form') && <Check />}
                        </div>
                        <div className="flex justify-center">
                            <a href="/files/Medical Form 2022.pdf" download="Medical Status Form.pdf" className="link">
                                Download Medical Status Form
                            </a>
                        </div>
                        <div className="relative flex items-center">
                            <Link href="./documents/doctor-letter" className="btn">
                                Doctor's Letter
                            </Link>
                            {isSubmitted("Doctor's Letter") && <Check />}
                        </div>
                        <div className="flex justify-center">
                            <a href="/files/Sample Medical Letter.pdf" download className="link">
                                Download Sample Doctor's Letter
                            </a>
                        </div>
                    </div>
                    {type == 'Short Term' || (
                        <div className="relative flex flex-col items-center justify-center text-center w-[30rem] bg-opacity-20 bg-gray-50 p-8 m-4 rounded-xl">
                            <div className="flex">
                                <div className="flex self-center border-b-2 border-white w-8" />
                                <div className="flex self-center m-4 text-xl">
                                    Criminal Check {criminalCheckArray.filter((element) => user.documents?.includes(element)).length}/
                                    {criminalCheckArray.length} Completed
                                </div>
                                <div className="flex self-center border-b-2 border-white w-8" />
                            </div>
                            <div className="flex justify-center mt-4">
                                <Link href="./documents/criminal-check/example" className="flex hover:text-blue-400 hover:to-blue-100">
                                    How to complete Criminal Check?
                                    <ArrowUpRight />
                                </Link>
                            </div>

                            <>
                                <div className="relative flex items-center">
                                    <Link href="./documents/criminal-check" className="btn">
                                        {office == 'USA' ? 'FBI Criminal Background Check' : 'Criminal Check'}
                                    </Link>
                                    {isSubmitted('Criminal Check') && <Check />}
                                </div>
                                <div className="relative flex items-center">
                                    <Link href="./documents/criminal-check-apostille" className="btn">
                                        {office == 'USA' ? 'FBI Criminal Background Check Apostille' : 'Criminal Check Apostille'}
                                    </Link>
                                    {isSubmitted('Criminal Check Apostille') && <Check />}
                                </div>
                            </>
                        </div>
                    )}
                    <div className="relative flex items-center">
                        <Link href="/contact" className="btn">
                            Needs Help? Contact Us
                        </Link>
                    </div>
                    <div className="relative flex items-center mb-8">
                        <Link href="/apply" className="btn">
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

// Export the component for use in other files
export default Page;

type Repo = {
    selectedOption: any;
};
export const getServerSideProps = (async (context) => {
    try {
        const cookies = parseCookies(context);
        // Pass data to the page via props
        return { props: { isZealous: cookies.isZealous || false } };
    } catch (e) {
        logError(e, context, 'getServerSideProps');
        return { props: {} };
    }
}) satisfies GetServerSideProps<{ repo: Repo } | {}>;
