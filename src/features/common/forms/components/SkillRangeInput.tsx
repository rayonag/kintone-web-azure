import { FC, useState } from 'react';
import { UseFormRegisterReturn, FieldError, Control, useWatch } from 'react-hook-form';
import { ApplicationFormType } from '../applicationForm/schema';

type SkillRangeInputProps = {
    label: string | null;
    register: UseFormRegisterReturn;
    placeholder?: string;
    control: Control<ApplicationFormType>;
    error: FieldError | undefined;
};
const SkillRangeInput: FC<SkillRangeInputProps> = ({ label, register, placeholder, control, error }) => {
    const [isHover, setIsHover] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const value = useWatch({ control, name: register.name as any }); // TODO: type safety
    return (
        <label
            className={`flex flex-col border p-1 my-2 rounded-md w-40 me-5 grow md:max-w-48 ${isHover ? 'bg-gray-300' : ''}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className="flex justify-between mb-1 text-black" onClick={() => setIsFocused(!isFocused)}>
                <span>{label}</span>
                <span>{value == '0' ? '-' : value == '' ? '-' : value}</span>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ease ${isFocused ? 'max-h-20' : 'max-h-0'}`}>
                <input
                    type="range"
                    min={0}
                    max={5}
                    defaultValue={0}
                    {...register}
                    className={
                        'text-gray-800 w-full rounded-md border focus:outline focus:outline-sky-500 focus:ring-4 focus:ring-sky-500/30' +
                        (error ? ' border-red-500' : ' border-inherit')
                    }
                    placeholder={placeholder || label || ''}
                />
            </div>
        </label>
    );
};
export default SkillRangeInput;
