// components/Layout.tsx
'use client';
import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header menu/Header';
import useUserStore from '@/features/common/store';

interface Layout_slideUpProps {
    key?: string;
    children: ReactNode;
}

const Layout_slideUp: FC<Layout_slideUpProps> = ({ key, children }) => {
    const type = useUserStore((state) => state.applicationType);
    const isZealous = type === 'Zealous';
    return (
        <motion.div key={key || 'page'} initial={{ opacity: 0, y: '10%' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <Header isZealous={isZealous} />
            {children}
        </motion.div>
    );
};

export default Layout_slideUp;
