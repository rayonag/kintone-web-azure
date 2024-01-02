"use client";
import { useRef, useState } from "react";

import Layout from "../login/Layout";

import { useDashboardUser } from "@/pages/_app";

const Dashboard = ({ user }) => {
    const users = useDashboardUser();
    console.log(users);

    return (
        <>
            <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
                {user?.isLoggedIn ? (
                    <>
                        {/* Moving sentence */}
                        <div className="absolute top-0 left-0 right-0 text-center mt-4">
                            <p className="hello text-sm text-red-300 moveSentence">Bridges for Peace</p>
                        </div>
                        {/* Content */}
                        <div className="flex flex-col items-center justify-center">
                            <div>Then it will show how far your application is...</div>
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
                            <button className="btn">Get Ready for Departure</button>
                            <button className="btn">Contact Us</button>
                        </div>
                    </>
                ) : (
                    <Layout>
                        <button />
                    </Layout>
                )}
            </div>
        </>
    );
};
export default Dashboard;
