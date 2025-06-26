'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePageTransition } from '@/common/context/pageTransition';

interface TransitionLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    [key: string]: any;
}

const TransitionLink: React.FC<TransitionLinkProps> = ({ href, children, className, onClick, ...props }) => {
    const router = useRouter();
    const { startTransition } = usePageTransition();

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();

        // Call custom onClick if provided
        if (onClick) {
            onClick();
        }

        // Start transition immediately for instant feedback
        startTransition();

        // Navigate to let the slide animation start
        setTimeout(async () => {
            await router.push(href);
        });
    };

    return (
        <Link href={href} className={className} onClick={handleClick} {...props}>
            {children}
        </Link>
    );
};

export default TransitionLink;
