import { FC } from 'react';
import { UseFormRegisterReturn, FieldError, Merge } from 'react-hook-form';

type VerifyProps = {
    label: string | null;
    register: UseFormRegisterReturn;
    error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
};
const Verify: FC<VerifyProps> = ({ label, register, error }) => {
    return (
        <div className="my-1 me-5 text-black">
            <label className="my-1">
                <input type="checkbox" {...register} className="mt-2 mr-2 w-6 h-6" />
                <span className="ml-1 mr-2 text-xl">{label}</span>
            </label>
            <div className="text-red-500 pl-1 py-1 text-xs h-4">{error && error.message}</div>
        </div>
    );
};
export default Verify;
