import { FC } from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

type TextareaProps = { label: string; register: UseFormRegisterReturn; placeholder?: string; error: FieldError | undefined };
const Textarea: FC<TextareaProps> = ({ label, register, placeholder, error }) => {
    return (
        <div className="flex justify-center">
            <label className="flex flex-col justify-center my-2 w-40 me-5 grow md:max-w-sm">
                <div className="font-semibold mb-1">{label}</div>
                <textarea
                    {...register}
                    className={
                        'text-gray-800 rounded-md border w-full py-2 px-3 focus:outline focus:outline-sky-500 focus:ring-4 focus:ring-sky-500/30' +
                        (error ? ' border-red-500' : ' border-inherit')
                    }
                    placeholder={placeholder || label}
                    rows={5}
                />
                {error && <div className="text-red-500 pl-1 py-1 text-xs">{error.message}</div>}
            </label>
        </div>
    );
};
export default Textarea;
