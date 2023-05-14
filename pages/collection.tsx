import Layout from '@/components/layout';
import { UserData, CardData, PackData } from '@/data/dummy';
import { useUserContext } from '@/user_context';
import styles from '@/styles/test.module.css';
import GridCell from '@/components/grid_cell';
import GridContainer from '@/components/grid_container';
import { useState, useMemo } from 'react';

export default function Main() {
    const user: any = useUserContext();
    const [activeId, setActiveId] = useState(0);

    function createCells() {
        const cellArr: any = [];
        let cards: any = Object.entries(user.cardCollection);

        for (let i = 0; i < cards.length; i++) {
            let currentId: any = cards[i][1].id;
            let currentQuantity: any = cards[i][1].quantity;

            cellArr.push(<GridCell id={currentId}
                title={CardData(currentId).title}
                image={CardData(currentId).image}
                quantity={currentQuantity}
                isActive={activeId === currentId}
                setActive={() => setActiveId(currentId)}
                key={i} />);
        }

        console.log("createCells() was called");
        return cellArr;
    }

    const cells: any = useMemo(createCells, []);

    return (
        <Layout>
            <h1 style={{ marginLeft: '7.2rem' }}>{user.name}'s Card Collection</h1>
            <GridContainer>
            { cells }
            </GridContainer>
        </Layout>
    );
}