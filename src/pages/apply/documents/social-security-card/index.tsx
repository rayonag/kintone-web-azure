'use client';
import { useEffect, useState } from 'react';
import Layout from './Layout';
import Link from 'next/link';
import postMedicalStatusForm from './hooks/postMedicalStatusForm';
import getUserApplicationRef from '@/common/getUserApplicationRef';
import { useRouter } from 'next/router';
import { useDashboardUser, setDashboardUser } from '@/common/context/dashboardUser';
import fetchUserApplicationMaster from '@/common/fetchUserApplicationMaster';
import GreenCheckMark from '@/components/icons/GreenCheckMark';
import DeleteIcon from '@/components/icons/DeleteIcon';

const MedicalForm = () => {
    const loginUser = useDashboardUser();
    fetchUserApplicationMaster(dashboardUser, setDashboardUser);
    const [fileData, setFileData] = useState<any>([]);
    // Does it need preview?
    const [filePreview, setFilePreview] = useState();
    const [userApplicationRef, setUserApplicationRef] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const userName = loginUser.username;
    const userRef = loginUser.ref;
    // early return. TODO: review validation
    if (!userRef) {
        return <>No record found</>;
    }
    // get applicationRef
    useEffect(() => {
        (async () => {
            const userApplicationRef = await getUserApplicationRef({ ref: userRef });
            setUserApplicationRef(userApplicationRef || '');
        })();
    }, []);
    // TODO: review validation and return val
    if (!userApplicationRef) return <>No record found</>;

    // upload from input
    const handleUpload = (e: any) => {
        const files = e.target.files;
        handleUploadFiles(files);
    };
    const handleUploadFiles = (files: any) => {
        console.log('files', files);
        if (files.length > 0) {
            const file = files[0];
            setFileData(files);
            const reader = new FileReader();
            reader.onload = (e) => {
                //setFilePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = () => {
        const files = fileData;
        console.log(files);
        console.log('loginUser.ref', loginUser.ref);
        if (files == undefined) return;
        if (files.length > 0) {
            const file = files[0];
            const formData = new FormData();
            formData.append('file', file);
            // TODO: applicationRef validation
            if (!userApplicationRef) {
                alert('Something went wrong. Could not upload your document');
                throw new Error('applicationRef undefined');
            }
            postMedicalStatusForm({ formData: formData, applicationRef: userApplicationRef });
        } else {
            return;
        }
    };
    const handleDelete = () => {
        setFileData([]);
    };
    const DraggableField = () => {
        const handleDragEnter = (e: any) => {
            e.preventDefault();
            setIsDragging(true);
        };
        const handleDragOver = (e: any) => {
            e.preventDefault();
            setIsDragging(true);
        };
        const handleDragLeave = () => {
            setIsDragging(false);
        };
        // upload from drag&drop
        const handleDrop = (e: any) => {
            e.preventDefault();
            setIsDragging(false);
            const files = [...e.dataTransfer.files];
            handleUploadFiles(files);
        };
        return (
            <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{ margin: '3rem', width: '30rem' }}
            >
                <div style={{ padding: '2%', backgroundColor: `${isDragging ? 'lightcyan' : '#f5f5f5'}` }}>
                    <div
                        style={{
                            color: 'gray',
                            border: '5px lightblue dashed',
                            padding: '5%',
                            textAlign: 'center',
                            display: 'grid',
                            justifyContent: 'center',
                            justifyItems: 'center'
                        }}
                    >
                        <h1 style={{ fontSize: '2rem' }}>Drop a file here</h1>
                        <h1 style={{ fontSize: '1.2rem' }}>or</h1>
                        <label htmlFor="pdfInput" className="btn">
                            <input
                                id="pdfInput"
                                type="file"
                                accept=".pdf,image/png, image/jpeg"
                                onInput={handleUpload}
                                style={{ padding: '1rem', display: 'none' }}
                            />
                            <span style={{ color: 'white', fontSize: '1.2rem' }}>Browse File</span>
                        </label>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <Layout>
            <div className="relative flex flex-col items-center justify-center text-center min-h-screen bg-black text-white overflow-hidden">
                <span style={{ fontSize: '2rem' }}>Please Upload Your Completed Medical Form</span>
                <div className="md:hidden m-5">
                    <label htmlFor="pdfInput" className="btn">
                        <input id="pdfInput" type="file" onInput={handleUpload} hidden accept=".pdf,image/png, image/jpeg" />
                        <span>Upload File</span>
                    </label>
                </div>
                <div className="max-sm:hidden md:block">{fileData.length == 0 && <DraggableField />}</div>
                <div>
                    {fileData.length > 0 ? (
                        <div className="border flex">
                            <span className="p-2" style={{ fontSize: '1.5rem', color: 'green' }}>
                                ✓{' '}
                            </span>
                            <span className="p-2 self-center">{fileData[0].name}</span>
                            <span
                                className="border flex flex-wrap content-center justify-center w-8 hover:bg-white cursor-pointer"
                                style={{ fontSize: '2rem', color: 'red' }}
                                onClick={handleDelete}
                            >
                                {' '}
                                ×{' '}
                            </span>
                        </div>
                    ) : (
                        <span></span>
                    )}
                </div>

                <button className="btn" onClick={() => handleSubmit()}>
                    click to submit
                </button>
                <Link href="./medical-form/example" className="link">
                    What is Medical Status Form?
                </Link>
                <Link href="/contact" className="link">
                    Need Help? Contact Us
                </Link>
                <Link href="/apply/documents" className="btn">
                    Go to Documents Top
                </Link>
            </div>
        </Layout>
    );
};
export default MedicalForm;
