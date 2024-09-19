import postFormSubmission from '@/common/checklist/postFormSubmission';
import { HealthQuestionnaireType } from '../schema';
import logError from '@/common/logError';

const postFinancialObligation = async (data: any) => {
    try {
        const record = {
            ref: { value: data.ref },
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
            return;
        }
    } catch (e) {
        logError(e, data, 'postFinancialObligation');
        return;
    }
};
export default postFinancialObligation;
