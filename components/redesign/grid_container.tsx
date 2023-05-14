import styles from '@/styles/grid.module.css';

export default function GridContainer({ children, isEmpty }) {
    if (isEmpty) {
        return null;
    }

    return (
    <div className = {styles.gridContainer}>{children}</div>
    );
}