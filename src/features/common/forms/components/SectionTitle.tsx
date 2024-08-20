import React, { FC } from 'react';

type SectionTitleProps = {
    title: string;
};
const SectionTitle: FC<SectionTitleProps> = ({ title }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <hr className="mt-4" />
        </div>
    );
};

export default SectionTitle;
