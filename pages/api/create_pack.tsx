import { Pack } from '@/lib/db';
import pokemon from 'pokemontcgsdk';

/*
pack id: [first three letters of pack color][pack range]-[pack type]
red1-s: Red 1 - Standard
red1-m: Red 1 - Mini
red1-p: Red 1 - Premium
blu1-s: Blue 1 - Standard
...

pack color: types of pokemon that can appear in the pack
Red: Fire, Fighting, Colorless (Basic)
Blue: Water, Psychic, Colorless (Basic)
Green: Grass, Lightning, Colorless (Basic)
Gold: Fire, Fighting, Dragon, Fairy, Colorless (Stage 1, Stage 2)
Silver: Water, Psychic, Metal, Colorless (Stage 1, Stage 2)
Crystal: Grass, Lightning, Dark, Colorless (Stage 1, Stage 2)
Rainbow: Dragon, Fairy, Metal, Dark, Colorless (Stage 1, Stage 2)

pack range: range of pokedex numbers corresponding to the pokemon that can appear in pack
①: 1-386 [Kanto, Johto, Hoenn]
②: 387-721 [Sinnoh, Unova, Kalos]
③: 722-1010 (722+) [Alola, Galar, Paldea]

pack type: amount of cards + ratio of common-uncommon-rare cards
Standard: 4 common, 2 uncommon, 1 rare
Mini: 2 common, 1 uncommon
Premium: 4 uncommon, 3 rare

*/

pokemon.configure({ apiKey: '4a627205-6b4e-4223-be4b-495f5213e336' });

export default async function handler(req, res) {

    const packObject = {
        name: req.body.name,
        id: req.body.id,
        types: req.body.types,
        common: [],
        uncommon: [],
        rare: []
    }

    const cardGroups = req.body.groups;

    for (let i = 0; i < cardGroups.length; i++) {
        const allowedSubtypes = cardGroups[i].cardSubtypes;
        const allowedTypes = cardGroups[i].cardTypes;
        const allowedNumbers = cardGroups[i].cardNumbers;

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

        // numberString
        const numbers = [];
        const lastNumbers = allowedNumbers.length - 1;
        if (allowedNumbers[lastNumbers].split(', ').length > 1) {
            const presetNumbers = allowedNumbers.slice(0, lastNumbers);
            const customNumbers = allowedNumbers[lastNumbers].split(', ');
            for (let i = 0; i < presetNumbers.length; i++) {
                if (!presetNumbers.length) {
                } else {
                    numbers.push(`nationalPokedexNumbers:${presetNumbers[i]}`);
                    numbers.push('OR');
                }
            }
            for (let i = 0; i < customNumbers.length; i++) {
                if (i != customNumbers.length - 1) {
                    numbers.push(`nationalPokedexNumbers:${customNumbers[i]}`);
                    numbers.push('OR');
                } else {
                    numbers.push(`nationalPokedexNumbers:${customNumbers[i]}`)
                }
            }
        } else {
            for (let i = 0; i < allowedNumbers.length; i++) {
                if (!allowedNumbers.length) {
                } else if (i != allowedNumbers.length - 1) {
                    numbers.push(`nationalPokedexNumbers:${allowedNumbers[i]}`);
                    numbers.push('OR');
                } else {
                    numbers.push(`nationalPokedexNumbers:${allowedNumbers[i]}`);
                }
            }
        }
        const numberString = numbers.length ? `(${numbers.join(" ")})` : '';

        const stringArray = [subtypeString, typeString, numberString];
        const queryArray = stringArray.filter(elem => elem.length);

        const query = !queryArray.length ? '' : `${queryArray.join(' AND ')} AND `;
        const exclude = `-set.name:"McDonald's Collection 2014" -set.name:"McDonald's Collection 2015" -set.name:"McDonald's Collection 2017" -set.name:"McDonald's Collection 2018"`;

        const commonQuery = `${query}(rarity:common) ${exclude}`;
        const uncommonQuery = `${query}(rarity:uncommon) ${exclude}`;
        const rareQuery = `${query}(rarity:rare) ${exclude}`;

        const [commonIds, uncommonIds, rareIds] = await Promise.all([
            pokemon.card.all({ q: commonQuery, select: 'id' }),
            pokemon.card.all({ q: uncommonQuery, select: 'id' }),
            pokemon.card.all({ q: rareQuery, select: 'id' })
        ]);

        for (let i = 0; i < commonIds.length; i++) {
            packObject.common.push(commonIds[i]);
        }
        for (let i = 0; i < uncommonIds.length; i++) {
            packObject.uncommon.push(uncommonIds[i]);
        }
        for (let i = 0; i < rareIds.length; i++) {
            packObject.rare.push(rareIds[i]);
        }
    }

    for (let i = 0; i < packObject.types.length; i++) {
        const packType = packObject.types[i];

        if (packType === 'standard') {
            const newPack = new Pack({
                packid: `${packObject.id}-s`,
                name: `${packObject.name} - Standard`,
                image: '',
                packtype: packObject.types[i],
                common: packObject.common,
                uncommon: packObject.uncommon,
                rare: packObject.rare
            });

            newPack.save()
                .then(() => console.log(`New pack created: ${newPack.name} [${newPack.packid}]`))
                .catch(err => console.error(`Error creating pack: ${newPack.name} [${newPack.packid}]`, err));

        } else if (packType === 'mini') {
            const newPack = new Pack({
                packid: `${packObject.id}-m`,
                name: `${packObject.name} - Mini`,
                image: '',
                packtype: packObject.types[i],
                common: packObject.common,
                uncommon: packObject.uncommon
            });

            newPack.save()
                .then(() => console.log(`New pack created: ${newPack.name} [${newPack.packid}]`))
                .catch(err => console.error(`Error creating pack: ${newPack.name} [${newPack.packid}]`, err));

        } else if (packType === 'premium') {
            const newPack = new Pack({
                packid: `${packObject.id}-p`,
                name: `${packObject.name} - Premium`,
                image: '',
                packtype: packObject.types[i],
                uncommon: packObject.uncommon,
                rare: packObject.rare
            });

            newPack.save()
                .then(() => console.log(`New pack created: ${newPack.name} [${newPack.packid}]`))
                .catch(err => console.error(`Error creating pack: ${newPack.name} [${newPack.packid}]`, err));
        } else {
            console.log('No pack type specified');
        }
    }

    res.status(200).redirect('/redesign/admin', 302);

}