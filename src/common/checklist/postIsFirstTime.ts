import logError from '../logError';

const postIsFirstTime = async (userRef: string) => {
    try {
        const body = {
            userRef: userRef
        };
        const res = await fetch('/api/application/checklist/postIsFirstTime', {
            method: 'POST',
            body: JSON.stringify(body)
        });
        if (res.ok) {
            return res;
        } else {
            throw new Error('Failed to edit Kintone record');
        }
    } catch (e) {
        logError(e, { userRef }, 'postIsFirstTime');
    }
};
export default postIsFirstTime;
