import Link from 'next/link';
import React, { FC, use, useEffect, useRef, useState } from 'react';

type FirstTimeTipsProps = {
    type: string | null;
    handleContinueOnFirstTime: () => void;
};
const FirstTimeTips: FC<FirstTimeTipsProps> = ({ type, handleContinueOnFirstTime }) => {
    const [page, setPage] = useState(0);
    const [haveRead, setHaveRead] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo(0, 0);
        }
    }, [page]);

    const ConfirmType = () => {
        return (
            <>
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="text-3xl m-5">Before you begin...</div>
                    <div className="m-3 mb-8">This is a volunteer application for: {type}</div>
                    <div className="m-3 mb-8">If you're not intending for {type} please let us know</div>
                    <div className="flex justify-center flex-col">
                        <button onClick={() => setPage(1)} className="btn-wide">
                            Next
                        </button>
                        <Link href="/apply" className="btn-wide text-center">
                            Back to Top
                        </Link>
                    </div>
                </div>
            </>
        );
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {page == 0 && <ConfirmType />}
            {page != 0 && (
                <div ref={scrollRef} className="overflow-y-scroll h-[70vh] min-w-80 w-[60vw]">
                    {page == 1 && <DoctrinalStatement />}
                    {page == 2 && <TermsAndConditions />}
                    <div className="flex justify-center flex-col">
                        {page == 1 && (
                            <>
                                <button onClick={() => setPage(2)} className="btn-wide">
                                    Next
                                </button>
                                <Link href="/apply" className="btn-wide text-center">
                                    Back to Top
                                </Link>
                            </>
                        )}
                        {page === 2 && (
                            <>
                                <label>
                                    <input onClick={() => setHaveRead(!haveRead)} checked={haveRead} type="checkbox" className="m-3 text-center" />
                                    <span>I have read and agree with the above</span>
                                </label>
                                <button
                                    onClick={handleContinueOnFirstTime}
                                    aria-disabled={!haveRead}
                                    className={`${!haveRead ? 'btn-disabled-wide pointer-events-none' : 'btn-wide'}`}
                                >
                                    Continue
                                </button>
                                <button onClick={() => setPage(1)} className="btn-wide">
                                    Back
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FirstTimeTips;

const TermsAndConditions = () => {
    return (
        <div className="p-4">
            <section className="mb-5">
                <div className="text-3xl m-5 font-serif italic text-center">BRIDGES FOR PEACEーOUR VISION</div>
                <div className="mb-3 text-2xl">MISSION STATEMENT</div>
                <div className="m-3 mb-8">
                    Bridges For Peace (BFP): Christians supporting Israel and building relationships between Christians and Jews in Israel and around
                    the world.
                </div>
                <div className="mb-3 text-2xl">EXPANDED VISION</div>
                <div className="mb-3">
                    It is our desire to see Christians and Jews working side by side for better understanding and a more secure Israel.
                </div>
                <div className="mb-3">
                    Founded in 1976, Bridges for Peace seeks to be a ministry of hope and reconciliation. Through programs both in Israel and
                    worldwide, we are giving Christians the opportunity to actively express their biblical responsibility before God to be faithful to
                    Israel and the Jewish community.
                </div>
                <div className="mb-3">
                    For too long Christians have been silent. For too long the Jewish community has had to fight its battles alone. It is time
                    Christian individuals and congregations speak up for the people who gave us the Bible.
                </div>
            </section>
            <section className="mb-5">
                <div className="text-3xl m-5 font-serif italic text-center">WE ARE COMMITTED TO THE FOLLOWING GOALS:</div>
                <div className="mb-3">
                    1. To encourage meaningful and supportive relationships between Christians and Jews in Israel and around the world.
                </div>
                <div className="mb-3">
                    2. To educate and equip Christians to identify with Israel, the Jewish people and the biblical/Hebraic foundations of our
                    Christian faith.
                </div>
                <div className="mb-3">
                    3. To bless Israel and the Jewish people in Israel and worldwide through practical assistance, volunteer service and prayer.
                </div>
                <div className="mb-3">
                    4. To communicate Christian perspectives to the attention of Israeli leaders and the Jewish community at large
                </div>
                <div className="mb-8">
                    5. To counter anti-Semitism worldwide and support Israel’s divine, God-given right to exist in her Godgiven land.
                </div>
                <div className="text-3xl m-5 font-serif italic text-center">BASIC VOLUNTEER REQUIREMENTS</div>
                <div className="mb-3 text-2xl">WHO IS A BFP VOLUNTEER?</div>
                <div className="mb-3">
                    The prophets of Israel knew that one day Gentile people would come to the land of Israel and help in its restoration. The prophet
                    Isaiah mentions these Gentiles on several occasions. He refers to them as “servants” in Isaiah 56:6. They are called “servants and
                    handmaids” in Isaiah 14:2. And in Isaiah 61:5, we read, “Strangers shall stand and feed your flocks, and the sons of the foreigner
                    shall be your plowmen and your vinedressers.”
                </div>
                <div className="mb-3">
                    We can see from Scripture that Gentiles do not come to Israel in a high and mighty position, but rather in the position of a
                    servant. Their position is much like that of Ruth of old. She was willing to abase herself to a position lower than that of a
                    servant girl (Ruth 2:13). As a result, God highly exalted her to be the great-grandmother of King David.
                </div>
                <div className="mb-3">
                    There are great numbers of Christians from foreign lands in Israel today who have come here in meekness and humility to serve the
                    Jewish people on behalf of God. In general, the work of volunteers is often the work that others do not wish to do. It is
                    demanding and requires much patience and love. But in the end, it is also greatly rewarding.
                </div>
            </section>
            <section className="mb-5">
                <div className="text-3xl m-5 font-serif italic text-center">A VOLUNTEER WITH BRIDGES FOR PEACE IS REQUIRED TO:</div>
                <div className="mb-3">1. Have a servant’s heart. </div>
                <div className="mb-3">2. Be a committed Christian.</div>
                <div className="mb-3">3. Be at least 18 years of age.</div>
                <div className="mb-3">4. Be in good health.</div>
                <div className="mb-3">5. Be able to speak English.</div>
                <div className="mb-3">6. Have the recommendations of your family, pastor and others in the community.</div>
                <div className="mb-3">
                    7. Have the funds available to cover your food, lodging and other monthly expenses, as well as round trip airfare to and from
                    Israel.
                </div>
                <div className="mb-3">
                    8. Have medical insurance that is valid outside your country in case of accident, injury or illness in Israel. (If necessary, BFP
                    can assist you to purchase a health insurance policy. Additional information is available upon request).
                </div>
                <div className="mb-3">
                    9. Understand that during your term of service with BFP, you are not coming on a tour or a vacation, but you are coming to serve
                    in a volunteer position that is vital to the organization.
                </div>
                <div className="mb-3">
                    10. Understand that the Israeli public perceives you as an ambassador for Jesus Christ and a representative of BFP. The future of
                    our work in Israel depends largely upon this display of Christian character and faithfulness.
                </div>
                <div className="mb-3">11. Live and work in an environment where conditions are diverse due to language and cultural differences.</div>
                <div className="mb-3">12. Understand that luxuries found at “home” may be absent.</div>
            </section>
            <section className="mb-5">
                <div className="mb-3">
                    Thank you for considering BFP as a place to volunteer your time and service in the land of Israel. We truly appreciate the desire
                    God has placed in your heart to serve and to give comfort to His people.
                </div>
                <div className="mb-3">
                    The application process usually takes between two to three months, from the time the application documents are submitted to
                    receiving a definitive answer from the Jerusalem office.
                </div>
                <div className="mb-8">
                    Several factors affect the processing time, including length of service time requested, availability of positions and when
                    references are received.
                </div>
                <div className="mb-3">
                    <span className="font-bold">Please note:</span> All applicants who are applying to serve for over three months are required to
                    submit a Criminal Record Check/Police Clearance Certificate (contact BFP National Office for assistance). The Criminal Record
                    Check must be done at the Federal Level.
                </div>
            </section>
        </div>
    );
};

const DoctrinalStatement = () => {
    return (
        <div className="p-4">
            <div className="text-3xl m-5 font-serif italic text-center">BRIDGES FOR PEACEーDOCTRINAL STATEMENT</div>
            <div className="mb-3 text-2xl">THE BIBLE</div>
            <ul className="m-3 mb-8">
                <li>The Bible is the inspired Word of God (2 Tim. 3:16)</li>
            </ul>
            <div className="mb-3 text-2xl">GOD</div>
            <ul className="m-3 mb-8">
                <li>God is one (Deut. 6:4; 1 Cor. 8:6)</li>
                <li>The Father, Son and Holy Spirit exist in unity (Matt. 28:19)</li>
                <li>Jesus the Messiah is God’s only begotten Son (Matt. 16:16; John 3:16)</li>
                <li>Jesus the Messiah is the only Mediator between God and man (1 Tim. 2:5)</li>
                <li>Jesus the Messiah is eternal and fully God and fully man (John 8:58; John 14:9; John 10:30)</li>
            </ul>
            <div className="mb-3 text-2xl">MAN</div>
            <ul className="m-3 mb-8">
                <li>All men have sinned and come short of the glory of God (Rom. 3:23)</li>
                <li>The wages of sin is death, but the gift of God is eternal life through Jesus the Messiah our Lord (Rom. 6:23; John 3:16,36)</li>
            </ul>
            <div className="mb-3 text-2xl">SALVATION</div>
            <ul className="m-3 mb-8">
                <li>Salvation is by grace through faith as a gift of God (Eph. 2:8)</li>
                <li>Repentance and baptism in the name of the Father, Son and Holy Spirit are outward signs of an inward faith (Eph. 4:4,5)</li>
                <li>Faith is exhibited by a consecrated and holy life; faith without works is dead (James 2:18)</li>
            </ul>
            <div className="mb-3 text-2xl">ISRAEL</div>
            <ul className="m-3 mb-8">
                <li>The nation of Israel is the apple of God’s eye (Zech. 2:8)</li>
                <li>God will not break His covenant with Israel (Jer. 31:35–37)</li>
                <li>God is restoring the Jewish people to Israel, their Promised Land (Jer. 23:7–8)</li>
                <li>Believers from Gentile backgrounds have a debt to the Jewish people (Rom. 11)</li>
                <li>God blesses those who bless Israel and curses those who curse Israel (Gen. 12:3; Isa. 60:12)</li>
                <li>Blessing is promised to those who pray for Jerusalem’s peace (Ps. 122:6)</li>
            </ul>
            <div className="mb-3 text-2xl">THE FUTURE</div>
            <ul className="m-3 mb-8">
                <li>The bodily return of Jesus the Messiah is imminent (Acts. 1:11)</li>
                <li>There will be a literal resurrection of the dead (John 5:28)</li>
                <li>Those in the Messiah shall be immortalized (1 Cor. 15:53–54)</li>
                <li>The wicked shall be placed in hell for eternity (Rev. 20:10)</li>
                <li>Israel will be restored under the Kingship of Messiah Jesus (Luke 1:32)</li>
                <li>All believers shall be joint heirs with the Messiah (Rom. 8:17)</li>
            </ul>
            <div className="mb-3 text-2xl">POSITION ON EVANGELISM</div>
            <div className="m-3 mb-8">
                <div className="mb-3">
                    Bridges for Peace is a Jerusalem-based, Bible-believing Christian organization supporting Israel and building relationships
                    between Jews and Christians worldwide through education and practical deeds, expressing God’s love and mercy.
                </div>
                <div className="mb-3">
                    The history of Christian–Jewish relationships is seriously marred by the anti-Semitic behavior of Christians toward Jews. The
                    Crusades, the Inquisition, the pogroms, the Holocaust and other such persecutions have left a deep wound in the Jewish soul.
                    Tragically, established Christian denominations and institutions participated, either actively or by turning a blind eye, in these
                    atrocities. This has created an atmosphere of fear and distrust that has made honest communication between the two communities
                    nearly impossible.
                </div>
                <div className="mb-3">
                    Bridges for Peace is a Bible-believing Christian organization that does not proselytize. We are committed to being living
                    witnesses of the love of God in the name of Jesus through unconditional friendship and support, in order that the wounds of the
                    past may be healed and doors of communication can be opened between Christians and Jews.
                </div>
            </div>
            <div className="mb-3 text-2xl">STATEMENT ON MESSIANIC JUDAISM</div>
            <div className="m-3 mb-8">
                <div className="mb-3">
                    Recognizing the variety of callings within the body of Christ (e.g. of Paul as an apostle to the Gentiles; James and Peter to “the
                    circumcision”) we believe it is unwise to appear to be promoting the Messianic movement as Bridges for Peace’s mandate, while our
                    calling is building bridges between the Jewish community and the wider body of Christ. This is not meant to restrict your personal
                    choices of worship, it just means that Bridges for Peace, as an organization, is not to be identified with or promote Messianic
                    Jewish activities.
                </div>
                <div className="mb-3">
                    Our ministry seeks to repair centuries of Jewish pain, as members of the worldwide Church. Our calling is unique and specialized.
                    We walk a fine line between the Jewish world and the Christian world.
                </div>
                <div className="mb-3">
                    In light of this, it is necessary that all of the Bridges for Peace staff be in complete agreement with the vision, calling and
                    style of Bridges for Peace. It is not possible or permissible for a person to be a staff member of Bridges for Peace, sharing our
                    calling, vision and values during working hours and then be involved in activities during off hours that are not in full agreement
                    with our calling, vision and values. A staff member must commit to follow the vision 24/7. While a staff member may attend a
                    congregation which is not in full agreement, that staff member should not be in leadership, frontline involvement or participate
                    in any outreach programs which could jeopardize the ministry of Bridges for Peace in Israel.
                </div>
                <div className="mb-3">
                    When a Bridges for Peace center opens in a new region of Israel, any staff members attached to that center will not attend local
                    congregations until such time as a positive reputation has been developed in the community, Bridges for Peace leadership has an
                    opportunity to assess the reputation of the various congregations in the eyes of the Jewish majority and the senior leadership
                    team determines that the image of Bridges for Peace will not suffer.
                </div>
            </div>
            <div className="flex justify-center">
                <a href="/files/BFP-Doctrinal-Statement.pdf" download="BFP-Doctrinal-Statement.pdf" className="underline">
                    Download BFP Doctrinal Statement
                </a>
            </div>
        </div>
    );
};
