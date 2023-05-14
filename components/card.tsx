import styles from '@/styles/packs.module.css';

export default function Card({ id, image, isActive, setActive, position }) {

    let cardType;

    if (isActive) {
        cardType = styles.activeCard;
    } else {
        cardType = styles.bgCard;
    }

    return (
        <img className = {cardType} src = {image} style = {{zIndex: position}} />
    );
}