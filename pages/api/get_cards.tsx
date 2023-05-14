/* card object format:

card {
    id: 'id string',
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
            console.log('#1');
            const packId = item.id[0];
            const packQuery = await Pack.find({ packid: packId });
            console.log('#2');

            const allowedSubtypes = packQuery[0].subtypes;
            const allowedTypes = packQuery[0].types;
            const allowedNames = packQuery[0].names;
            const allowedGenerations = packQuery[0].generations;

            const packType = packQuery[0].packtype;

            // subtypeString
            const subtypes = [];
            for (let i = 0; i < allowedSubtypes.length; i++) {
                if (!allowedSubtypes.length) {
                } else if (i != allowedSubtypes.length - 1) {
                    subtypes.push(`subtypes:"${allowedSubtypes[i]}"`);
                    subtypes.push('OR');
                } else {
                    subtypes.push(`subtypes:"${allowedSubtypes[i]}"`);
                }
            }
            const subtypeString = subtypes.length ? `(${subtypes.join(" ")})` : '';

            // typeString
            const types = [];
            for (let i = 0; i < allowedTypes.length; i++) {
                if (!allowedTypes.length) {
                } else if (i != allowedTypes.length - 1) {
                    types.push(`types:"${allowedTypes[i]}"`);
                    types.push('OR');
                } else {
                    types.push(`types:"${allowedTypes[i]}"`);
                }
            }
            const typeString = types.length ? `(${types.join(" ")})` : '';

            // nameString
            const names = [];
            for (let i = 0; i < allowedNames.length; i++) {
                if (!allowedNames.length) {
                } else if (i != allowedNames.length - 1) {
                    names.push(`name:"${allowedNames[i]}"`);
                    names.push('OR');
                } else {
                    names.push(`name:"${allowedNames[i]}"`);
                }
            }
            const nameString = names.length ? `(${names.join(" ")})` : '';

            const stringArray = [subtypeString, typeString, nameString];
            const queryArray = [];

            for (let i = 0; i < stringArray.length; i++) {
                if (stringArray[i]) {
                    queryArray.push(stringArray[i]);
                }
            }

            const query = !queryArray.length ? '' : `${queryArray.join(' AND ')} AND `;
            const exclude = `-set.name:"McDonald's Collection 2014" -set.name:"McDonald's Collection 2015" -set.name:"McDonald's Collection 2017" -set.name:"McDonald's Collection 2018"`;

            const commonQuery = `${query}(rarity:common) ${exclude}`;
            const uncommonQuery = `${query}(rarity:uncommon) ${exclude}`;
            const rareQuery = `${query}(rarity:rare) ${exclude}`;

            console.log('#3');

            const [commonPack, uncommonPack, rarePack] = await Promise.all([
                pokemon.card.all({ q: commonQuery }),
                pokemon.card.all({ q: uncommonQuery }),
                pokemon.card.all({ q: rareQuery })
            ]);

            console.log('#4');

            const packCards = [];
            const idArray = [];

            const populatePack = (quantity, rarity) => {
                const packArray =
                    rarity == 'uncommon' ? uncommonPack
                        : rarity == 'rare' ? rarePack
                            : commonPack;

                for (let i = 0; i < quantity; i++) {
                    const max = packArray.length - 1;
                    const min = 0;
                    const index = Math.floor(Math.random() * (max - min + 1)) + min;
                    const targetCard = packArray[index];
                    const cardObj = {
                        id: targetCard.id,
                        name: targetCard.name,
                        subtype: targetCard.subtypes[0],
                        type: targetCard.types,
                        rarity: targetCard.rarity,
                        image: targetCard.images.large
                    }
                    packCards.push(cardObj);
                }
            }

            console.log('#5');

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

            console.log('#6');

            cards.pack = packCards;

            break;
            

        /*case 'newPack':

            console.log('#1');
            const packId = item.id[0];
            const packQuery = await Pack.find({ packid: packId });
            console.log('#2');

            const allowedSubtypes = packQuery[0].subtypes;
            const allowedTypes = packQuery[0].types;
            const allowedNames = packQuery[0].names;
            const allowedGenerations = packQuery[0].generations;

            const packType = packQuery[0].packtype;

            // subtypeString
            const subtypes = [];
            for (let i = 0; i < allowedSubtypes.length; i++) {
                if (!allowedSubtypes.length) {
                } else if (i != allowedSubtypes.length - 1) {
                    subtypes.push(`subtypes:"${allowedSubtypes[i]}"`);
                    subtypes.push('OR');
                } else {
                    subtypes.push(`subtypes:"${allowedSubtypes[i]}"`);
                }
            }
            const subtypeString = subtypes.length ? `(${subtypes.join(" ")})` : '';

            // typeString
            const types = [];
            for (let i = 0; i < allowedTypes.length; i++) {
                if (!allowedTypes.length) {
                } else if (i != allowedTypes.length - 1) {
                    types.push(`types:"${allowedTypes[i]}"`);
                    types.push('OR');
                } else {
                    types.push(`types:"${allowedTypes[i]}"`);
                }
            }
            const typeString = types.length ? `(${types.join(" ")})` : '';

            // nameString
            const names = [];
            for (let i = 0; i < allowedNames.length; i++) {
                if (!allowedNames.length) {
                } else if (i != allowedNames.length - 1) {
                    names.push(`name:"${allowedNames[i]}"`);
                    names.push('OR');
                } else {
                    names.push(`name:"${allowedNames[i]}"`);
                }
            }
            const nameString = names.length ? `(${names.join(" ")})` : '';

            const stringArray = [subtypeString, typeString, nameString];
            const queryArray = [];

            for (let i = 0; i < stringArray.length; i++) {
                if (stringArray[i]) {
                    queryArray.push(stringArray[i]);
                }
            }

            const query = !queryArray.length ? '' : `${queryArray.join(' AND ')} AND `;
            const exclude = `-set.name:"McDonald's Collection 2014" -set.name:"McDonald's Collection 2015" -set.name:"McDonald's Collection 2017" -set.name:"McDonald's Collection 2018"`;

            const commonQuery = `${query}(rarity:common) ${exclude}`;
            const uncommonQuery = `${query}(rarity:uncommon) ${exclude}`;
            const rareQuery = `${query}(rarity:rare) ${exclude}`;

            console.log('#3');

            const [commonPack, uncommonPack, rarePack] = await Promise.all([
                pokemon.card.all({ q: commonQuery, select: 'id' }),
                pokemon.card.all({ q: uncommonQuery, select: 'id' }),
                pokemon.card.all({ q: rareQuery, select: 'id' })
            ]);

            console.log('#4');

            cards.data = {
                common: commonPack,
                uncommon: uncommonPack,
                rare: rarePack
            };
            break;
            */
    }

    //console.log(cards);
    res.status(200).json(cards);

}