import Image from 'next/image';
import { Archivo_Black } from 'next/font/google';

const gfont = Archivo_Black({ subsets: ['latin'], weight: '400' });

export default function Component() {
    return (
        <div className="bg-sky-100 min-h-screen p-8 text-black overflow-auto">
            <div className="relative flex max-w-6xl mx-auto shadow-lg rounded-lg border-4 border-white">
                {/* <div className="absolute w-[95%] h-[95%] p-[5%] border-4 border-blue-200"></div> */}
                <div className="grid md:grid-cols-2 gap-0">
                    {/* Left Column */}
                    <div>
                        <div className="p-6 border-4 border-white">
                            <span className="text-3xl font-script italic">the </span>
                            <span className={`${gfont.className} text-5xl`}>ZEALOUS</span>
                            <h2 className="text-3xl font-script italic">Israel Project</h2>
                            <h3 className="text-2xl font-bold">Financial Obligation Policy</h3>
                        </div>
                        <div className="p-6 border-4 border-white bg-green-200 text-left">
                            <p className="text-sm mb-4">
                                Please read this document carefully to ensure you understand your financial commitment. Choose your preferred payment
                                option and initial in the relevant box, then sign and date at the bottom.
                            </p>

                            <p className="text-sm mb-4">
                                The total cost of the Zealous Israel Project beginning July 21, 2024 and ending June 20, 2025 is US $7,995. Some
                                portion of this amount is due by June 21, 2024, depending on the payment option chosen.
                            </p>

                            <p className="text-sm underline mb-4">
                                All payments and monthly support monies must be given or sent directly to your national office. These arrangements
                                will be made upon your acceptance to the program and can be done through debit/credit card.
                            </p>

                            <div className="mb-4">
                                <h4 className="text-xl font-bold mb-2">Price Includes:</h4>
                                <div className="text-sm space-y-1">
                                    <div>One-year furnished housing in gender-separate, shared accommodations (two or three people per room).</div>
                                    <div>
                                        A food allowance to shop for groceries and prepare meals together. The food allowance will be for three meals
                                        per day.
                                    </div>
                                    <div>A pubdivc transportation pass for travel in Jerusalem.</div>
                                    <div>All expenses for program-related events, activities, studies and travel.</div>
                                    <div>
                                        The Call to Zion tour, a twelve-day Israel experience for young adults. This includes accommodations, most
                                        meals and travel in Israel.
                                    </div>
                                    <div>
                                        The Bridges for Peace Institute of Israel Studies, a two-week training seminar in 2025, featuring key speakers
                                        from both the Jewish and Christian worlds.
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-xl font-bold mb-2">Not Included:</h4>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    <li>Airfare to and from Israel</li>
                                    <li>Spending money for personal items</li>
                                    <li>Three lunches during the 12-day tour (about US $60 total)</li>
                                    <li>Visa fees before beginning the program</li>
                                    <li>Medical insurance (required)</li>
                                </ul>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-xl font-bold mb-2">Refunds:</h4>
                                <p className="text-sm">
                                    The funds received for participation in the Zealous Israel Project have been evaluated and set to provide a
                                    quality experience. The initial overhead and expenditures for the program are incurred in the beginning phase of
                                    the Zealous Israel Project. Refunds are given only due to personal hardship and in approved circumstances. Bridges
                                    for Peace will retain the US $500 nonrefundable deposit in all cases except for those involving extreme
                                    circumstances (for instance cancellation of the ZProject due to COVID-19). Please note that the Israeli government
                                    may impose restrictions on travel, entry into Israel or general activities at any time before or during your
                                    volunteer service that could affect the ZProject program and your time with the ZProject. Neither Bridges for
                                    Peace nor Zealous can be held accountable for the changing restrictions, but we will do our best to ensure the
                                    success of the program. In case you are unable to enter Israel due to COVID-related restrictions, you will receive
                                    a refund for your tuition, minus the US $500 down payment.
                                </p>
                            </div>

                            <p className="text-sm italic mb-4">
                                I have read and understand my financial commitment to Bridges for Peace upon acceptance to the Zealous Israel Project.
                            </p>

                            <div className="flex justify-between">
                                <div>Signature: ____________________</div>
                                <div>Date: ____________________</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="p-6 text-left">
                        <Image
                            src="/images/zealous-image.jpg"
                            alt="Group photo of Zealous Israel Project participants"
                            width={600}
                            height={300}
                            className="w-full h-auto rounded-lg mb-6"
                        />

                        <div className="mb-4">
                            <h4 className="text-xl font-bold mb-2">Payment Options</h4>
                            <p className="text-sm">
                                Please select the payment option that works best for you and initial in the relevant box. All payment options will be
                                arranged through your national office and will be finalized before arrival to Israel. All prices are shown in US
                                dollars.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-sky-200 border border-sky-300 p-4 rounded">
                                <h5 className="font-bold">Option 1</h5>
                                <p className="text-sm">
                                    US $500 nonrefundable deposit due immediately upon acceptance. This is used to secure your place in the housing
                                    facilities.
                                </p>
                                <p className="text-sm font-bold">US $7,495 due June 21, 2024</p>
                            </div>

                            <div className="bg-sky-200 border border-sky-300 p-4 rounded">
                                <h5 className="font-bold">Option 2</h5>
                                <p className="text-sm">
                                    US $500 nonrefundable deposit due immediately upon acceptance. This is used to secure your place in the housing
                                    facilities.
                                </p>
                                <p className="text-sm font-bold">US $4,000 due June 21, 2024</p>
                                <p className="text-sm">
                                    Seven US $500 monthly payments. This program requires automatic withdrawal from a checking debit or credit card
                                    account. This must be set up through your national office.
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <p>US $500 due Aug. 1, 2024</p>
                                    <p>US $500 due Nov. 1, 2024</p>
                                    <p>US $500 due Sept. 1, 2024</p>
                                    <p>US $500 due Dec. 1, 2024</p>
                                    <p>US $500 due Oct. 1, 2024</p>
                                    <p>US $500 due Jan. 1, 2025</p>
                                    <p>US $495 due Feb. 1, 2025</p>
                                </div>
                            </div>

                            <div className="bg-sky-200 border border-sky-300 p-4 rounded">
                                <h5 className="font-bold">Option 3</h5>
                                <p className="text-sm">
                                    US $500 nonrefundable deposit due immediately upon acceptance. This is used to secure your place in the housing
                                    facilities.
                                </p>
                                <p className="text-sm font-bold">US $3,995 due June 21, 2024</p>
                                <p className="text-sm">
                                    Ten US $350 monthly payments. This program requires automatic withdrawal from a checking debit or credit card
                                    account. This must be set up through your national office.
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <p>US $350 due Aug. 1, 2024</p>
                                    <p>US $350 due Jan. 1, 2025</p>
                                    <p>US $350 due Sept. 1, 2024</p>
                                    <p>US $350 due Feb. 1, 2025</p>
                                    <p>US $350 due Oct. 1, 2024</p>
                                    <p>US $350 due Mar. 1, 2025</p>
                                    <p>US $350 due Nov. 1, 2024</p>
                                    <p>US $350 due Apr. 1, 2025</p>
                                    <p>US $350 due Dec. 1, 2024</p>
                                    <p>US $350 due May 1,2025</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <Image src="/images/zealous-logo-white.png" alt="Zealous 82 Logo" width={100} height={100} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
