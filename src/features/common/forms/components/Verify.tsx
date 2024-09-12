import { FC } from 'react';
import { UseFormRegisterReturn, FieldError, Merge } from 'react-hook-form';

type VerifyProps = {
    label: string | null;
    register: UseFormRegisterReturn;
    error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    theme?: string;
};
const Verify: FC<VerifyProps> = ({ label, register, error, theme }) => {
    return (
        <div className={`${theme == 'dark' ? '' : 'text-black'} my-1 me-5`}>
            <label className="my-1">
                <input type="checkbox" {...register} className="mt-3 mr-2 w-5 h-5" />
                <span className="ml-1 mr-2 text-lg">{label}</span>
            </label>
            <div className="text-red-500 pl-1 py-1 text-xs h-4">{error && error.message}</div>
        </div>
    );
};
export default Verify;
