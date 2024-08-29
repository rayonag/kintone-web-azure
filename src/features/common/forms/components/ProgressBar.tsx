import GreenCheckMark from '@/components/icons/GreenCheckMark';
import React, { FC } from 'react';

type StepProgressBarProps = {
    steps: number;
    setStep: (steps: number) => void;
    currentStep: number;
};
const StepProgressBar: FC<StepProgressBarProps> = ({ steps, setStep, currentStep }) => {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 pb-4 md:pb-8">
                <div className="flex items-center justify-center gap-1 md:gap-4 w-full max-w-2xl">
                    {Array.from({ length: steps }).map((_, index) => (
                        <>
                            <div
                                key={index}
                                className={`flex items-center justify-center w-4 h-4 md:w-8 md:h-8 rounded-full ${
                                    index + 1 === currentStep
                                        ? 'bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900'
                                        : 'bg-gray-200 dark:bg-gray-800'
                                }`}
                                //onClick={() => setStep(index + 1)}
                            >
                                {index + 1 < currentStep ? <GreenCheckMark /> : index + 1}
                            </div>
                            {index + 1 < steps && <div className="flex h-1 flex-1 bg-gray-200 dark:bg-gray-800" />}
                        </>
                    ))}
                </div>
            </div>
        </>
    );
};

export default StepProgressBar;
