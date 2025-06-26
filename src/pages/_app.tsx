import React, { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { parseCookies } from 'nookies';

import '@/styles/globals.css';
import { DashboardUserContext, DashboardUser } from '@/common/context/dashboardUser';
import { PageTransitionProvider } from '@/common/context/pageTransition';
import { SubmittingProvider, useSubmitting } from '@/common/context/submitting';
import fetchUserApplicationMaster from '@/common/fetchUserApplicationMaster';
import PageTransitionWrapper from '@/components/pageTransition/PageTransitionWrapper';
import SubmittingSpinner from '@/components/loading/SubmittingSpinner';
import useUserStore from '@/features/common/store';
import Layout_fadeIn_home from '@/styles/Layout_fadeIn_home';

const AppContent = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const { isSubmitting } = useSubmitting();
    const cookies = parseCookies();
    //
    const username = cookies.auth || undefined;
    const ref = cookies.ref || undefined;
    const initUser = useUserStore((state) => state.initUser);
    useEffect(() => {
        if (username && ref) initUser(username, ref);
    }, [username, ref]);
    const theme = pageProps.theme;
    // bg color change
    // TODO: temp disable
    useEffect(() => {
        if (theme) {
            document.documentElement.style.setProperty('--background-start-rgb', theme.startColor);
            document.documentElement.style.setProperty('--background-end-rgb', theme.endColor);
            document.documentElement.style.setProperty('--btn-bg-color', theme.btnBgColor);
            document.documentElement.style.setProperty('--btn-border-color', theme.btnBorderColor);
            document.documentElement.style.setProperty('--btn-hover-bg-color', theme.btnHoverBgColor);
            document.documentElement.style.setProperty('--btn-hover-border-color', theme.btnHoverBorderColor);
        }
    }, [theme]);

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

    const component =
        typeof pageProps === 'undefined' ? (
            <></>
        ) : router.pathname.startsWith('/apply/login') || router.pathname.startsWith('/reference') ? (
            <PageTransitionProvider>
                <DashboardUserProvider>
                    <>
                        <PageTransitionWrapper>
                            <Component {...pageProps} />
                        </PageTransitionWrapper>
                    </>
                </DashboardUserProvider>
            </PageTransitionProvider>
        ) : (
            <PageTransitionProvider>
                <DashboardUserProvider>
                    <Layout_fadeIn_home repo={{ isZealous: pageProps.isZealous == 'true' }}>
                        <>
                            <PageTransitionWrapper>
                                <Component {...pageProps} />
                            </PageTransitionWrapper>
                        </>
                    </Layout_fadeIn_home>
                </DashboardUserProvider>
            </PageTransitionProvider>
        );

    return (
        <>
            {component}
            <SubmittingSpinner isVisible={isSubmitting} />
        </>
    );
};

const App = (props: AppProps, ctx: NextPageContext) => {
    return (
        <SubmittingProvider>
            <AppContent {...props} />
        </SubmittingProvider>
    );
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
                return { pageProps: {} };
            } else {
            }
        }
    } else if (appContext.ctx.pathname.startsWith('/apply/login') && typeof cookies.auth !== 'undefined') {
        // redirect to dashboard if already logged in
        if (typeof window === 'undefined') {
            appContext.ctx.res.statusCode = 302;
            appContext.ctx.res.setHeader('Location', '/apply/');
            return { pageProps: {} };
        } else {
            return { pageProps: {} };
        }
    }
    // theme
    let theme = {
        startColor: '25, 25, 25', // gradient start color
        endColor: '1, 44, 102', // gradient end color
        btnBgColor: '#012c66', // button background color
        btnBorderColor: '#012c66', // button border color
        btnHoverBgColor: '#014a99', // button hover background color
        btnHoverBorderColor: '#014a99' // button hover border color
    };

    if (cookies.isZealous == 'true' || appContext.ctx.pathname == '/apply/login/zealous') {
        theme = {
            startColor: '0,0,0', // RGB format
            endColor: '25,25,25', // RGB format
            btnBgColor: '#000000', // Black color
            btnBorderColor: 'rgb(238,57,35)', // Black color
            btnHoverBgColor: 'gray', // Dark gray color
            btnHoverBorderColor: '#333333' // Dark gray color
        };
    }
    return {
        pageProps: {
            ...(appContext.Component.getInitialProps ? await appContext.Component.getInitialProps(appContext.ctx) : {}),
            pathname: appContext.ctx.pathname,
            theme,
            isZealous: cookies.isZealous
        }
    };
};

export default App;
