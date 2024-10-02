import React, { FC } from 'react';

type SectionTitleProps = {
    title: string;
    theme?: string;
};
const SectionTitle: FC<SectionTitleProps> = ({ title, theme }) => {
    return (
        <div id="section-title">
            <h2 className={`${theme == 'dark' ? '' : 'text-black'} text-lg md:text-2xl font-bold`}>{title}</h2>
            <hr className="mt-4" />
        </div>
    );
};

export default SectionTitle;
