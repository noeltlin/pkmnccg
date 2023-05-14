import { Pack, Collection } from '@/lib/db';

export default async function handler(req, res) {
    const item = req.body;
    const packs = {};

    for (let i = 0; i < item.id.length; i++) {
        const currentId = item.id[i];

        const targetPack = await Pack.find({ packid: currentId });

        const packObj = {
            id: targetPack[0].packid,
            name: targetPack[0].name,
            image: targetPack[0].image,
            packtype: targetPack[0].packtype,
            common: targetPack[0].common,
            uncommon: targetPack[0].uncommon,
            rare: targetPack[0].rare
        }

        packs[packObj.id] = packObj;

    };
    
    res.status(200).json(packs);
}   