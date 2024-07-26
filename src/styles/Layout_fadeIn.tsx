// components/Layout.tsx

import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header menu/Header';

interface Layout_fadeInProps {
    key?: string;
    children: ReactNode;
}

const Layout_fadeIn: FC<Layout_fadeInProps> = ({ key, children }) => {
    console.log(key);
    return (
        <motion.div
            key={key || 'page'}
            className="h-screen w-screen relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Header />
            {children}
        </motion.div>
    );
};

export default Layout_fadeIn;
