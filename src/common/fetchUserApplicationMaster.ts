import { useDashboardUser } from '@/pages/_app';

const fetchUserApplicationMaster = () => {
    const { dashboardUser, setDashboardUser } = useDashboardUser();
    console.log('dashboardUser', dashboardUser);
    // fetch user information. When user returns and still holding username in cookie
    if (!dashboardUser.isLoggedIn) {
        const username = dashboardUser.username;
        const ref = dashboardUser.ref;
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
            await setDashboardUser((prev) => ({ username: username, ref: ref, name: user.name, isLoggedIn: true }));
        })();
    }
};
export default fetchUserApplicationMaster;
