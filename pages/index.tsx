import Layout from '@/components/layout';
import Link from 'next/link';
import Form from '@/components/form';
import { useUserContext, setActiveUser } from '@/user_context';
import Pack from '@/lib/db';
import { useTestPackContext } from '@/test_pack_context';
import styles from '@/styles/packs.module.css';
import { useContext, useState } from 'react';
import ApiCard from '@/components/api_card';
import { signIn } from 'next-auth/react';

export default function Home() {
  const user: any = useUserContext();
  const testPack: any = useTestPackContext();

  const [pack, setPack] = useState([
    { images: { large: '/images/card_art/card_0.png' } },
    { images: { large: '/images/card_art/card_0.png' } },
    { images: { large: '/images/card_art/card_0.png' } },
    { images: { large: '/images/card_art/card_0.png' } },
    { images: { large: '/images/card_art/card_0.png' } },
    { images: { large: '/images/card_art/card_0.png' } },
    { images: { large: '/images/card_art/card_0.png' } }
  ]);

  const handleFetchPack = async (packid) => {
    const packId = packid;
    const packRes = await fetch('/api/open_pack', { method: "POST", body: JSON.stringify(packId) });
    const packData = await packRes.json();
    console.log(packData);
    setPack(packData.cards);
  }

  function generateApiCards() {
    const cardArr = [];
    for (let i = 0; i < pack.length; i++) {
      cardArr.push(<ApiCard image={pack[i].images.large} key={i} />);
    }

    return cardArr;
  }

  const apiCards = generateApiCards();

  return (
    <Layout>
      Pokémon CCG project
      <br />
      <button onClick={() => signIn('Credentials', { callbackUrl: '/redesign/card_collection'})}>click</button>
      <br />
      <Link href="/packs" >booster packs</Link>
      <br /><br />
      <Form />
      <br /><br />
      <a onClick={() => handleFetchPack(3)}><button>open Starters pack</button></a>
      <br />
      <a onClick={() => handleFetchPack(4)}><button>open Starters Special pack</button></a>
      <br />
      <a onClick={() => handleFetchPack(5)}><button>open Starters Premium pack</button></a>
      <br />
      <a onClick={() => handleFetchPack(6)}><button>open Starters Mini pack</button></a>
      <br /><br />
      {apiCards}
    </Layout>
  );
}