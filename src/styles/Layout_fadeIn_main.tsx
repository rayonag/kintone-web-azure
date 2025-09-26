// components/Layout.tsx
'use client';
import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header menu/Header';

interface Layout_fadeInProps {
    key?: string;
    children: ReactNode;
}

const Layout_fadeIn: FC<Layout_fadeInProps> = ({ key, children }) => {
    return (
        // <motion.div key={key || 'page'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        //     <Header isZealous={false} />
        //     {children}
        // </motion.div>
        <>{children}</>
    );
};

export default Layout_fadeIn;
