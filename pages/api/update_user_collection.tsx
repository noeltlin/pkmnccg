import { User, Collection } from '@/lib/db';

export default async function handler(req, res) {
    const request = req.body.request;
    const userId = req.body.userid;
    const items = req.body.items;

    console.log('arguments:');
    console.log('request:', request);
    console.log('userId:', userId);
    console.log('items:', items);

    const userCollection = await Collection.findOne({ userid: userId });

    for (let i = 0; i < items.length; i++) {
        const currentId = items[i].id;
        const currentAdd = items[i].quantity;
        if (!userCollection.cards[currentId]) {
            userCollection.cards[currentId] = {id: currentId, quantity: 0};
        }
        let currentItem = userCollection.cards[currentId];
        console.log('quantity before incrementing:', currentItem.quantity);
        console.log('quantity after incrementing:', currentItem.quantity + currentAdd);
        currentItem.quantity += currentAdd;
        console.log(userCollection.cards[currentId]);
    }

    console.log(userCollection.cards);

    userCollection.markModified('cards');

    userCollection.save()
        .then(() => console.log('Collection updated'))
        .catch(err => console.error('Error updating collection', err));

    res.status(200).end();
}

/*

export async function updateUserCollection(request, userid, packs, cards) {
    const res = await fetch('http://localhost:3000/api/get_cards_revised',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ request, userid, packs, cards })
        });
    const data = await res.json();
    return data;
}

*/