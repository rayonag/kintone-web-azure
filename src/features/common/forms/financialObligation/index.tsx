'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useUserStore from '@/features/common/store';
import Component from './thisPage';
import postFinancialObligation from './hooks/postFinancialObligation';
import { useRouter } from 'next/router';
import { useLoading } from '@/common/context/loading';

const FinancialObligation = (props: { repo: any }) => {
    const paymentOption = props.repo?.selectedOption || undefined;
    const [isChecked, setIsChecked] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isCheckError, setIsCheckError] = useState(false);
    const [selectedOption, setSelectedOption] = useState(paymentOption);
    const router = useRouter();
    const { setIsLoading } = useLoading();
    const ref = useUserStore((state) => state.ref);

    const handleSubmit = async () => {
        if (!selectedOption) {
            setIsError(true);
            return;
        } else setIsError(false);
        if (!isChecked) {
            setIsCheckError(true);
            return;
        } else setIsCheckError(false);
        setIsLoading(true);
        const res = await postFinancialObligation({ selectedOption, ref });
        if (res) {
            router.push('/apply/financial-obligation/complete');
        } else {
            alert('Something wrong. Could not save your answers.');
        }
        setIsLoading(false);
    };

    // confirm before leave page. TODO: dirty form check not working
    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            event.preventDefault();
            event.returnValue = '';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    return (
        <form className="flex flex-col p-10 text-center">
            <Component />

            <select
                value={selectedOption}
                defaultValue={selectedOption || '0'}
                onChange={(e) => setSelectedOption(e.currentTarget.value)}
                className="bg-red-50 text-black text-center self-center flex w-96 h-16 m-4 p-4"
            >
                <option disabled value="0">
                    --Please Select--
                </option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
            </select>
            <div className="flex justify-center items-center text-start w-full">
                <input
                    className="w-8 h-8 m-2"
                    type="checkbox"
                    id="agree"
                    name="agree"
                    checked={isChecked}
                    value="agree"
                    onChange={(e) => setIsChecked(!isChecked)}
                />
                <label htmlFor="agree" className="flex w-2/3">
                    <span>
                        I have read and understand my financial commitment to Bridges for Peace upon acceptance to the Zealous Israel Project.
                    </span>
                </label>
            </div>
            {isError && <div className="text-red-500">Please select an option</div>}
            {isCheckError && <div className="text-red-500">Please check the box</div>}
            <button type="button" onClick={handleSubmit} className="btn-wide">
                Save & Submit
            </button>

            <Link type="button" href="/apply" className="btn-wide">
                Back to Top
            </Link>
        </form>
    );
};

export default FinancialObligation;
