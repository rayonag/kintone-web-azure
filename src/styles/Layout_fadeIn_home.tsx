// components/Layout.tsx
'use client';
import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header menu/Header';
import useUserStore from '@/features/common/store';
import { KintoneUserName, KintonePassword, VolunteerApplicationMasterAppID } from '@/common/env';
import logError from '@/common/logError';
import { REST_OnlineVolunteerApplication } from '@/types/OnlineVolunteerApplication';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

interface Layout_fadeIn_homeProps {
    key?: string;
    children: ReactNode;
    repo?: any;
}

const Layout_fadeIn_home: FC<Layout_fadeIn_homeProps> = ({ key, children, repo }) => {
    console.log('repo', repo);
    return (
        <>
            {repo ? (
                <motion.div
                    key={key || 'page'}
                    className="h-screen w-[98vh] relative" // w-screen has issues with horizontal scroll bar
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Header isZealous={repo.isZealous} />
                    {children}
                </motion.div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Layout_fadeIn_home;
