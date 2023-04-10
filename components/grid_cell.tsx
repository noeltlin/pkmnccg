import styles from '@/styles/grid.module.css';

export default function GridCell({ title, image, quantity  }) {
    return (
    <div className = {styles.gridCell}>
        <h1>{title}</h1>
        <span className = {styles.cardQuantity}>{quantity}</span>
        <img src = {image} alt = "" />
    </div>
    );
}   