'use client';

import React, { useEffect, useState } from 'react';
import { usePageTransition } from '@/common/context/pageTransition';
import PageTransitionOverlay from './PageTransitionOverlay';

interface PageTransitionWrapperProps {
    children: React.ReactNode;
}

const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({ children }) => {
    const { isTransitioning } = usePageTransition();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Don't render anything until client-side
    if (!isClient) {
        return <>{children}</>;
    }

    return (
        <>
            <PageTransitionOverlay isVisible={isTransitioning} />
            {children}
        </>
    );
};

export default PageTransitionWrapper;
