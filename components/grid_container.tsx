import styles from '@/styles/grid.module.css';

export default function GridContainer({ children }) {
    return <div className = {styles.gridContainer}>{children}</div>;
}