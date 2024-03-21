import { FC } from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

type NumebrProps = { label: string; register: UseFormRegisterReturn; placeholder?: string; error: FieldError | undefined };
const Number: FC<NumebrProps> = ({ label, register, placeholder, error }) => {
    return (
        <label className="flex flex-col my-2 w-40 me-5 grow md:max-w-sm">
            <div className="font-semibold mb-1">{label}</div>
            <input
                type="number"
                {...register}
                className={
                    'text-gray-800 rounded-md border py-2 px-3 focus:outline focus:outline-sky-500 focus:ring-4 focus:ring-sky-500/30' +
                    (error ? ' border-red-500' : ' border-inherit')
                }
                placeholder={placeholder || label}
            />
            {error && <div className="h-4 text-red-500 pl-1 py-1 text-xs">{error ? error.message : ''}</div>}
        </label>
    );
};
export default Number;
