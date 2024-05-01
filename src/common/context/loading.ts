import { createContext, useContext, Dispatch, SetStateAction } from 'react';

export type Loading = {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};
const loadingProvider: Loading = {
    isLoading: false,
    setIsLoading: () => []
};
export const LoadingContext = createContext(loadingProvider);
export const useLoading = () => {
    return useContext(LoadingContext);
};
