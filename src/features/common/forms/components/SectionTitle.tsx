import React, { FC } from 'react';

type SectionTitleProps = {
    title: string;
};
const SectionTitle: FC<SectionTitleProps> = ({ title }) => {
    return (
        <div id="section-title">
            <h2 className="text-2xl font-bold text-black">{title}</h2>
            <hr className="mt-4" />
        </div>
    );
};

export default SectionTitle;
