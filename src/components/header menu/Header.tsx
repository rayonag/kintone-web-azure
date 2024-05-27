'use client';
import React from 'react';
import BridgesLogo from './BridgesLogo';

const Header = () => {
    const handleHomeClick = () => {
        location.href = '/apply';
    };
    return (
        <header className="flex justify-around content-center bg-theme fixed top-0 bg-[rgb(26,26,26)]/60 left-0 right-0 mx-auto">
            <button onClick={handleHomeClick} className="z-10">
                <BridgesLogo />
            </button>
        </header>
    );
};

export default Header;
