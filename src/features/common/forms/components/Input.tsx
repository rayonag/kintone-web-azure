import { FC } from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

type InputProps = {
    label: string | null;
    register: UseFormRegisterReturn;
    placeholder?: string;
    error: FieldError | undefined;
    optional?: boolean;
    theme?: string;
};
const Input: FC<InputProps> = ({ label, register, placeholder, error, optional, theme }) => {
    return (
        <label className="flex flex-col my-2 w-40 me-5 grow md:max-w-sm">
            <div className={`${theme == 'dark' ? '' : 'text-black'} font-semibold mb-1 text-black`}>
                {label}
                {optional && <span className="text-gray-500 text-sm"> (optional)</span>}
            </div>
            <input
                type="text"
                {...register}
                className={
                    'text-gray-800 rounded-md border py-2 px-3 focus:outline focus:outline-sky-500 focus:ring-4 focus:ring-sky-500/30' +
                    (error ? ' border-red-500' : ' border-inherit')
                }
                placeholder={placeholder || label || ''}
            />
            <div className="text-red-500 pl-1 py-1 text-xs h-4">{error && error.message}</div>
        </label>
    );
};
export default Input;
