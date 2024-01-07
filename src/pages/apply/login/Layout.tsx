// components/Layout.tsx

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <motion.div initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "-100%" }} transition={{ duration: 1.2 }}>
            {children}
        </motion.div>
    );
};

export default Layout;
