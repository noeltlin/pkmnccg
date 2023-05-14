import { Pack } from '@/lib/db';
import pokemon from 'pokemontcgsdk'

pokemon.configure({ apiKey: '4a627205-6b4e-4223-be4b-495f5213e336' });

export default async function handler(req, res) {
    const packId = req.body;

    async function getData(id) {
        const packQuery = await Pack.find({ packid: id });
        const allowedTypes = packQuery[0].types;
        const allowedSubtypes = packQuery[0].subtypes;
        const allowedNames = packQuery[0].names;
        const allowedGenerations = packQuery[0].generations;
        const packType = packQuery[0].packtype;
        let commonQueryString;
        let uncommonQueryString;
        let rareQueryString;

        // typeString
        const typeArr = [];
        for (let i = 0; i < allowedTypes.length; i++) {
            if (i != allowedTypes.length - 1) {
                typeArr.push(`types:"${allowedTypes[i]}"`);
                typeArr.push('OR');
            } else {
                typeArr.push(`types:"${allowedTypes[i]}"`);
            }
        }
        const typeString = typeArr.join(' ');

        // subtypeString
        const subtypeArr = [];
        for (let i = 0; i < allowedSubtypes.length; i++) {
            if (i != allowedSubtypes.length - 1) {
                subtypeArr.push(`subtypes:"${allowedSubtypes[i]}"`);
                subtypeArr.push('OR');
            } else {
                subtypeArr.push(`subtypes:"${allowedSubtypes[i]}"`);
            }
        }
        const subtypeString = subtypeArr.join(' ');

        // nameString
        if (allowedNames.length > 0) {
            const nameArr = [];
            for (let i = 0; i < allowedNames.length; i++) {
                if (i != allowedNames.length - 1) {
                    nameArr.push(`name:"${allowedNames[i]}"`);
                    nameArr.push('OR');
                } else {
                    nameArr.push(`name:"${allowedNames[i]}"`);
                }
            }
            const nameString = nameArr.join(' ');
            commonQueryString = `(${typeString}) AND (${subtypeString}) AND (${nameString}) AND (rarity:common)`;
            uncommonQueryString = `(${typeString}) AND (${subtypeString}) AND (${nameString}) AND (rarity:uncommon)`;
            rareQueryString = `(${typeString}) AND (${subtypeString}) AND (${nameString}) AND (rarity:rare)`;
        } else {
            commonQueryString = `(${typeString}) AND (${subtypeString}) AND (rarity:common)`;
            uncommonQueryString = `(${typeString}) AND (${subtypeString}) AND (rarity:uncommon)`;
            rareQueryString = `(${typeString}) AND (${subtypeString}) AND (rarity:rare)`;
        }

        const commonPackArr = await pokemon.card.all({ q: commonQueryString });
        const uncommonPackArr = await pokemon.card.all({ q: uncommonQueryString });
        const rarePackArr = await pokemon.card.all({ q: rareQueryString });
        const packCards = [];

        function populatePack(quantity, rarity) {
            const packArr =
                rarity == 'uncommon' ? uncommonPackArr
                    : rarity == 'rare' ? rarePackArr
                        : commonPackArr;

            for (let i = 0; i < quantity; i++) {
                let max = packArr.length - 1;
                let min = 0;
                let index = Math.floor(Math.random() * (max - min + 1)) + min;
                let card = packArr[index];
                packCards.push(card);
                console.log(`${packCards.length}: ${card.rarity}`);
            }
        }

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

        return packCards;
    }

    const cards = await getData(packId);
    res.status(200).json({ cards });
}