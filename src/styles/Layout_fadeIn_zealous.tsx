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

interface Layout_fadeIn_zealousProps {
    key?: string;
    children: ReactNode;
}

const Layout_fadeIn_zealous: FC<Layout_fadeIn_zealousProps> = ({ key, children }) => {
    return (
        <>
            <motion.div
                key={key || 'page'}
                className="h-screen w-[98vh] relative" // w-screen has issues with horizontal scroll bar
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Header isZealous={true} />
                {children}
            </motion.div>
        </>
    );
};

export default Layout_fadeIn_zealous;
