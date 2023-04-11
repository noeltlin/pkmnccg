import styles from '@/styles/grid.module.css';

export default function PackModal({ title, image, isOpen, resetState }) {
    let visibility;
    (isOpen) ? visibility = "block" : visibility = "none";

    return (
        <div className = {styles.packModal} style = {{display: visibility}}>
            <div className = {styles.modalContent}>
                <span className = {styles.returnArrow} onClick = {resetState}>↩</span>
                <h1>{title}</h1>
                <img src = {image} alt = "" />

                <div className = {styles.buttonLane}>
                <button >OPEN</button>
                <button >TRADE</button>
                <button >INFO</button>
                </div>
            </div>
        </div>
    );
}