import * as argon2 from 'argon2';

import { User, Collection } from '@/lib/db';

export default async function handler(req, res) {
    const body = req.body

    let n = 0;
    let uniqueId = false;

    while (!uniqueId) {
        n++;
        uniqueId = ((await User.find({ userid: { $in: [n] } })).length == 0) ? true : false;
    }

    const newId = n;

    const hash = await argon2.hash(body.password);

    const newUser = new User({
        userid: newId,
        username: body.username,
        password: hash,
        email: body.email
    });

    newUser.save()
        .then(() => console.log('New user created'))
        .catch(err => console.error('Error creating user', err));

    const newCollection = new Collection({
        userid: newId,
        cards: {},
        packs: {}
    });

    newCollection.save()
        .then(() => console.log('User collection created'))
        .catch(err => console.error('Error creating collection', err));

    res.redirect(307, '/redesign/card_collection');
}