import { getUser, getUserCollection, getCards, getPacks } from '@/pages/api/handlers';
import { RevisedPack } from '@/lib/db';
import Layout from '@/components/layout';

export default function Main(pack) {
    console.log(pack);
    const newData = pack.pack.data;
    const handleCreate = async () => {
        const res = await fetch('http://localhost:3000/api/newpack', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ newData })
        });
    }

    const handleGet = async () => {
        const res = await getCardsRevised('fillPack', [1]);
    }

    return (
        <Layout>
            <div>
                <button onClick={handleCreate}>create new pack</button>
                <br />
                <button onClick={handleGet}>get new pack</button>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {

    const pack = await getCardsRevised('newPack', [1]);
    console.log('getServerSideProps pack data:');
    console.log(pack);

    return {
        props: {
            pack
        }
    }
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