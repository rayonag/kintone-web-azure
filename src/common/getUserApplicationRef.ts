import logError from './logError';

type getUserApplicationRefProps = {
    ref: string | '';
};
const getUserApplicationRef: (props: getUserApplicationRefProps) => Promise<string | undefined | null> = async ({ ref }) => {
    if (!ref) throw new Error('Something went wrong: User not found');
    try {
        console.log('here');
        const res = await fetch('/api/application/getUserApplicationRef', {
            method: 'POST',
            body: ref
        });
        if (res.ok) {
            const returnRef = await res.json();
            return returnRef.res;
        } else {
            return undefined;
        }
    } catch (e) {
        logError(e, null, 'getUserApplicationRef');
    }
};
export default getUserApplicationRef;
