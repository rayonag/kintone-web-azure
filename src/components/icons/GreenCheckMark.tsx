import React from 'react';

const GreenCheckMark = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
            {/* Green circle */}
            <circle cx="12" cy="12" r="11" strokeWidth={2} stroke="green" fill="none" />

            {/* Green check mark */}
            <path d="M8.5 15l-3.5-3.5L3 13l5.5 5.5L20 9l-1.5-1.5z" fill="green" />
        </svg>
    );
};

export default GreenCheckMark;
