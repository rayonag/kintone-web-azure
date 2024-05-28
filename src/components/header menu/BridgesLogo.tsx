import Image from 'next/image';
import React from 'react';

export default function BridgesLogo() {
    return (
        <Image
            alt="Home"
            width={1000}
            height={1000}
            src="https://www.bridgesforpeace.com/wp-content/themes/bridges4peace/images/logo.jpg"
            className="w-28 h-10 m-4"
        />
    );
}
