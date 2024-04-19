import logError from '../logError';

const postReview = async (field: string, userRef: string) => {
    try {
        const body = {
            field: field,
            userRef: userRef
        };
        // upload file to kintone and get filekey
        const res = await fetch('/api/application/checklist/postReview', {
            method: 'POST',
            body: JSON.stringify(body)
        });
        if (res.ok) {
            return res;
        } else {
            alert('Something wrong. Could not upload your document.');
            throw new Error('Could not upload your document.');
        }
    } catch (e) {
        logError(e, JSON.stringify({ field, userRef }), 'postMedicalStatusForm');
    }
};
export default postReview;
