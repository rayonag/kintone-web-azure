// components/Layout.tsx
'use client';
import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header menu/Header';

interface Layout_fadeIn_homeProps {
    key?: string;
    children: ReactNode;
    repo?: any;
}

const Layout_fadeIn_home: FC<Layout_fadeIn_homeProps> = ({ key, children, repo }) => {
    return (
        <>
            {repo ? (
                <motion.div
                    key={key || 'page'}
                    className="h-screen w-screen relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Header isZealous={repo.isZealous} />
                    <div className="flex flex-col items-center justify-center h-[100svh] text-white">{children}</div>
                </motion.div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Layout_fadeIn_home;
