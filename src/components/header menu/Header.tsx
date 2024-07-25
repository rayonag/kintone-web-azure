'use client';
import React from 'react';
import BridgesLogo from './BridgesLogo';

const Header = () => {
    const handleHomeClick = () => {
        location.href = '/apply';
    };
    const HomeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001 1h3a1 1 0 001-1"
            />
        </svg>
    );
    return (
        <>
            <header className="hidden w-full self-center h-[5vh] md:flex justify-around content-center">
                <button onClick={handleHomeClick} className="z-10">
                    <BridgesLogo />
                </button>
            </header>
            {/* TODO: responsive header
                <header className="flex md:hidden justify-start items-center bg-theme fixed top-0 bg-[rgb(26,26,26)]/60 left-0 right-0 mx-auto">
                <button onClick={handleHomeClick} className="z-10 ml-2">
                    <HomeIcon />
                </button>
            </header> */}
        </>
    );
};

export default Header;
