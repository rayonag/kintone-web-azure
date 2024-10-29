import Image from 'next/image';
import React, { FC, useState } from 'react';

type PopoverImageProps = {
    imageSrc: string;
    altTag: string;
};
const PopoverImage: FC<PopoverImageProps> = ({ imageSrc, altTag }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <img onClick={handleOpen} src={imageSrc} alt={altTag} className="hover:cursor-zoom-in" />
            {isOpen && (
                <div onClick={handleClose} className="popover-modal-overlay hover:cursor-zoom-out">
                    <div className="popover-modal-content">
                        <img src={imageSrc} alt={altTag} />
                    </div>
                </div>
            )}
        </>
    );
};

export default PopoverImage;
