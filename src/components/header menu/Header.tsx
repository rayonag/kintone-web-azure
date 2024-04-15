'use client';
import React from 'react';
import BridgesLogo from './BridgesLogo';

const Header = () => {
    const handleHomeClick = () => {
        location.href = '/';
    };
    return (
        <header className="flex justify-around content-center bg-theme absolute left-0 right-0 mx-auto">
            <button onClick={handleHomeClick} className="z-10">
                <BridgesLogo />
            </button>
        </header>
    );
};

export default Header;
