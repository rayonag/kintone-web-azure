'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { KintoneUserName, KintonePassword, VolunteerApplicationMasterAppID, referenceFormURL } from '@/common/env';
import { REST_VolunteerApplicationMaster } from '@/types/VolunteerApplicationMaster';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Layout_fadeIn from '@/styles/Layout_fadeIn';
import logError from '@/common/logError';
import { NationalOffice } from '@/common/context/offices';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

const ApplicationForm = () => {
    // State to track whether the iframe content is loading
    const [isLoading, setIsLoading] = useState(true);
    const [ref, setRef] = useState<string | number | null>('');
    console.log('ref', ref);
    const router = useRouter();
    const iframeLink = referenceFormURL;
    // Function to handle iframe load event
    const handleIframeLoad = () => {
        // Set isLoading to false when the iframe has finished loading
        // added 2 seconds for lagging loading time
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };
    // confirm before leave page
    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            event.preventDefault();
            event.returnValue = '';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    useEffect(() => {
        // if no ref get from url
        if (!ref) {
            const url = new URL(window.location.href);
            const ref = url.searchParams.get('ref');
            setRef(ref);
        }
    }, []);
    // back to top after receiving postmessage from FormBridge
    useEffect(() => {
        const receiveMessage = async (event: any) => {
            // if not from https://f62c12b3.form.kintoneapp.com return
            if (event.origin !== 'https://f62c12b3.form.kintoneapp.com') return;
            let data = null;
            try {
                if (!event.data) return;
                // Check if event.data is a string and try to parse it
                if (typeof event.data === 'string') {
                    data = JSON.parse(event.data);
                } else {
                    // If event.data is already an object, use it directly
                    data = event.data;
                }
            } catch (e) {
                console.log('error', e);
                return;
            }
            console.log(data); // This will log the message data
            console.log('form', data?.form);
            console.log('public', data?.form?.publicCode); // This will log the message data
            const ref = new URL(window.location.href).searchParams.get('ref');
            if (data?.form?.publicCode) {
                const res = await fetch('/api/reference/postReferenceForm', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ref: ref }) // Replace with your data
                });
                console.log('res', res);
                alert('Thank you for submitting the reference form.');
                router.push('/reference/complete');
            }
        };
        window.addEventListener('message', receiveMessage);
        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('message', receiveMessage);
        };
    }, []);
    return (
        // Use a wrapper div for the entire page
        <Layout_fadeIn>
            <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
                <>
                    {isLoading && <LoadingSpinner />}
                    {ref && (
                        <iframe
                            title="Embedded Content"
                            src={`${iframeLink}&ref=${ref}`} // Replace with your desired URL
                            style={{ flex: 1, border: 'none', marginTop: '4rem' }} // Make the iframe fill the remaining space
                            onLoad={handleIframeLoad}
                        ></iframe>
                    )}
                </>
            </div>
        </Layout_fadeIn>
    );
};

// Export the component for use in other files
export default ApplicationForm;
