import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { getSessionCookie } from '@/lib/session_context';
import { getUser } from '@/pages/api/handlers';

export default function AuthWrapper({ children, user }) {
    const router = useRouter();

    useEffect(() => {
        if (!Object.keys(user).length) {
            router.push('/redesign/sign_in'); // Redirects to sign in page
        }
    }, [user]);

    return <div>{children}</div>
}

export async function getServerSideProps(context) {
    const session = getSessionCookie(context);
    const userId = session?.id;

    let userData = {};
    let collectionData = {};
    let cardData = {};
    let packData = {};

    if (userId) {
        userData = await getUser(userId);
    }

    return {
        props: {
            userData,
            collectionData,
            cardData,
            packData
        }
    }
}