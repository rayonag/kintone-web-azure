'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { referenceFormURL } from '@/common/env';
import Layout_fadeIn from '@/styles/Layout_fadeIn';
import { useLoading } from '@/common/context/loading';
import logError from '@/common/logError';
import ReferenceForm from '@/features/common/forms/reference';
import Layout_fadeIn_reference from '@/styles/Layout_fadeIn_reference';

const ApplicationForm = () => {
    // State to track whether the iframe content is loading
    const { setIsLoading } = useLoading();
    const [ref, setRef] = useState<string | number | null>('');
    const [office, setOffice] = useState<string | number | null>('');
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
    useEffect(() => {
        // if no office get from url
        if (!office) {
            const url = new URL(window.location.href);
            const office = url.searchParams.get('office');
            setOffice(office);
        }
    }, []);

    return (
        // Use a wrapper div for the entire page
        <Layout_fadeIn_reference>
            {/* <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
                <>
                    {ref && (
                        <iframe
                            title="Embedded Content"
                            src={`${iframeLink}&ref=${ref}&office=${office}`} // Replace with your desired URL
                            style={{ flex: 1, border: 'none', marginTop: '4rem' }} // Make the iframe fill the remaining space
                            onLoad={handleIframeLoad}
                        ></iframe>
                    )}
                </>
            </div> */}
            <ReferenceForm />
        </Layout_fadeIn_reference>
    );
};

// Export the component for use in other files
export default ApplicationForm;
