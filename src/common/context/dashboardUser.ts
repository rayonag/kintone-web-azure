import { createContext, useContext } from 'react';
import { NationalOffice } from './offices';

export type DashboardUser = {
    isLoggedIn?: boolean;
    username?: string;
    password?: string;
    name?: string;
    ref?: string;
    applicationRef?: string;
    documents?: string[];
    formSubmission?: string[];
    office?: NationalOffice;
};
export const defaultUserProvider: DashboardUser = {};
export const DashboardUserContext = createContext(defaultUserProvider);
export const useDashboardUser = () => {
    return useContext(DashboardUserContext);
};
