import { ContactSchema, ContactType } from '../schema/healthQuestionnaire';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldError, useForm, useFieldArray, UseFormRegister, FieldValues, UseFormRegisterReturn } from 'react-hook-form';
import { formtype } from '../types/formtypes';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';

type InputProps = { label: string; register: UseFormRegisterReturn; placeholder?: string; error: FieldError | undefined };
export const Input: FC<InputProps> = ({ label, register, placeholder, error }) => {
    return (
        <label className="flex flex-col space-y-1 w-80 me-5 grow md:max-w-sm">
            <div className="font-semibold mb-1">{label}</div>
            <input
                type="text"
                {...register}
                className={
                    'text-gray-800 mt-4 rounded-md border py-2 px-3 focus:outline focus:outline-sky-500 focus:ring-4 focus:ring-sky-500/30' +
                    (error ? ' border-red-500' : ' border-inherit')
                }
                placeholder={placeholder || label}
            />
            {error && <div className="text-red-500 pl-1 pt-1 text-xs">{error.message}</div>}
        </label>
    );
};
type NumebrProps = { label: string; register: UseFormRegisterReturn; placeholder?: string; error: FieldError | undefined };
export const Number: FC<NumebrProps> = ({ label, register, placeholder, error }) => {
    return (
        <label className="flex flex-col space-y-1 w-28 me-5 grow md:max-w-sm">
            <div className="font-semibold mb-1">{label}</div>
            <input
                type="number"
                {...register}
                className={
                    'text-gray-800 mt-4 rounded-md border py-2 px-3 focus:outline focus:outline-sky-500 focus:ring-4 focus:ring-sky-500/30' +
                    (error ? ' border-red-500' : ' border-inherit')
                }
                placeholder={placeholder || label}
            />
            {error && <div className="text-red-500 pl-1 pt-1 text-xs">{error.message}</div>}
        </label>
    );
};
export const Select = (props: { label: string; register: UseFormRegisterReturn; options: string[]; error: FieldError | undefined }) => {
    return (
        <label className="flex flex-col space-y-1 w-80 me-5 grow md:max-w-sm">
            <div className="font-semibold mb-1">{props.label}</div>
            <select
                {...props.register}
                className={'text-gray-800 mt-4 rounded-md border py-2 px-3' + (props.error ? ' border-red-500' : '')}
                defaultValue="d"
            >
                <option disabled={true} hidden={true} value="d" key="default">
                    --Select--
                </option>
                {props.options.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
            {props.error && <div className="text-red-500 pl-1 pt-1 text-xs">{props.error.message}</div>}
        </label>
    );
};
export const Birthday = (props: { label: string; error: FieldError | undefined; register: UseFormRegisterReturn[] }): JSX.Element => {
    const days = () => {
        let arr = [];
        for (let i = 1; i <= 31; i++) {
            arr.push(i);
        }
        return arr.map((day) => (
            <option value={day} key={day}>
                {day}
            </option>
        ));
    };
    const months = () => {
        const monthlist = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthlist.map((month) => (
            <option value={month} key={month}>
                {month}
            </option>
        ));
    };
    const years = () => {
        let arr = [];
        for (let i = 2023; i > 1920; i--) {
            arr.push(i);
        }
        return arr.map((year) => (
            <option value={year} key={year}>
                {year}
            </option>
        ));
    };
    return (
        <label className="flex flex-col space-y-1 w-80 me-5 grow md:max-w-sm">
            <div className="font-semibold mb-1">{props.label}</div>
            <div className="row flex">
                <select {...props.register[0]} className="text-gray-800 mt-4 rounded-md border py-2 px-3">
                    {days()}
                </select>
                {props.error && <div className="text-red-500 pl-1 pt-1 text-xs">{props.error.message}</div>}
                <select {...props.register[1]} className="text-gray-800 mt-4 rounded-md border py-2 px-3">
                    {months()}
                </select>
                {props.error && <div className="text-red-500 pl-1 pt-1 text-xs">{props.error.message}</div>}
                <select {...props.register[2]} className="text-gray-800 mt-4 rounded-md border py-2 px-3">
                    {years()}
                </select>
                {props.error && <div className="text-red-500 pl-1 pt-1 text-xs">{props.error.message}</div>}
            </div>
        </label>
    );
};
export const Radio = (props: { label: string; register: UseFormRegisterReturn; options: string[]; error: FieldError | undefined }) => {
    return (
        <label className="flex flex-col space-y-1 w-10 me-5 grow md:max-w-sm">
            <div className="font-semibold mb-1">{props.label}</div>
            <div>
                {props.options.map((option) => (
                    <div key={option}>
                        <label>
                            <input type="radio" value={option} {...props.register} />
                            {option}
                        </label>
                    </div>
                ))}
            </div>

            {props.error && <div className="text-red-500 pl-1 pt-1 text-xs">{props.error.message as string}</div>}
        </label>
    );
};
type CheckboxProps = { label: string | null; register: UseFormRegisterReturn; options: string[]; error: FieldError | undefined };
export const Checkbox: FC<CheckboxProps> = ({ label, register, options, error }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // If the clicked checkbox is already selected, deselect it
        // Otherwise, select it and deselect all other checkboxes
        setSelectedOption(value === selectedOption ? '' : value);
    };
    return (
        <div className="space-y-1 w-20 me-5 grow md:max-w-sm self-center">
            <div className="flex">
                {options.map((option) => (
                    <label key={option} className="flex">
                        <input
                            type="checkbox"
                            value={option}
                            {...register}
                            checked={selectedOption === option}
                            onChange={handleCheckboxChange}
                            className="w-8 h-8"
                        />
                        <span className="ml-1 mr-2 text-xl">{option}</span>
                    </label>
                ))}
                {label && <div className="font-semibold mb-1">{label}</div>}
            </div>
            {error && <div className="text-red-500 pl-1 pt-1 text-xs">{error.message as string}</div>}
        </div>
    );
};
type HealthCheckboxProps = { label: string | null; register: UseFormRegisterReturn; error: FieldError | undefined };
export const HealthCheckbox: FC<HealthCheckboxProps> = ({ label, register, error }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // If the clicked checkbox is already selected, deselect it
        // Otherwise, select it and deselect all other checkboxes
        setSelectedOption(value === selectedOption ? '' : value);
    };
    return (
        <div className="ml-3 my-1 grow md:max-w-sm">
            <div className="flex justify-between">
                <label className="flex">
                    <input
                        key="no"
                        type="checkbox"
                        value="No"
                        {...register}
                        checked={selectedOption === 'No'}
                        onChange={handleCheckboxChange}
                        className="w-8 h-8 accent-red-600"
                    />
                    <span className="ml-1 mr-2 text-xl">No</span>
                </label>
                <span className="ml-1 mr-2 text-xl">{label}</span>
                <label className="flex">
                    <input
                        key="yes"
                        type="checkbox"
                        value="Yes"
                        {...register}
                        checked={selectedOption === 'Yes'}
                        onChange={handleCheckboxChange}
                        className="w-8 h-8 accent-green-600"
                    />
                    <span className="ml-1 mr-2 text-xl">Yes</span>
                </label>
            </div>
            {error && <div className="text-red-500 pl-1 pt-1 text-xs">{error.message as string}</div>}
        </div>
    );
};
