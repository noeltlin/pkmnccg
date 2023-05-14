import { User, Collection } from '@/lib/db';

export default async function handler(req, res) {
    const userId = req.body.userid;

    const findUser = await Collection.findOne({ userid: userId });

    const data = {
        cards: findUser.cards ?? {},
        packs: findUser.packs ?? {}};

    res.status(200).json(data);
}   