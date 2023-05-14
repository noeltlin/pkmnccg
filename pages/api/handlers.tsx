/* getStaticProps template

import { getSessionCookie } from '@/lib/session_context';
import { getUser, getUserCollection, getCards, getPacks } from '@/pages/api/handlers';

export async function getServerSideProps(context) {
    const session = getSessionCookie(context);
    const userId = session?.id;

    let userData = {};
    let collectionData = {};
    let cardData = {};
    let packData = {};

    if (userId) {
        [userData, collectionData] = await Promise.all([
            getUser(userId),
            getUserCollection(userId)
        ]);

        const cardIds = Object.keys(collectionData.cards);
        const packIds = Object.keys(collectionData.packs);

        [cardData, packData] = await Promise.all(
            [
                getCards('findId', cardIds),
                getPacks(packIds)
            ]);
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

*/

export async function getUser(userid) {
    const res = await fetch('http://localhost:3000/api/get_user',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userid })
        });
    const data = await res.json();
    return data;
}

export async function getUserCollection(userid) {
    const res = await fetch('http://localhost:3000/api/get_user_collection',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userid })
        });
    const data = await res.json();
    return data;
}

/* get_cards handler
request types:
'findId' (id = array containing id(s) of card to get),
'fillPack' (id = array containing id of pack to generate cards for)
*/
export async function getCards(request, id) {
    const res = await fetch('http://localhost:3000/api/get_cards',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ request, id })
        });
    const data = await res.json();
    return data;
}

export async function getPacks(id) {
    const res = await fetch('http://localhost:3000/api/get_packs',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
    const data = await res.json();
    return data;
}