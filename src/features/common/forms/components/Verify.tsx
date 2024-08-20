import { FC } from 'react';
import { UseFormRegisterReturn, FieldError, Merge } from 'react-hook-form';

type VerifyProps = {
    label: string | null;
    register: UseFormRegisterReturn;
    error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
};
const Verify: FC<VerifyProps> = ({ label, register, error }) => {
    return (
        <div className="my-1 me-5 grow md:max-w-96">
            <div className="my-1 flex">
                <label className="flex">
                    <input type="checkbox" {...register} className="w-8 h-8" />
                    <span className="ml-1 mr-2 text-xl">{label}</span>
                </label>
            </div>
            {error && <div className="text-red-500 pl-1 pt-1 text-xs">{error.message as string}</div>}
        </div>
    );
};
export default Verify;
