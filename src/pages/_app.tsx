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
    }, []);
    const user = useUserStore();
    console.log('user', user);
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
            console.log('url', url);
            // ログイン画面とエラー画面遷移時のみ認証チェックを行わない
            if (url.startsWith('/apply') && url !== '/apply/login' && url !== '/_error') {
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
    if (appContext.ctx.pathname.startsWith('/apply') && appContext.ctx.pathname !== '/apply/login' && appContext.ctx.pathname !== '/_error') {
        if (typeof cookies.auth === 'undefined') {
            // SSR or CSRを判定
            const isServer = typeof window === 'undefined';
            if (isServer) {
                console.log('in ServerSide');
                appContext.ctx.res.statusCode = 302;
                appContext.ctx.res.setHeader('Location', '/apply/login');
                return {};
            } else {
                console.log('in ClientSide');
            }
        }
    } else if (appContext.ctx.pathname == '/apply/login' && typeof cookies.auth !== 'undefined') {
        // redirect to dashboard if already logged in
        if (typeof window === 'undefined') {
            appContext.ctx.res.statusCode = 302;
            appContext.ctx.res.setHeader('Location', '/apply/');
            return {};
        } else {
            console.log('in ClientSide');
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
