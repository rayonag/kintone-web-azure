// components/Layout.tsx

import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header menu/Header';

interface Layout_fadeInProps {
    children: ReactNode;
}

const Layout_fadeIn: FC<Layout_fadeInProps> = ({ children }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <Header />
            {children}
        </motion.div>
    );
};

export default Layout_fadeIn;
