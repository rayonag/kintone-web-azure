import { FC } from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

type SelectProps = {
    label: string;
    register: UseFormRegisterReturn;
    options: { [key: number]: string };
    error: FieldError | undefined;
    optional?: boolean;
    theme?: string;
};
export const Select: FC<SelectProps> = ({ label, register, options, error, optional, theme }) => {
    return (
        <label className="flex flex-col my-2 w-40 me-5 grow md:max-w-sm">
            <div className={`${theme == 'dark' ? '' : 'text-black'} font-semibold mb-1`}>
                {label}
                {optional && <span className="text-gray-500 text-sm"> (optional)</span>}
            </div>
            <select {...register} className={'text-gray-800 rounded-md border py-2 px-3' + (error ? ' border-red-500' : '')} defaultValue="">
                <option disabled={true} hidden={true} value="" key="default">
                    --Select--
                </option>
                {Object.entries(options).map(([key, value]) => (
                    <option value={key} key={key}>
                        {value}
                    </option>
                ))}
            </select>
            <div className="text-red-500 pl-1 py-1 text-xs h-4">{error && error.message}</div>
        </label>
    );
};
