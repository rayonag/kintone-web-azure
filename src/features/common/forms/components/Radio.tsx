import { FC } from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

type RadioProps = {
    label: string;
    register: UseFormRegisterReturn;
    options: { [key: number]: string };
    error: FieldError | undefined;
    optional?: boolean;
};

export const Radio: FC<RadioProps> = ({ label, register, options, error, optional }) => {
    return (
        <label className="flex flex-col my-2 w-40 me-5 grow">
            <div className="font-semibold mb-1 text-black">
                {label}
                {optional && <span className="text-gray-500 text-sm"> (optional)</span>}
            </div>
            <div>
                {Object.entries(options).map(([key, value]) => {
                    return (
                        <div key={key}>
                            <label className="text-black">
                                <input type="radio" value={key} {...register} />
                                {value}
                            </label>
                        </div>
                    );
                })}
            </div>

            <div className="text-red-500 pl-1 py-1 text-xs h-4">{error && error.message}</div>
        </label>
    );
};
