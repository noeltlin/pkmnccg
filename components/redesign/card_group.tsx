import { useState } from 'react';

import styles from '@/styles/test.module.css';

export default function CardGroup(component) {
    const id = component.id;
    const [custom, setCustom] = useState('');

    const cardTypes = `cardTypes${id}`;
    const cardSubtypes = `cardSubtypes${id}`;
    const cardNumbers = `cardNumbers${id}`;

    return (
        <div className={styles.cardGroup}><label htmlFor="cardGroup">Card Properties</label>
            <div className={styles.cardGroupGrid}>

                <div className={styles.cardSubtypes}>
                    <label htmlFor={cardSubtypes}>Subtypes:</label>
                    <div>
                        <input type="checkbox" name={cardSubtypes} id="basic" value="basic" />
                        <label htmlFor="basic">Basic</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardSubtypes} id="stage1" value="stage 1" />
                        <label htmlFor="stage1">Stage 1</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardSubtypes} id="stage2" value="stage 2" />
                        <label htmlFor="stage2">Stage 2</label>
                    </div>
                </div>

                <div className={styles.cardTypes}>
                    <label htmlFor={cardTypes}>Types:</label>
                    <div>
                        <input type="checkbox" name={cardTypes} id="colorless" value="colorless" />
                        <label htmlFor="colorless">Colorless</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardTypes} id="dark" value="dark" />
                        <label htmlFor="dark">Dark</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardTypes} id="dragon" value="dragon" />
                        <label htmlFor="dragon">Dragon</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardTypes} id="fairy" value="fairy" />
                        <label htmlFor="fairy">Fairy</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardTypes} id="fighting" value="fighting" />
                        <label htmlFor="fighting">Fighting</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardTypes} id="fire" value="fire" />
                        <label htmlFor="fire">Fire</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardTypes} id="grass" value="grass" />
                        <label htmlFor="grass">Grass</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardTypes} id="lightning" value="lightning" />
                        <label htmlFor="lightning">Lightning</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardTypes} id="metal" value="metal" />
                        <label htmlFor="metal">Metal</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardTypes} id="psychic" value="psychic" />
                        <label htmlFor="psychic">Psychic</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardTypes} id="water" value="water" />
                        <label htmlFor="water">Water</label>
                    </div>
                </div>

                <div className={styles.cardNumbers}>
                    <label htmlFor={cardNumbers}>Pokédex Number:</label>
                    <div>
                        <input type="checkbox" name={cardNumbers} id="kanto" value="[1 TO 151]" />
                        <label htmlFor="kanto">Gen 1 (Kanto) [#1-151]</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardNumbers} id="johto" value="[152 TO 251]" />
                        <label htmlFor="johto">Gen 2 (Johto) [#152-251]</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardNumbers} id="hoenn" value="[252 TO 386]" />
                        <label htmlFor="hoenn">Gen 3 (Hoenn) [#252-386]</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardNumbers} id="sinnoh" value="[387 TO 493]" />
                        <label htmlFor="sinnoh">Gen 4 (Sinnoh) [#387-493]</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardNumbers} id="unova" value="[494 TO 649]" />
                        <label htmlFor="unova">Gen 5 (Unova) [#494-649]</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardNumbers} id="kalos" value="[650 TO 721]" />
                        <label htmlFor="kalos">Gen 6 (Kalos) [#650-721]</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardNumbers} id="alola" value="[722 TO 809]" />
                        <label htmlFor="alola">Gen 7 (Alola) [#722-809]</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardNumbers} id="galar" value="[810 TO 905]" />
                        <label htmlFor="galar">Gen 8 (Galar) [#810-905]</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardNumbers} id="paldea" value="[906 TO 1010]" />
                        <label htmlFor="paldea">Gen 9 (Paldea) [#906-1010]</label>
                    </div>
                    <div>
                        <input type="checkbox" name={cardNumbers} id="custom" value={custom} />
                        <label htmlFor="custom">Custom (comma-delimited): </label>
                        <br />
                        <input type="text" name="customText" id="customText" defaultValue="[min TO max] and/or #" onChange={e => setCustom(e.target.value)} />
                    </div>
                </div>

            </div>
        </div>
    );
}

/*
1 = pokedex #1-151
2 = pokedex #152-251
3 = pokedex #252-386
4 = pokedex #387-493
5 = pokedex #494-649
6 = pokedex #650-721
7 = pokedex #722-809
8 = pokedex #810-905
9 = pokedex #906-1010
*/