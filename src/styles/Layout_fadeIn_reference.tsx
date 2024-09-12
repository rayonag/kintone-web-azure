// components/Layout.tsx
'use client';
import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header menu/Header';
import BridgesLogo from '@/components/header menu/BridgesLogo';

interface Layout_fadeInProps {
    key?: string;
    children: ReactNode;
}

const Layout_fadeIn_reference: FC<Layout_fadeInProps> = ({ key, children }) => {
    return (
        <motion.div
            key={key || 'page'}
            className="h-screen w-[98vh] relative" // w-screen has issues with horizontal scroll bar
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <header className="hidden h-[5vh] md:flex justify-around content-center">
                <div className="z-10">
                    <BridgesLogo />
                </div>
            </header>
            {children}
        </motion.div>
    );
};

export default Layout_fadeIn_reference;
