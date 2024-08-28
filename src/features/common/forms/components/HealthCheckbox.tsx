import { FC, useState, ChangeEvent } from 'react';
import { UseFormRegisterReturn, FieldError, Merge } from 'react-hook-form';

type HealthCheckboxProps = {
    label: string | null;
    register: UseFormRegisterReturn;
    error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    value: string[];
};
export const HealthCheckbox: FC<HealthCheckboxProps> = ({ label, register, error, value }) => {
    const [selectedOption, setSelectedOption] = useState(value?.[0] || '');
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // If the clicked checkbox is already selected, deselect it
        // Otherwise, select it and deselect all other checkboxes
        setSelectedOption(value === selectedOption ? '' : value);
    };
    return (
        <div className="ml-3 my-1 grow md:max-w-sm">
            <div className="flex justify-between">
                <label className="flex">
                    <input
                        key="no"
                        type="checkbox"
                        value="No"
                        checked={selectedOption == 'No'}
                        {...register}
                        onChange={handleCheckboxChange}
                        className="w-8 h-8 accent-red-600"
                    />
                    <span className="ml-1 mr-2 text-xl">No</span>
                </label>
                <span className="ml-1 mr-2 text-xl">{label}</span>
                <label className="flex">
                    <input
                        key="yes"
                        type="checkbox"
                        value="Yes"
                        checked={selectedOption == 'Yes'}
                        {...register}
                        onChange={handleCheckboxChange}
                        className="w-8 h-8 accent-green-600"
                    />
                    <span className="ml-1 mr-2 text-xl">Yes</span>
                </label>
            </div>
            <div className="text-red-500 pl-1 py-1 text-xs h-4">{error && error.message}</div>
        </div>
    );
};
