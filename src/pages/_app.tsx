import React, { useEffect, createContext, useContext, useState, FC, Dispatch, SetStateAction } from "react";
import { NextPageContext } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { parseCookies } from "nookies";

import "@/styles/globals.css";

export type DashboardUser = {
    isLoggedIn: boolean;
    username?: string;
    password?: string;
    name?: string;
    ref?: string;
    checkList?: string[];
};
const defaultUser: DashboardUser = {
    isLoggedIn: false,
};
// Create/Export the User context
const dashboardUserContext = createContext<DashboardUser>(defaultUser);
const setDashboardUserContext = createContext<Dispatch<SetStateAction<DashboardUser>>>(() => undefined);
export const useDashboardUser = () => {
    return useContext(dashboardUserContext);
};
export const setDashboardUser = () => {
    return useContext(setDashboardUserContext);
};
const DashboardUserProvider: ({ children }: { children: JSX.Element }) => JSX.Element = ({ children }) => {
    const [dashboardUser, setDashboardUser] = useState<DashboardUser>(defaultUser);
    return (
        <dashboardUserContext.Provider value={dashboardUser}>
            <setDashboardUserContext.Provider value={setDashboardUser}>{children}</setDashboardUserContext.Provider>
        </dashboardUserContext.Provider>
    );
};

const App = ({ Component, pageProps }: AppProps, ctx: NextPageContext) => {
    const router = useRouter();
    const cookies = parseCookies(ctx);

    // set username from cookie
    if (typeof cookies.auth !== "undefined") {
        const user = useDashboardUser();
        user.username = cookies.auth;
    }

    // 第二引数に空配列を指定してマウント・アンマウント毎（CSRでの各画面遷移時）に呼ばれるようにする
    useEffect(() => {
        // CSR用認証チェック
        router.beforePopState(({ url, as, options }) => {
            // ログイン画面とエラー画面遷移時のみ認証チェックを行わない
            if (url !== "/apply/login" && url !== "/_error") {
                if (typeof cookies.auth === "undefined") {
                    // CSR用リダイレクト処理
                    window.location.href = "/apply/login";
                    return false;
                }
            }
            return true;
        });
    }, []);

    const component =
        typeof pageProps === "undefined" ? null : (
            <DashboardUserProvider>
                <Component {...pageProps} />
            </DashboardUserProvider>
        );

    return component;
};

App.getInitialProps = async (appContext: any) => {
    // SSR用認証チェック

    const cookies = parseCookies(appContext.ctx);
    // ログイン画面とエラー画面遷移時のみ認証チェックを行わない
    if (appContext.ctx.pathname !== "/apply/login" && appContext.ctx.pathname !== "/_error") {
        if (typeof cookies.auth === "undefined") {
            // SSR or CSRを判定
            const isServer = typeof window === "undefined";
            if (isServer) {
                console.log("in ServerSide");
                appContext.ctx.res.statusCode = 302;
                appContext.ctx.res.setHeader("Location", "/apply/login");
                return {};
            } else {
                console.log("in ClientSide");
            }
        }
    }
    return {
        pageProps: {
            ...(appContext.Component.getInitialProps ? await appContext.Component.getInitialProps(appContext.ctx) : {}),
            pathname: appContext.ctx.pathname,
        },
    };
};

export default App;
