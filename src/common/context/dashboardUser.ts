import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { NationalOffice } from './offices';

export type DashboardUser = {
    dashboardUser: {
        isLoggedIn: boolean;
        username?: string;
        password?: string;
        name?: string;
        ref?: string;
        applicationRef?: string;
        documents?: string[];
        formSubmission?: string[];
        office?: NationalOffice;
    };
    setDashboardUser: Dispatch<SetStateAction<DashboardUser['dashboardUser']>>;
};
export const defaultUserProvider: DashboardUser = {
    dashboardUser: { isLoggedIn: false },
    setDashboardUser: () => []
};
export const DashboardUserContext = createContext(defaultUserProvider);
export const useDashboardUser = () => {
    return useContext(DashboardUserContext);
};
