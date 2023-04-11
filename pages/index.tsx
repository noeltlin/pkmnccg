import Layout from '@/components/layout';
import Link from 'next/link';
import { useUserContext } from '@/user_context';

export default function Home() {
   const user = useUserContext();

   return (
   <Layout>
    Heyyy
    <br />
    <Link href = "/packs">booster pack page</Link>
    <br />
    <div>user id is {user.id}. user has {user.packCollection['4'].quantity} packs with id {user.packCollection['4'].id}</div>
    </Layout>
   );
}