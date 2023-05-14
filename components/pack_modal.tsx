import styles from '@/styles/grid.module.css';
import { UserData, CardData, PackData, generatePack } from '@/data/dummy';
import Link from 'next/link';

export default function PackModal({ title, image, packId, isOpen, resetState }) {
    let visibility;
    (isOpen) ? visibility = "block" : visibility = "none";

    let packType = PackData(packId).packtype;

    return (
        <div className = {styles.packModal} style = {{display: visibility}}>
            <div className = {styles.modalContent}>
                <span className = {styles.returnArrow} onClick = {resetState}>↩</span>
                <h1>{title}</h1>
                <img src = {image} alt = "" />

                <div className = {styles.buttonLane}>
                <Link href = "/pack_open"><button onClick = {() => { generatePack(packId, packType) }}>OPEN</button></Link>
                <button >TRADE</button> 
                <button >INFO</button>
                </div>
            </div>
        </div>
    );
}