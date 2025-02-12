import logError from '@/common/logError';

const postFinancialObligation = async (data: any) => {
    try {
        const record = {
            ref: { value: data.ref },
            office: { value: data.office },
            paymentOption: { value: data.selectedOption }
        };
        const res = await fetch('/api/reference/postFinancialObligation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record) // Replace with your data
        });
        if (res.ok) {
            return res;
        } else {
            alert('Something wrong. Could not save your answers.');
            throw new Error('Failed to save the form');
        }
    } catch (e) {
        logError(e, data, 'postFinancialObligation');
        return;
    }
};
export default postFinancialObligation;
