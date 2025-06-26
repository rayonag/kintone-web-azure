import { FC } from 'react';
import { UseFormRegisterReturn, FieldError, Controller, Control } from 'react-hook-form';

type DateProps = {
    label: string | null;
    register: {
        day: UseFormRegisterReturn;
        month: UseFormRegisterReturn;
        year: UseFormRegisterReturn;
    };
    control: Control<any>;
    placeholder?: string;
    error: FieldError | { message?: string } | undefined;
    optional?: boolean;
    theme?: string;
};

const months = [
    { value: '01', label: 'Jan' },
    { value: '02', label: 'Feb' },
    { value: '03', label: 'Mar' },
    { value: '04', label: 'Apr' },
    { value: '05', label: 'May' },
    { value: '06', label: 'Jun' },
    { value: '07', label: 'Jul' },
    { value: '08', label: 'Aug' },
    { value: '09', label: 'Sep' },
    { value: '10', label: 'Oct' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dec' }
];

const Date: FC<DateProps> = ({ label, register, control, placeholder, error, optional, theme }) => {
    return (
        <label className="flex flex-col my-2 w-full me-5 grow md:max-w-sm">
            <div className={`${theme == 'dark' ? '' : 'text-black'} font-semibold mb-1`}>
                {label}
                {optional && <span className="text-gray-500 text-sm"> (optional)</span>}
            </div>
            <div className="flex gap-2">
                {/* Day Input */}
                <div className="flex-1">
                    <input
                        type="number"
                        min="1"
                        max="31"
                        placeholder="DD"
                        {...register.day}
                        className={
                            'w-full text-gray-800 rounded-md border py-2 px-3 focus:outline focus:outline-sky-500 focus:ring-4 focus:ring-sky-500/30' +
                            (error ? ' border-red-500' : ' border-inherit')
                        }
                    />
                </div>

                {/* Month Dropdown */}
                <div className="flex-1">
                    <Controller
                        name={register.month.name}
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                className={
                                    'w-full h-10 text-gray-800 bg-white rounded-md border py-2 px-3 focus:outline focus:outline-sky-500 focus:ring-4 focus:ring-sky-500/30' +
                                    (error ? ' border-red-500' : ' border-inherit')
                                }
                            >
                                <option value="">MM</option>
                                {months.map((month) => (
                                    <option key={month.value} value={month.value}>
                                        {month.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                </div>

                {/* Year Input */}
                <div className="flex-1">
                    <input
                        type="number"
                        min="1900"
                        max="2100"
                        placeholder="YYYY"
                        {...register.year}
                        className={
                            'w-full text-gray-800 rounded-md border py-2 px-3 focus:outline focus:outline-sky-500 focus:ring-4 focus:ring-sky-500/30' +
                            (error ? ' border-red-500' : ' border-inherit')
                        }
                    />
                </div>
            </div>
            <div className="text-red-500 pl-1 py-1 text-xs h-4">{error && (error.message || 'Invalid date')}</div>
        </label>
    );
};

export default Date;
