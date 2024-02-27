"use client";
import { useEffect, useState, useCallback } from "react";

import Layout from "./Layout";

import { useDashboardUser, setDashboardUser } from "@/pages/_app";
import Link from "next/link";

const Dashboard = () => {
    const loginUser = useDashboardUser();
    const setUser = setDashboardUser();
    const username = loginUser.username;
    // fetch user information
    if (!loginUser.isLoggedIn) {
        useEffect(() => {
            const fetchUser = async () => {
                const res = await fetch("/api/fetchUserKintone", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username: username }), // Replace with your data
                });
                const user = await res.json();
                setUser((prev) => ({ ...prev, name: user["name"].value, isLoggedIn: true }));
            };
            fetchUser();
        }, [loginUser]);
    }

    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
                <>
                    <div>
                        <h1 className="text-xl my-10">Welcome back, {loginUser?.name}!</h1>
                    </div>
                    {/* Moving sentence */}
                    {/* <div className="absolute top-5 left-0 right-0 text-left items-baseline mt-4 moveSentence">
                        <div className="flex text-2xl ">
                            <img src="https://www.bridgesforpeace.com/wp-content/themes/bridges4peace/images/logo.jpg" style={{ maxWidth: "7rem" }} alt="Bridges for Peace"></img>
                            <p className="text-2xl italic text-white ml-5">Bridges for Peace</p>
                            <p className="text-2xl italic text-white ml-5">גשרים למעו השלום</p>
                            <p className="text-2xl italic text-blue-300 ml-5">... Your Israel Connection</p>
                        </div>
                    </div> */}
                    {/* Content */}
                    <div className="flex flex-col items-center justify-center">
                        <div>This page will show the progress of your application ...</div>
                        <ul className="list-none p-0">
                            <li className="flex items-center mb-2">
                                <span className="text-green-500 text-2xl mr-2">&#10004;</span>
                                Application Form Completed
                            </li>
                            <li className="flex items-center mb-2">
                                <span className="text-green-500 text-2xl mr-2">&#10004;</span>
                                Staff Development went through your application
                            </li>
                            <li className="flex items-center mb-2">
                                <span className="text-green-500 text-2xl mr-2">&#10004;</span>
                                Visa Approved
                            </li>
                        </ul>
                        <Link href="/apply/form" className="btn">
                            Submit online application form
                        </Link>
                        <button className="btn">Get Ready for Departure</button>
                        <button className="btn">Contact Us</button>
                    </div>
                    {/* Moving sentence */}
                    {/* <div className="absolute bottom-5 left-0 right-0 text-left items-baseline mt-4 moveSentenceRev">
                        <div className="flex text-2xl ">
                            <img src="https://www.bridgesforpeace.com/wp-content/themes/bridges4peace/images/logo.jpg" style={{ maxWidth: "7rem" }} alt="Bridges for Peace"></img>
                            <p className="text-2xl italic text-white ml-5">Bridges for Peace</p>
                            <p className="text-2xl italic text-white ml-5">גשרים למעו השלום</p>
                            <p className="text-2xl italic text-blue-300 ml-5">... Your Israel Connection</p>
                        </div>
                    </div> */}
                </>
            </div>
        </Layout>
    );
};
export default Dashboard;
