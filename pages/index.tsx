import Layout from '@/components/layout';
import Link from 'next/link';

export default function Home() {
   return (
   <Layout>
    Heyyy
    <br />
    <Link href = "/test">test page</Link>
    </Layout>
   );
}