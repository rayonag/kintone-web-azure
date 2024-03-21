import { useDashboardUser, setDashboardUser } from './dashboardUser';

const fetchUserApplicationMaster = () => {
    const user = useDashboardUser();
    const setUser = setDashboardUser();
    // fetch user information. When user returns and still holding username in cookie
    if (!user.isLoggedIn) {
        const username = user.username;
        const ref = user.ref;
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
            await setUser((prev) => ({ username: username, ref: ref, name: user.name, isLoggedIn: true }));
        })();
    }
};
export default fetchUserApplicationMaster;
