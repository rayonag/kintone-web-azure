import { FC } from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

type RadioProps = {
    register: UseFormRegisterReturn;
    options: { [key: number]: string };
    error: FieldError | undefined;
    optional?: boolean;
};

export const Radio: FC<RadioProps> = ({ register, options, error, optional }) => {
    return (
        <label className="flex flex-col my-2 w-40 me-5 grow">
            <div className="flex">
                {Object.entries(options).map(([key, value]) => {
                    return (
                        <div key={key} className="m-3">
                            <label className="text-2xl">
                                <input type="radio" className="scale-125 m-1" value={key} {...register} />
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
