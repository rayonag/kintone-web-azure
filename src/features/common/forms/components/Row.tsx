import React, { FC } from 'react';

type RowProps = {
    children: React.ReactNode;
};
const Row: FC<RowProps> = ({ children }) => {
    return <div className="flex flex-wrap">{children}</div>;
};

export default Row;
