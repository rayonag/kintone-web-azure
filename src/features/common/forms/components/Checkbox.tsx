import { FC, useState, ChangeEvent } from 'react';
import { FieldError, Merge, Control, Controller } from 'react-hook-form';

type CheckboxProps = {
    label: string | null;
    name: string;
    control: Control<any>;
    options: { [key: number]: string };
    error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
};
const Checkbox: FC<CheckboxProps> = ({ label, name, control, options, error }) => {
    return (
        <div className="my-1 w-40 me-5 text-black grow">
            <div className="my-1 flex-wrap">
                {label && <div className="font-semibold mb-1">{label}</div>}
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => {
                        return (
                            <div>
                                {Object.entries(options).map(([key, value]) => (
                                    <label key={key} className="flex">
                                        <input
                                            name={name}
                                            type="checkbox"
                                            value={value}
                                            checked={field.value?.includes(key)}
                                            onChange={(event) => {
                                                const newValue = event.target.value;
                                                if (field.value?.includes(newValue)) {
                                                    field.onChange(field.value.filter((v: string) => v !== newValue));
                                                } else {
                                                    field.onChange([...field.value, newValue]);
                                                }
                                            }}
                                        />
                                        <span className="ml-1 mr-2 text-xl">{value}</span>
                                    </label>
                                ))}
                            </div>
                        );
                    }}
                />
            </div>
            <div className="text-red-500 pl-1 py-1 text-xs h-4">{error && error.message}</div>
        </div>
    );
};
export default Checkbox;
