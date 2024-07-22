import Image from 'next/image';
import React from 'react';

export default function BridgesLogo() {
    return (
        <Image
            alt="Home"
            width={1200}
            height={1200}
            src="https://www.bridgesforpeace.com/wp-content/themes/bridges4peace/images/logo.jpg"
            className="w-40 h-12 m-4"
        />
    );
}
