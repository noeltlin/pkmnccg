import { getSessionCookie } from '@/lib/session_context';
import { getUser, getUserCollection, getCards, getPacks } from '@/pages/api/handlers';

import Layout from '@/components/layout';
import NewPackForm from '@/components/redesign/new_pack_form';

export default function Main({ userData, collectionData, cardData, packData }) {
    const packsQuantity = Object.keys(collectionData.packs).length;
    const countCards = () => {
        const cards = Object.values(collectionData.cards);
        let total = 0;
        for (let i = 0; i < cards.length; i++) {
            total += cards[i].quantity;
        }
        return total;
    }
    const cardsTotal = countCards();

    const firstCardId = Object.keys(collectionData.cards)[0];
    const firstCardQuantity = collectionData.cards[firstCardId].quantity;
    const firstCardData = cardData[firstCardId];
    const firstCardItem = {id: firstCardId, quantity: 1};

    const secondCardId = Object.keys(collectionData.cards)[1];
    const secondCardQuantity = collectionData.cards[secondCardId].quantity;
    const secondCardData = cardData[secondCardId];
    const secondCardItem = {id: secondCardId, quantity: 1};

    const newCardId = 'sma-SV67';
    const newCardItem = {id: newCardId, quantity: 1};
    let newCardQuantity = 0;
    let newCardData = {};
    if (cardData[newCardId]) {
        newCardQuantity = collectionData.cards[newCardId].quantity;
        newCardData = cardData[newCardId];
    }

    return (
        <Layout>
            <NewPackForm />
            {/*
            <div>{userData.username} has {packsQuantity} kinds of packs and {cardsTotal} total cards.
            <br /><br />
            Your first card is {firstCardData.name}, and you currently own {firstCardQuantity} of them.
            <br />
            Your second card is {secondCardData.name}, and you currently own {secondCardQuantity} of them.</div>
            <br />
            {!cardData[newCardId] ?
            <div>You haven't obtained the new card yet.</div> :
            <div>You have obtained the new card, {newCardData.name}, and you currently own {newCardQuantity} of them.</div>}
            <br />
            <button onClick={() => updateUserCollection('addCards', userData.id, [firstCardItem])}>increment first card</button>
            <br />
            <button onClick={() => updateUserCollection('addCards', userData.id, [secondCardItem])}>increment second card</button>
            <br />
            <button onClick={() => updateUserCollection('addCards', userData.id, [firstCardItem, secondCardItem])}>increment both cards</button>
            <br />
            <button onClick={() => updateUserCollection('addCards', userData.id, [newCardItem])}>add new card</button>
            <br />
            <button>remove card</button>
            <br />
            <button>add pack</button>
            <br />
            <button>remove pack</button>
            <br />
            */}

            
        </Layout>
    );
}

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

export async function getCardsRevised(request, id) {
    const res = await fetch('http://localhost:3000/api/get_cards_revised',
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

export async function updateUserCollection(request, userid, items) {
    const res = await fetch('http://localhost:3000/api/update_user_collection',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ request, userid, items })
        });
    await res.status;
    console.log(res.statusText);
    //const data = await res.json();
    //return data;
}