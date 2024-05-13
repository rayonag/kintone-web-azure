import { DashboardUser, useDashboardUser } from './context/dashboardUser';
import getUserApplicationRef from './getUserApplicationRef';

const fetchUserApplicationMaster = (dashboardUser: DashboardUser['dashboardUser'], setDashboardUser: DashboardUser['setDashboardUser']) => {
    console.log('fnie');
    console.log('dashboardUser', dashboardUser);
    // fetch user information. When user returns and still holding username in cookie
    if (!dashboardUser.isLoggedIn) {
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
            console.log('user', user);
            const userApplicationRef = await getUserApplicationRef({ ref: ref });
            await setDashboardUser((prev) => ({
                username: username,
                ref: ref,
                name: user.name,
                applicationRef: userApplicationRef || undefined,
                isLoggedIn: true,
                documents: user.documents,
                formSubmission: user.formSubmission
            }));
        })();
    }
};
export default fetchUserApplicationMaster;
