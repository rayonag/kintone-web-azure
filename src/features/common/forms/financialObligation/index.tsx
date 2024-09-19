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
    const [isError, setIsError] = useState(false);
    const [selectedOption, setSelectedOption] = useState(paymentOption);
    const router = useRouter();
    const { setIsLoading } = useLoading();
    const ref = useUserStore((state) => state.ref);

    const handleSubmit = async () => {
        if (!selectedOption) {
            setIsError(true);
            return;
        } else setIsError(false);
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
                className="bg-blue-200 text-black text-center m-4 p-4"
            >
                <option disabled value="0">
                    --Please Select--
                </option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
            </select>
            {isError && <div className="text-red-500">Please select an option</div>}
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
