import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export type DashboardUser = {
    isLoggedIn: boolean;
    username?: string;
    password?: string;
    name?: string;
    ref?: string;
    applicationRef?: string;
    checkList?: string[];
};
export const defaultUser: DashboardUser = {
    isLoggedIn: false
};

// Create/Export the User context
export const dashboardUserContext = createContext<DashboardUser>(defaultUser);
export const setDashboardUserContext = createContext<Dispatch<SetStateAction<DashboardUser>>>(() => undefined);
export const useDashboardUser = () => {
    return useContext(dashboardUserContext);
};
export const setDashboardUser = () => {
    return useContext(setDashboardUserContext);
};
