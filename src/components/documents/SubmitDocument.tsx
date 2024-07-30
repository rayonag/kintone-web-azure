'use client';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useDashboardUser } from '@/common/context/dashboardUser';
import { useLoading } from '@/common/context/loading';
import postDocument from '@/common/documents/postDocument';
import Layout_fadeIn from '@/styles/Layout_fadeIn';
import { useRouter } from 'next/router';
import { NecessaryDocuments, NecessaryDocumentsShortTerm, NecessaryDocumentsUSA } from '@/pages/api/hooks/notification';

type SubmitDocumentProps = {
    document: NecessaryDocuments | NecessaryDocumentsUSA | NecessaryDocumentsShortTerm;
    title: string;
    Help?: FC<any>;
};
const SubmitDocument: FC<SubmitDocumentProps> = ({ document, title, Help }) => {
    const dashboardUser = useDashboardUser();
    const { setIsLoading } = useLoading();
    const router = useRouter();

    const [fileData, setFileData] = useState<any>([]);
    const [userApplicationRef, setUserApplicationRef] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    // Does it need preview?
    //const [filePreview, setFilePreview] = useState();

    const userRef = dashboardUser.ref;
    // early return. TODO: review validation
    if (!userRef) {
        console.log('no user ref');
    }
    // TODO: review validation and return val
    if (!dashboardUser.applicationRef) {
        console.log('no application ref');
    }

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
    const handleSubmit = async () => {
        const files = fileData;
        console.log(files);
        if (files == undefined) return;
        if (files.length > 0) {
            setIsLoading(true);
            const file = files[0];
            const formData = new FormData();
            formData.append('file', file);
            // TODO: applicationRef validation
            if (!dashboardUser.applicationRef) {
                alert('Something went wrong. Could not upload your document');
                throw new Error('applicationRef undefined');
            }
            await postDocument({ document: document, formData: formData, applicationRef: dashboardUser.applicationRef, userRef: userRef });
            setIsLoading(false);
            router.push('/apply/documents/complete');
        } else {
            setIsLoading(false);
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
        <>
            <Layout_fadeIn>
                <div className="relative flex flex-col items-center justify-center text-center min-h-screen text-white overflow-hidden">
                    <span style={{ fontSize: '2rem' }}>{title}</span>
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

                    <button className="btn" onClick={async () => await handleSubmit()}>
                        Click to Submit
                    </button>
                    {Help && <Help />}
                    <Link href="/contact" className="link">
                        Need Help? Contact Us
                    </Link>
                    <Link href="/apply/documents" className="btn">
                        Go to Documents Top
                    </Link>
                </div>
            </Layout_fadeIn>
        </>
    );
};
export default SubmitDocument;
