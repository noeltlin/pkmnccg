import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';

import Layout from '@/components/layout';
import PackWindow from '@/components/redesign/pack_window';
import Card from '@/components/card';

import { getSessionCookie } from '@/lib/session_context';
import { getUser, getUserCollection, getCards, getPacks } from '@/pages/api/handlers';
import ActivePack, { useActivePack } from '@/lib/pack_context';

import styles from '@/styles/packs.module.css';

export default function Main({ userData, collectionData, cardData }) {
    const router = useRouter();

    useEffect(() => {
        if (!Object.keys(userData).length) {
            router.push('/redesign/sign_in');
        }
    }, [userData]);

    if (!Object.keys(userData).length) {
        return null;
    }

    // figure out how to persist booster (https://react.dev/reference/react/useMemo)
    const booster = useMemo(() => { return JSON.parse(localStorage.getItem('activePack')); }, []);
    //localStorage.removeItem('activePack');
    //const booster = JSON.parse(localStorage.getItem('activePack'));

    /*useEffect(() => {
        const storedPack = JSON.parse(localStorage.getItem('activePack'));
    }, []);*/

    //const [activePack, setActivePack]: any = useActivePack();
    const [activeCard, setActiveCard] = useState(0);

    let margin = 22 - ((activeCard - 1) * 8);

    function moveCardLeft(active) {
        console.log('moveCardLeft() called');
        console.log(activeCard);
        if (active > 0) {
            setActiveCard(active - 1);
        }
    }

    function moveCardRight(active) {
        console.log('moveCardRight() called');
        console.log(activeCard);
        if (active < 6) {
            setActiveCard(active + 1);
        }
    }

    return (
        <ActivePack>
            <Layout>
                <div className={styles.cardContainer}>
                    <div style={{ margin: `0 ${margin}rem` }}>
                        <Card
                            id={0}
                            image={booster.pack[0].image}
                            isActive={activeCard === 0}
                            setActive={() => setActiveCard(0)}
                            position={(0 - (Math.abs(activeCard - 0))) + 6}
                            key={0} />

                        <Card
                            id={1}
                            image={booster.pack[1].image}
                            isActive={activeCard === 1}
                            setActive={() => setActiveCard(1)}
                            position={(0 - (Math.abs(activeCard - 1))) + 6}
                            key={1} />

                        <Card
                            id={2}
                            image={booster.pack[2].image}
                            isActive={activeCard === 2}
                            setActive={() => setActiveCard(2)}
                            position={(0 - (Math.abs(activeCard - 2))) + 6}
                            key={2} />

                        <Card
                            id={3}
                            image={booster.pack[3].image}
                            isActive={activeCard === 3}
                            setActive={() => setActiveCard(3)}
                            position={(0 - (Math.abs(activeCard - 3))) + 6}
                            key={3} />

                        <Card
                            id={4}
                            image={booster.pack[4].image}
                            isActive={activeCard === 4}
                            setActive={() => setActiveCard(4)}
                            position={(0 - (Math.abs(activeCard - 4))) + 6}
                            key={4} />

                        <Card
                            id={5}
                            image={booster.pack[5].image}
                            isActive={activeCard === 5}
                            setActive={() => setActiveCard(5)}
                            position={(0 - (Math.abs(activeCard - 5))) + 6}
                            key={5} />

                        <Card
                            id={6}
                            image={booster.pack[6].image}
                            isActive={activeCard === 6}
                            setActive={() => setActiveCard(6)}
                            position={(0 - (Math.abs(activeCard - 6))) + 6}
                            key={6} />
                    </div>

                    <button onClick={() => { moveCardLeft(activeCard) }}>←</button>
                    <button onClick={() => { moveCardRight(activeCard) }}>→</button>
                </div>
            </Layout>
        </ActivePack>
    );
}

export async function getServerSideProps(context) {
    const session = getSessionCookie(context);
    const userId = session?.id;

    let userData = {};
    let collectionData = {};
    let cardData = {};
    let packData = {};

    if (userId) {
        [userData, collectionData] = await Promise.all([
            getUser(userId),
            getUserCollection(userId)
        ]);

        const cardIds = Object.keys(collectionData.cards);
        const packIds = Object.keys(collectionData.packs);

        [cardData, packData] = await Promise.all(
            [
                getCards('findId', cardIds),
                getPacks(packIds)
            ]);

    }

    return {
        props: {
            userData,
            collectionData,
            cardData,
            packData
        }
    }
}
