import Layout from '@/components/layout';

import { setSessionCookie, } from '@/lib/session_context';

export default function Main() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const username = formData.get('username');
        const password = formData.get('password');
        const res = await fetch('http://localhost:3000/api/auth/sign_in', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        setSessionCookie(data);
        window.location.href = 'http://localhost:3000/redesign/card_collection';
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <br />
                <input type="text" name="username" required />
                <br />
                <label>Password</label>
                <br />
                <input type="text" name="password" required />
                <br />
                <button type="submit">Submit</button>
            </form>
        </Layout>
    );
}