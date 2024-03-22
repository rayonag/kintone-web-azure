import handleCatch from '@/common/handleCatch';

const postReview = async (field: string, userApplicationRef: string) => {
    try {
        const body = {
            field: field,
            userApplicationRef: userApplicationRef
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
        handleCatch(e, JSON.stringify({ field, userApplicationRef }), 'postMedicalStatusForm');
    }
};
export default postReview;
