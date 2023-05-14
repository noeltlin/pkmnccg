import Layout from '@/components/layout';
import { useSession } from 'next-auth/react';

export default function Main() {
    const { data: session } = useSession();
    return (
        <Layout>
            <form action="/api/sign_in" method="post">
                <label htmlFor="username">Username</label>
                <br />
                <input type="text" id="username" name="username" required />
                <br />
                <label htmlFor="password">Password</label>
                <br/>
                <input type="text" id="password" name="password" required />
                <br/>
                <button type="submit">Submit</button>
            </form>
        </Layout>
    );
}