import Image from 'next/image';
import React from 'react';

export default function HomeLogo() {
    return <Image fetchPriority="high" alt="Home" width={1200} height={1200} src="/images/Bridges logo.jpg" className="w-40 h-12 m-4" />;
}
