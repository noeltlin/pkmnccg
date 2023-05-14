import { RevisedPack } from '@/lib/db';

export default async function handler(req, res) {
    const newPack = req.body.newData;

    const addCard = new RevisedPack({
        packid: 1,
        name: '',
        image: '',
        packtype: 'standard',
        common: [],
        uncommon: [],
        rare: []
    });

    for (let i = 0; i < newPack.common.length; i++) {
        addCard.common.push(newPack.common[i].id);
    }

    for (let i = 0; i < newPack.uncommon.length; i++) {
        addCard.uncommon.push(newPack.uncommon[i].id);
    }

    for (let i = 0; i < newPack.common.length; i++) {
        addCard.rare.push(newPack.common[i].id);
    }

    addCard.save()
        .then(() => console.log('New pack created'))
        .catch(err => console.error('Error creating pack', err));


    res.redirect(307, '/newpack');
}