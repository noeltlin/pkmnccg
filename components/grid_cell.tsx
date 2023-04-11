import styles from '@/styles/grid.module.css';
import PackModal from '@/components/pack_modal';

export default function GridCell({ id, title, image, quantity, isActive, setActive, onClick }) {
    id = id;
    isActive = false;

    return (
    <div className = {styles.gridCell} onClick = {setActive}>
        <h1>{title}</h1>
        <span className = {styles.cardQuantity}>{quantity}</span>
        <img src = {image} alt = "" />
    </div>
    );
}   