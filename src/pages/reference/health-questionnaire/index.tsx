"use client";
import { useEffect, useState, useCallback } from "react";

import Layout from "./Layout";

import { useDashboardUser, setDashboardUser } from "@/pages/_app";
import Link from "next/link";
import HealthQuestionnaire from "./form/Form";

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
                <HealthQuestionnaire />
            </div>
        </Layout>
    );
};
export default Dashboard;
