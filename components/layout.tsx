import Header from '@/components/redesign/header';

import styles from '@/styles/layout.module.css';

export default function Layout({ children }) {
    return <div className={styles.container}>
        <Header />
        <div className={styles.body}>{children}</div>
    </div>;
}   