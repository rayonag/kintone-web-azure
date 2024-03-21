import handleCatch from './handleCatch';

type getUserApplicationRefProps = {
    ref: string | '';
};
const getUserApplicationRef: (props: getUserApplicationRefProps) => Promise<string | undefined> = async ({ ref }) => {
    if (!ref) throw new Error('Something went wrong: User not found');
    try {
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
        handleCatch(e, null, 'getUserApplicationRef');
    }
};
export default getUserApplicationRef;
