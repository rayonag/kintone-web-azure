import { FC, useState, ChangeEvent } from 'react';
import { UseFormRegisterReturn, FieldError, Merge, UseFormGetValues } from 'react-hook-form';
import { HealthQuestionnaireType } from '../schema/healthQuestionnaireSchema';

type CheckboxProps = {
    label: string | null;
    register: UseFormRegisterReturn;
    options: string[];
    error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    value: string[];
};
const Checkbox: FC<CheckboxProps> = ({ label, register, options, error, value }) => {
    const [selectedOption, setSelectedOption] = useState(value?.[0] || '');
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // If the clicked checkbox is already selected, deselect it
        // Otherwise, select it and deselect all other checkboxes
        setSelectedOption(value === selectedOption ? '' : value);
    };
    return (
        <div className="my-1 w-40 me-5 grow md:max-w-36">
            <div className="my-1 flex">
                {options.map((option) => (
                    <label key={option} className="flex">
                        <input
                            type="checkbox"
                            value={option}
                            checked={selectedOption == option}
                            {...register}
                            onChange={handleCheckboxChange}
                            className="w-8 h-8"
                        />
                        <span className="ml-1 mr-2 text-xl">{option}</span>
                    </label>
                ))}
                {label && <div className="font-semibold mb-1">{label}</div>}
            </div>
            {error && <div className="text-red-500 pl-1 pt-1 text-xs">{error.message as string}</div>}
        </div>
    );
};
export default Checkbox;
