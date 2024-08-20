import React from 'react';

const Step1 = () => {
    return (
        <div>
            <div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Email" />
                </div>
            </div>
        </div>
    );
};

export default Step1;
