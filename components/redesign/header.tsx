import styles from '@/styles/layout.module.css';

export default function Header() {
    return (
    <div className={styles.header}>
        <h1 className={styles.headerTitle}>
        Pokémon CCG
        </h1>
    </div>
    );
}