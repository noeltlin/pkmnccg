import { useState } from 'react';
import { useRouter } from 'next/router';

import styles from '@/styles/test.module.css';

import CardGroup from '@/components/redesign/card_group';

export default function NewPackForm() {
    const [cardGroups, setCardGroups] = useState([0]);
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    const addCardGroup = () => {
        console.log('function called');
        const newIndex = cardGroups.length;
        setCardGroups([...cardGroups, newIndex]);
    };

    const clearCardGroups = () => {
        setCardGroups([0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (submitted) {
            const form = event.target;
            const formData = new FormData(form);
            const name = formData.get('name');
            const id = formData.get('packId');
            const types = formData.getAll('packTypes');
            const groups = cardGroups.map(i => {
                return {
                    cardSubtypes: formData.getAll(`cardSubtypes${i}`),
                    cardTypes: formData.getAll(`cardTypes${i}`),
                    cardNumbers: formData.getAll(`cardNumbers${i}`)
                };
            });
            const res = await fetch('http://localhost:3000/api/create_pack', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, id, types, groups })
            });

            await res.status;
        }
    }

    return (
        <form className={styles.newPackForm} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Pack Name</label>
                <br />
                <input type="text" name="name" />
            </div>
            <br />
            <div>
                <label htmlFor="packId">Pack ID</label>
                <br />
                <input type="text" name="packId" />
            </div>
            <br />

            <div>
                <label htmlFor="packTypes">Pack Types</label>
                <div>
                    <input type="checkbox" name="packTypes" id="standard" value="standard" />
                    <label htmlFor="standard">Standard</label>
                </div>
                <div>
                    <input type="checkbox" name="packTypes" id="mini" value="mini" />
                    <label htmlFor="mini">Mini</label>
                </div>
                <div>
                    <input type="checkbox" name="packTypes" id="premium" value="premium" />
                    <label htmlFor="premium">Premium</label>
                </div>
            </div>
            <br />
            <div className={styles.cardGroupContainer}>
                {cardGroups.map(i => <CardGroup id={i} key={i} />)}
            </div>
            <div>
                <button onClick={addCardGroup}>add new card group</button>
                <button onClick={clearCardGroups}>clear card groups</button>
            </div>
            <br />
            <div>
                <input type="submit" onClick={() => setSubmitted(true)} />
            </div>
        </form>
    );
}