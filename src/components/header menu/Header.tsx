'use client';
import React, { FC } from 'react';
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
    return (
        <>
            <header className="hidden h-[5svh] md:flex justify-around content-center">
                {/* hide when isZealous not given */}
                <button onClick={handleHomeClick} className="z-10">
                    {isZealous ? <ZealousLogo /> : isZealous == false ? <Image alt="no image" src="" /> : <BridgesLogo />}
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
