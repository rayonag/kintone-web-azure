'use client';
import React, { FC, useEffect, useState } from 'react';
import BridgesLogo from './BridgesLogo';
import ZealousLogo from './ZealousLogo';
import Image from 'next/image';

type HeaderProps = {
    isZealous?: boolean;
};
const Header: FC<HeaderProps> = ({ isZealous }) => {
    const handleHomeClick = () => {
        location.href = '/apply';
    };
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const controlHeader = () => {
        if (typeof window !== 'undefined') {
            const currentScrollY = document.body.scrollTop || document.documentElement.scrollTop;
            // top of the page
            if (currentScrollY < 0) {
                setIsVisible(true);
                return;
            } // bottom of the page
            else if (window.innerHeight + currentScrollY >= document.body.scrollHeight) {
                setIsVisible(false);
                return;
            }
            if (currentScrollY > lastScrollY) {
                // Scroll down
                setIsVisible(false);
            } else {
                // Scroll up
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        }
    };

    useEffect(() => {
        // document.body for mobile UI
        if (typeof window !== 'undefined') {
            document.body.addEventListener('scroll', controlHeader);
            document.body.addEventListener('touchmove', controlHeader);

            return () => {
                document.body.removeEventListener('scroll', controlHeader);
                document.body.removeEventListener('touchmove', controlHeader);
            };
        }
    }, [lastScrollY]);
    return (
        <>
            <header
                className={`flex justify-center fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
                    isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
                } ${isZealous ? 'bg-black' : isZealous == false ? 'bg-gradient-to-b from-[#191919] to-[#181a1c]' : ''}`}
            >
                <button onClick={handleHomeClick} className="z-10">
                    {isZealous ? <ZealousLogo /> : isZealous == false ? <BridgesLogo /> : <Image alt="no image" src="" />}
                </button>
            </header>
        </>
    );
};

export default Header;
