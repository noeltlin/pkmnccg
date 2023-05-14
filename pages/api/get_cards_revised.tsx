/* card object format:

card {
    id: #,
    name: 'card name',
    subtype: 'basic/stage 1/stage 2',
    type: ['type1', 'type2'],
    rarity: 'common/uncommon/rare',
    image: 'url',
    generation: #  // based on ranges
                1 = pokedex #1-151
                2 = pokedex #152-251
                3 = pokedex #252-386
                4 = pokedex #387-493
                5 = pokedex #494-649
                6 = pokedex #650-721
                7 = pokedex #722-809
                8 = pokedex #810-905
                9 = pokedex #906-1010
}

*/

import { Pack } from '@/lib/db';
import pokemon from 'pokemontcgsdk'

pokemon.configure({ apiKey: process.env.PKMN_API_KEY });

export default async function handler(req, res) {
    const item = req.body;
    const cards = {};

    switch (item.request) {
        case 'findId':
            for (let i = 0; i < item.id.length; i++) {
                const currentId = item.id[i];
                const targetCard = await pokemon.card.find(currentId);
                const cardObj = {
                    id: targetCard.id,
                    name: targetCard.name,
                    subtype: targetCard.subtypes[0],
                    type: targetCard.types,
                    rarity: targetCard.rarity,
                    image: targetCard.images.large
                }

                cards[cardObj.id] = cardObj;
            };
            break;

        case 'fillPack':
            const packId = item.id[0];

            console.log('#1');
            const packObj = await Pack.find({ packid: packId });
            console.log('#2');
            const commonPack = packObj[0].common;
            const uncommonPack = packObj[0].uncommon;
            const rarePack = packObj[0].rare;
            const packType = packObj[0].packtype;
            console.log(packObj);
            console.log('#3');

            const packCards = [];
            const idArray = [];

            const populatePack = (quantity, rarity) => {
                const packArray =
                    (rarity === 'uncommon') ? uncommonPack
                        : (rarity === 'rare') ? rarePack
                            : commonPack;
                console.log('#5');
                console.log(packArray);

                for (let i = 0; i < quantity; i++) {
                    const max = packArray.length - 1;
                    const min = 0;
                    const index = Math.floor(Math.random() * (max - min + 1)) + min;
                    idArray.push(packArray[index]);
                }
            }

            console.log('#4');

            switch (packType) {
                case 'standard':
                    populatePack(4, 'common');
                    populatePack(2, 'uncommon');
                    populatePack(1, 'rare');
                    break;

                case 'special':
                    populatePack(5, 'uncommon');
                    populatePack(2, 'rare');
                    break;

                case 'premium':
                    populatePack(4, 'uncommon');
                    populatePack(3, 'rare');
                    break;

                case 'mini':
                    populatePack(2, 'common');
                    populatePack(1, 'uncommon');
                    break;
            }

            console.log(idArray);
            console.log('#6');

            for (let i = 0; i < idArray.length; i++) {
                const currentCard = await pokemon.card.find(idArray[i].id);

                const cardObj = {
                    id: currentCard.id,
                    name: currentCard.name,
                    subtype: currentCard.subtypes[0],
                    type: currentCard.types,
                    rarity: currentCard.rarity,
                    image: currentCard.images.large
                }
                packCards.push(cardObj);
                console.log(`#${i + 1}: ${cardObj.rarity}`);
            }

            cards.pack = packCards;

            break;

    }

    // console.log(cards);
    res.status(200).json(cards);
}