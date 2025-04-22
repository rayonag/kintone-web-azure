'use client';

import { KintoneUserName, KintonePassword, OnlineVolunteerApplicationAppID, PersonalHealthQuestionnaireAppID } from '@/common/env';
import { REST_OnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import logError from '@/common/logError';
import FinancialObligation from '@/features/common/forms/financialObligation';
import Link from 'next/link';

const PrivacyPolicy = () => {
    return (
        <>
            <>
                <div className="flex flex-col h-fit items-center justify-center w-full my-14 leading-6">
                    <div className="w-[350px] md:w-[600px] sm:w-[400px] flex flex-col justify-center items-center shadow-md rounded-lg p-8">
                        <div className="text-2xl font-bold mb-4"> Bridges for Peace privacy notice</div>
                        <div className="text-lg mb-4">
                            Bridges for Peace complies with the following principles regarding the personal information that you record on our online
                            application portal:
                        </div>
                        <div className="text-md my-4 w-4/5">
                            <ul className="list-disc">
                                <li>
                                    <span className="font-bold">Fair and lawful processing</span> - Personal data is processed and used according to
                                    Christian values and relevant national laws for registered non-profit organizations.
                                </li>
                                <li>
                                    <span className="font-bold">Transparency</span> - Personal data is collected and used in a transparent manner. You
                                    are informed about the purpose of collecting your personal data and how it will be used.
                                </li>
                                <li>
                                    <span className="font-bold"> Purpose limitation</span> - Personal data is only used for recruitment, government
                                    permissions, staff management and wellbeing.
                                </li>
                                <li>
                                    <span className="font-bold">Data minimization</span> - Only relevant personal data is stored.
                                </li>
                                <li>
                                    <span className="font-bold">Accuracy</span> - Relevant personal data is continuously updated.
                                </li>
                                <li>
                                    <span className="font-bold">Data retention</span> - Irrelevant personal data is deleted at the earliest
                                    opportunity.
                                </li>
                                <li>
                                    <span className="font-bold">Confidentiality</span> - Access to personal data is restricted to the Bridges for
                                    Peace staff who process it, IT support staff who manage it, and senior leaders that make decisions on it.
                                </li>
                            </ul>
                        </div>
                        <div className="text-lg my-4">
                            If you have any concerns about how we collect and use your personal data please let us know by selecting{' '}
                            <Link className="link" href="/contact">
                                Contact Us
                            </Link>
                            .
                        </div>
                        <Link href="/apply" className="btn">
                            Back to top
                        </Link>
                    </div>
                </div>
            </>
        </>
    );
};
export default PrivacyPolicy;
