import styles from '@/styles/grid.module.css';

export default function GridCell({ id, name, image, quantity, isActive, setActive }) {
    isActive = false;
    const redPack = `${styles.card} ${styles.red}`;
    const bluePack = `${styles.card} ${styles.blue}`;
    const greenPack = `${styles.card} ${styles.green}`;
    const goldPack = `${styles.card} ${styles.gold}`;
    const silverPack = `${styles.card} ${styles.silver}`;
    const crystalPack = `${styles.card} ${styles.crystal}`;
    const rainbowPack = `${styles.card} ${styles.rainbow}`;

    if (image) {
        return (
            <div className={styles.gridCell} onClick={setActive}>
                <h1>{name}</h1>
                <span className={styles.cardQuantity}>{quantity}</span>
                <img src={image} alt={name} />
            </div>
        );
    } else {
        return (
            <div className={styles.gridCell} onClick={setActive}>
                <h1>{name}</h1>
                <span className={styles.cardQuantity}>{quantity}</span>
                <div className={crystalPack}>
                    <span className={styles.premium}>✪</span>
                    <p>
                        Red
                        <br />
                        ①
                    </p>
                </div>
            </div>
        );
    }
}   