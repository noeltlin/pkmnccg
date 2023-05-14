import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';

import { getSessionCookie } from '@/lib/session_context';
import { getUser, getUserCollection, getCards, getPacks } from '@/pages/api/handlers';

import Layout from '@/components/layout';
import GridContainer from '@/components/redesign/grid_container';
import GridCell from '@/components/redesign/grid_cell';
import Modal from '@/components/redesign/modal';
import Pagination from '@/components/redesign/pagination';

import styles from '@/styles/layout.module.css';

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

    // totalItems: the total number of cards in the user's collection
    const totalItems = Object.keys(collectionData.cards).length;

    // collectionArray: an array holding the id and quantity of each card
    // or pack in the user's collection
    const collectionArray = Object.values(collectionData.cards);

    // Selection
    // activeId: which card or pack is currently selected
    const [activeId, setActiveId] = useState('');

    // showModal: toggle modal window visibility
    let showModal = (activeId !== '') ? true : false;

    // modalProp: sets default prop values for when modal is not active
    const modalName = (activeId !== '') ? cardData[activeId].name : activeId;
    const modalImage = (activeId !== '') ? cardData[activeId].image : activeId;

    // Pagination
    // currentPage: which page the user is currently on
    const [currentPage, setCurrentPage] = useState(1);
    // pageSize: max cards or packs displayed per page
    const pageSize = 9;

    // currentData: dividing data into pages
    const data = Object.values(cardData ?? []);
    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    return (
        <Layout>
            <h1 className={styles.title}>{userData.username}'s Card Collection</h1>
            {!totalItems ?
                <div style={{ width: '60rem', margin: '30rem auto', textAlign: 'center' }}>
                    You have no cards! Go open a booster pack!
                </div>
                : ''}
            <GridContainer
                isEmpty={!totalItems}>
                {currentData.map(item => {
                    return (
                        // check if the user has any cards
                        !totalItems ? null :
                            <GridCell
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                quantity={collectionData.cards[item.id].quantity}
                                isActive={activeId === item.id}
                                setActive={() => setActiveId(item.id)}
                                key={item.id}
                            />
                    );
                })}
                <Modal
                    name={modalName}
                    image={modalImage}
                    itemId={activeId}
                    isOpen={showModal}
                    resetState={() => setActiveId('')}
                />
            </GridContainer>
            <Pagination
                currentPage={currentPage}
                pageChange={page => setCurrentPage(page)}
                pageSize={pageSize}
                dataSize={data.length}
                noPages={!totalItems}
            />
        </Layout>
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