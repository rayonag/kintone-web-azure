import { DashboardUser } from './context/dashboardUser';
import getUserApplicationRef from './getUserApplicationRef';

const fetchUserApplicationMaster = (dashboardUser: DashboardUser, setDashboardUser: React.Dispatch<React.SetStateAction<DashboardUser>>) => {
    const username = dashboardUser.username;
    const ref = dashboardUser.ref;

    if (!ref) return;
    const fetchUser = (async () => {
        const res = await fetch('/api/fetchUserKintone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        });
        const user = await res.json();
        const userApplicationRef = await getUserApplicationRef({ ref: ref });
        await setDashboardUser((prev) => ({
            username: username,
            ref: ref,
            name: user.name,
            applicationRef: userApplicationRef || undefined,
            isLoggedIn: true,
            documents: user.documents,
            formSubmission: user.formSubmission,
            office: user.office,
            type: user.type
        }));
    })();
};
export default fetchUserApplicationMaster;
