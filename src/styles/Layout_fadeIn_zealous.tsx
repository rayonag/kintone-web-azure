// components/Layout.tsx
'use client';
import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header menu/Header';

interface Layout_fadeIn_zealousProps {
    key?: string;
    children: ReactNode;
}

const Layout_fadeIn_zealous: FC<Layout_fadeIn_zealousProps> = ({ key, children }) => {
    return (
        <motion.div key={key || 'page'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Header isZealous={true} />
            {children}
        </motion.div>
    );
};

export default Layout_fadeIn_zealous;
