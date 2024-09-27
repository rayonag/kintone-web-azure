import { motion, useAnimate, useAnimation } from 'framer-motion';
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { Section } from '.';

type StartButtonProps = {
    setSection: Dispatch<SetStateAction<Section>>;
    transitioning: boolean;
    setTransitioning: (transitioning: boolean) => void;
};
const StartButton: FC<StartButtonProps> = ({ setSection, transitioning, setTransitioning }) => {
    const [scope, animate] = useAnimate();
    const parentRef = useRef<HTMLDivElement>(null);
    const startParentAnimation = async () => {
        await animate(
            scope.current,
            {
                width: ['0%', '100%']
            },
            { duration: 1.2, ease: 'easeInOut' }
        );
        await animate(scope.current, { rotate: 90 });
        await animate(
            scope.current,
            {
                x: '50vw',
                backgroundColor: 'white'
            },
            { duration: 0.3, ease: 'easeIn' }
        );

        if (transitioning) {
            setSection('Email');
        }
    };

    useEffect(() => {
        if (transitioning) {
            startParentAnimation();
        }
    }, [transitioning]);

    return (
        <motion.div ref={parentRef} onClick={() => setTransitioning(true)} className="btn relative z-10 overflow-hidden">
            Start
            <motion.div ref={scope} className="absolute top-0 left-0 bottom-0 bg-blue-100 z-0" />
        </motion.div>
    );
};
export default StartButton;
