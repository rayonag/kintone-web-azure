'use client';
import React, { useEffect } from 'react';
import ReferenceForm from '@/features/common/forms/reference';
import Layout_fadeIn_reference from '@/styles/Layout_fadeIn_reference';

const Reference = () => {
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

    return (
        <Layout_fadeIn_reference>
            <ReferenceForm />
        </Layout_fadeIn_reference>
    );
};

// Export the component for use in other files
export default Reference;
