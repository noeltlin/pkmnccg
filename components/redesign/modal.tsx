import { useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { getUser, getUserCollection, getCards, getPacks } from '@/pages/api/handlers';
import { useActivePack } from '@/lib/pack_context';

import styles from '@/styles/grid.module.css';

export default function Modal({ name, image, itemId, isOpen, resetState }) {
    const router = useRouter();

    const handleOpen = async () => {
        const res = await getCardsRevised('fillPack', [itemId]);
        console.log('getCardsRevised response:', res);
        localStorage.setItem('activePack', JSON.stringify(res));
        router.push('/redesign/open_pack');
    }

    let visibility;
    (isOpen) ? visibility = "block" : visibility = "none";
    return (
        <div className={styles.modal} style={{ display: visibility }}>

            <div className={styles.modalContent}>
            <span className = {styles.returnArrow} onClick = {resetState}> </span>
                <h1>{name}</h1>
                <img src={image} alt={name} />

                <div className={styles.buttonLane}>
                <button onClick={handleOpen}>OPEN</button>
                    <button >TRADE</button>
                    <button >INFO</button>
                </div>
            </div>
        </div>
    );

}

export async function getCardsRevised(request, id) {
    const res = await fetch('http://localhost:3000/api/get_cards_revised',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ request, id })
        });
    const data = await res.json();
    return data;
}