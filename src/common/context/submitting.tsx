import { createContext, useContext, useState, ReactNode } from 'react';

interface SubmittingContextType {
    isSubmitting: boolean;
    startSubmitting: () => void;
    endSubmitting: () => void;
}

const SubmittingContext = createContext<SubmittingContextType | undefined>(undefined);

export const useSubmitting = () => {
    const context = useContext(SubmittingContext);
    if (context === undefined) {
        throw new Error('useSubmitting must be used within a SubmittingProvider');
    }
    return context;
};

interface SubmittingProviderProps {
    children: ReactNode;
}

export const SubmittingProvider = ({ children }: SubmittingProviderProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const startSubmitting = () => setIsSubmitting(true);
    const endSubmitting = () => setIsSubmitting(false);

    return <SubmittingContext.Provider value={{ isSubmitting, startSubmitting, endSubmitting }}>{children}</SubmittingContext.Provider>;
};
