import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { parseCookies } from 'nookies';

import '@/styles/globals.css';
import { DashboardUserContext, DashboardUser } from '@/common/context/dashboardUser';
import { LoadingContext } from '@/common/context/loading';
import fetchUserApplicationMaster from '@/common/fetchUserApplicationMaster';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useUserStore from '@/features/common/store';
import { useShallow } from 'zustand/react/shallow';
const App = ({ Component, pageProps }: AppProps, ctx: NextPageContext) => {
    const router = useRouter();
    const cookies = parseCookies(ctx);
    //
    const username = cookies.auth || undefined;
    const ref = cookies.ref || undefined;
    const initUser = useUserStore((state) => state.initUser);
    useEffect(() => {
        if (username && ref) initUser(username, ref);
    }, [username, ref]);
    const user = useUserStore();
    //console.log('hi');
    console.log('user.type', user.applicationType);
    // bg color change
    useEffect(() => {
        if (user.applicationType == 'Zealous') {
            // Example client-side variable
            const zealousTheme = {
                startColor: '0,0,0', // RGB format
                endColor: '75,75,75', // RGB format
                btnBgColor: '#000000', // Black color
                btnBorderColor: 'red', // Black color
                btnHoverBgColor: 'gray', // Dark gray color
                btnHoverBorderColor: '#333333' // Dark gray color
            };

            // Update CSS variables
            document.documentElement.style.setProperty('--background-start-rgb', zealousTheme.startColor);
            document.documentElement.style.setProperty('--background-end-rgb', zealousTheme.endColor);
            document.documentElement.style.setProperty('--btn-bg-color', zealousTheme.btnBgColor);
            document.documentElement.style.setProperty('--btn-border-color', zealousTheme.btnBorderColor);
            document.documentElement.style.setProperty('--btn-hover-bg-color', zealousTheme.btnHoverBgColor);
            document.documentElement.style.setProperty('--btn-hover-border-color', zealousTheme.btnHoverBorderColor);
        }
    }, [user.applicationType]);
    //
    const DashboardUserProvider: ({ children }: { children: JSX.Element }) => JSX.Element = ({ children }) => {
        const [dashboardUser, setDashboardUser] = useState<DashboardUser>({
            isLoggedIn: false,
            username: cookies.auth || undefined,
            ref: cookies.ref || undefined
        });
        if (dashboardUser.username && dashboardUser.ref && !dashboardUser.isLoggedIn) {
            fetchUserApplicationMaster(dashboardUser, setDashboardUser);
        }
        return <DashboardUserContext.Provider value={dashboardUser}>{children}</DashboardUserContext.Provider>;
    };
    // 第二引数に空配列を指定してマウント・アンマウント毎（CSRでの各画面遷移時）に呼ばれるようにする
    useEffect(() => {
        // CSR用認証チェック
        router.beforePopState(({ url, as, options }) => {
            // ログイン画面とエラー画面遷移時のみ認証チェックを行わない
            if (
                url.startsWith('/apply') &&
                url !== '/apply/login' &&
                url !== '/apply/login/main' &&
                url !== '/apply/login/zealous' &&
                url !== '/_error'
            ) {
                if (typeof cookies.auth === 'undefined') {
                    // CSR用リダイレクト処理
                    window.location.href = '/apply/login';
                    return false;
                }
            } else if (url == '/apply/login' && typeof cookies.auth !== 'undefined') {
                // ログイン済みの場合はマイページにリダイレクト
                window.location.href = '/apply/';
                return false;
            }
            return true;
        });
    }, []);
    const CommonProvider: ({ children }: { children: JSX.Element }) => JSX.Element = ({ children }) => {
        const [isLoading, setIsLoading] = useState<boolean>(false);
        return (
            <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
                {isLoading && <LoadingSpinner />}
                {children}
            </LoadingContext.Provider>
        );
    };
    const component =
        typeof pageProps === 'undefined' ? null : (
            <CommonProvider>
                <DashboardUserProvider>
                    <Component {...pageProps} />
                </DashboardUserProvider>
            </CommonProvider>
        );

    return component;
};

App.getInitialProps = async (appContext: any) => {
    // SSR用認証チェック

    const cookies = parseCookies(appContext.ctx);
    // ログイン画面とエラー画面遷移時のみ認証チェックを行わない
    if (
        appContext.ctx.pathname.startsWith('/apply') &&
        appContext.ctx.pathname !== '/apply/login' &&
        appContext.ctx.pathname !== '/apply/login/main' &&
        appContext.ctx.pathname !== '/apply/login/zealous' &&
        appContext.ctx.pathname !== '/_error'
    ) {
        if (typeof cookies.auth === 'undefined') {
            // SSR or CSRを判定
            const isServer = typeof window === 'undefined';
            if (isServer) {
                appContext.ctx.res.statusCode = 302;
                appContext.ctx.res.setHeader('Location', '/apply/login');
                return {};
            } else {
            }
        }
    } else if (appContext.ctx.pathname == '/apply/login' && typeof cookies.auth !== 'undefined') {
        // redirect to dashboard if already logged in
        if (typeof window === 'undefined') {
            appContext.ctx.res.statusCode = 302;
            appContext.ctx.res.setHeader('Location', '/apply/');
            return {};
        } else {
        }
    }
    return {
        pageProps: {
            ...(appContext.Component.getInitialProps ? await appContext.Component.getInitialProps(appContext.ctx) : {}),
            pathname: appContext.ctx.pathname
        }
    };
};

export default App;
