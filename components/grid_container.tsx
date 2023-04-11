import styles from '@/styles/grid.module.css';
import PackModal from '@/components/pack_modal';

export default function GridContainer({ children }) {
    return (
    <div className = {styles.gridContainer}>{children}</div>
    );
}