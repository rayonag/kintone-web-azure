import { FC, useState, ChangeEvent } from 'react';
import { UseFormRegisterReturn, FieldError, Merge, Control, Controller } from 'react-hook-form';
import { HealthQuestionnaireType } from '../schema';
import HealthQuestionnaire from '..';

type HealthCheckboxProps = {
    label: string | null;
    name: any; //keyof HealthQuestionnaireType;
    register: UseFormRegisterReturn;
    error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    value: string[];
    control: Control<HealthQuestionnaireType>;
};
export const HealthCheckbox: FC<HealthCheckboxProps> = ({ label, name, register, error, value, control }) => {
    const [selectedOption, setSelectedOption] = useState(value?.[0] || '');
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // If the clicked checkbox is already selected, deselect it
        // Otherwise, select it and deselect all other checkboxes
        setSelectedOption(value === selectedOption ? '' : value);
    };
    return (
        <div className="ml-3 my-1 grow md:max-w-sm">
            <div className="my-1 flex">
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => {
                        return (
                            <div className="flex">
                                <label className="flex">
                                    <input
                                        name="yes"
                                        type="checkbox"
                                        value="Yes"
                                        checked={field.value?.includes('Yes')}
                                        onChange={(event) => {
                                            const newValue = event.target.value;
                                            field.onChange([newValue]);
                                        }}
                                        className="w-8 h-8 m-1 accent-white"
                                    />
                                </label>
                                <label className="flex">
                                    <input
                                        name="no"
                                        type="checkbox"
                                        value="No"
                                        checked={field.value?.includes('No')}
                                        onChange={(event) => {
                                            const newValue = event.target.value;
                                            field.onChange([newValue]);
                                        }}
                                        className="w-8 h-8 m-1 accent-white"
                                    />
                                </label>
                            </div>
                        );
                    }}
                />
                {label && <div className="font-semibold mb-1">{label}</div>}
            </div>
            <div className="text-red-500 pl-1 py-1 text-xs h-4">{error && error.message}</div>
        </div>
    );
};
