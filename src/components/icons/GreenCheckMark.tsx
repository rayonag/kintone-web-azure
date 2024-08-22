import React from 'react';

const GreenCheckMark = ({ height = 100, width = 100, circle = true }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <circle opacity="0.5" cx="12" cy="12" r="10" stroke="#17c200" stroke-width="1.5"></circle>{' '}
                <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#17c200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>{' '}
            </g>
        </svg>
    );
};

export default GreenCheckMark;
