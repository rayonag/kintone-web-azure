// components/Layout.tsx

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header menu/Header';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <Header />
            {children}
        </motion.div>
    );
};

export default Layout;
