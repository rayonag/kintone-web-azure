// components/Layout.tsx
'use client';
import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header menu/Header';
import useUserStore from '@/features/common/store';

interface Layout_fadeInProps {
    key?: string;
    children: ReactNode;
}

const Layout_fadeIn: FC<Layout_fadeInProps> = ({ key, children }) => {
    const type = useUserStore((state) => state.applicationType);
    const isZealous = type === 'Zealous';
    return (
        <motion.div
            key={key || 'page'}
            className="h-screen w-[98vh] relative" // w-screen has issues with horizontal scroll bar
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Header isZealous={isZealous} />
            {children}
        </motion.div>
    );
};

export default Layout_fadeIn;
