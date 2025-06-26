'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionOverlayProps {
    isVisible: boolean;
}

const PageTransitionOverlay: React.FC<PageTransitionOverlayProps> = ({ isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    exit={{ x: '100%' }}
                    transition={{
                        duration: 0.4,
                        ease: [0.4, 0.0, 0.2, 1]
                    }}
                    className="fixed inset-0 bg-gradient-to-b-theme z-[9999] flex items-center justify-center"
                >
                    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl font-semibold mb-2">
                        Loading...
                    </motion.h2>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PageTransitionOverlay;
