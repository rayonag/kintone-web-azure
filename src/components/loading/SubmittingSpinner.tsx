import React from 'react';

interface SubmittingSpinnerProps {
    isVisible: boolean;
}

const SubmittingSpinner: React.FC<SubmittingSpinnerProps> = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-white rounded-lg p-8 shadow-xl max-w-md mx-4">
                <div className="flex flex-col items-center space-y-4">
                    {/* Processing Animation */}
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>

                    {/* Text */}
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Now Submitting...</h3>
                        <p className="text-sm text-gray-600">Please wait while we are processing your information</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmittingSpinner;
