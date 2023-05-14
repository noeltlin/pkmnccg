import styles from '@/styles/packs.module.css';
import Card from '@/components/card';
import { useState } from 'react';
import { CardData } from '@/data/dummy';
import { useUserContext } from '@/user_context';
import { usePackContext } from '@/lib/pack_context';

export default function CardContainer( ) {
    const user: any = useUserContext();
    const activePack: any = usePackContext();
    const [activeIndex, setActiveIndex] = useState(0);
    
    let margin = 22 - ((activeIndex - 1) * 8);

    function generateCards() {
        const cardArr: any = [];
        let cards: any = Object.entries(user.cardCollection);

        for (let i = 0; i < 7; i++) {
            let currentId: any = activePack[i];

            cardArr.push(<Card
            id = {currentId}
            isActive = { activeIndex === i}
            setActive = {() => setActiveIndex(i)}
            position = {(0 - (Math.abs(activeIndex - i))) + 6}
            key = {i} />);
        }

        return cardArr;
        
    };

    const cards = generateCards();

    function moveCardLeft(active) {
        console.log('moveCardLeft() called');
        console.log(activeIndex);
        if (active > 0) {
            setActiveIndex(active - 1);
        }
    }

    function moveCardRight(active) {
        console.log('moveCardRight() called');
        console.log(activeIndex);
        if (active < 6) {
            setActiveIndex(active + 1);
        }
    }

    return (
        <div className = {styles.cardContainer}>
            <div style = {{margin: `0 ${margin}rem`}}>{ cards }</div>

            <button onClick = {() => { moveCardLeft(activeIndex) }}>←</button>
            <button onClick = {() => { moveCardRight(activeIndex) }}>→</button>
        </div>
    );
}