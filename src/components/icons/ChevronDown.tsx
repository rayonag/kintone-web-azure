import React from 'react';

const ChevronDown = ({ size = 24 }: { size?: number }) => {
    return (
        <svg
            className="transition-transform duration-200"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    d="M6 9L11.7874 14.7874V14.7874C11.9048 14.9048 12.0952 14.9048 12.2126 14.7874V14.7874L18 9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></path>
            </g>
        </svg>
    );
};

export default ChevronDown;
