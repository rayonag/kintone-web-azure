'use client';
import { useEffect, useState, useCallback } from 'react';

import Layout from './Layout';

import { useDashboardUser, setDashboardUser } from '@/pages/_app';
import Link from 'next/link';
import postMedicalStatusForm from './hooks/postMedicalStatusForm';

const Dashboard = () => {
    const loginUser = useDashboardUser();
    const setUser = setDashboardUser();
    const username = loginUser.username;
    const [fileData, setFileData] = useState();

    // fetch user information

    useEffect(() => {
        if (!loginUser.isLoggedIn) {
            const fetchUser = async () => {
                const res = await fetch('/api/fetchUserKintone', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: username }) // Replace with your data
                });
                const user = await res.json();
                setUser((prev) => ({ ...prev, name: user['name'].value, isLoggedIn: true }));
            };
            fetchUser();
        }
    }, [loginUser]);

    const handleUploadPdf = (e) => {
        const files = e.target.files;
        setFileData(files);
    };
    const handleSubmit = () => {
        const files = fileData;
        console.log(files);
        console.log('loginUser.ref', loginUser.ref);
        if (files == undefined) return;
        if (files.length > 0) {
            const file = files[0];
            // upload to kintone file server
            const formData = new FormData();
            formData.append('file', file);
            // formData.append('name', file.name);
            // formData.append('ref', loginUser.ref || '');
            postMedicalStatusForm({ formData: formData });
        } else {
            return;
        }
    };
    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
                <label
                    htmlFor="pdfInput"
                    style={{
                        cursor: 'pointer',
                        borderRadius: '3rem',
                        padding: '1rem',
                        margin: '1rem',
                        width: '10rem'
                    }}
                >
                    <input id="pdfInput" type="file" onInput={handleUploadPdf} style={{ padding: '1rem' }} />
                    <span style={{ color: 'white', fontSize: '1.2rem' }}>Browse File</span>
                </label>
                <button onClick={() => handleSubmit()}>click to submit</button>
                <Link href="./medical-form/example" className="underline cursor-pointer hover:text-blue-400">
                    What is Medical Status Form?
                </Link>
            </div>
        </Layout>
    );
};
export default Dashboard;
