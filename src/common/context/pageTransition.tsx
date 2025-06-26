'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface PageTransitionContextType {
    isTransitioning: boolean;
    setIsTransitioning: (transitioning: boolean) => void;
    startTransition: () => void;
    endTransition: () => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export const usePageTransition = () => {
    const context = useContext(PageTransitionContext);
    if (context === undefined) {
        throw new Error('usePageTransition must be used within a PageTransitionProvider');
    }
    return context;
};

interface PageTransitionProviderProps {
    children: ReactNode;
}

export const PageTransitionProvider: React.FC<PageTransitionProviderProps> = ({ children }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const startTransition = () => {
        if (isClient) {
            setIsTransitioning(true);
        }
    };

    const endTransition = () => {
        if (isClient) {
            setIsTransitioning(false);
        }
    };

    // Always return false for isTransitioning on server-side to prevent hydration mismatch
    const safeIsTransitioning = isClient ? isTransitioning : false;

    return (
        <PageTransitionContext.Provider
            value={{
                isTransitioning: safeIsTransitioning,
                setIsTransitioning,
                startTransition,
                endTransition
            }}
        >
            {children}
        </PageTransitionContext.Provider>
    );
};
