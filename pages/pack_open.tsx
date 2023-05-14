import Layout from '@/components/layout';
import CardContainer from '@/components/card_container';
import Card from '@/components/card';
import { UserData, CardData, PackData } from '@/data/dummy';
import styles from '@/styles/packs.module.css';
import { useState, useMemo } from 'react';
import { useUserContext } from '@/user_context';
import PackWrapper from '@/lib/pack_context';

export default function Main() {
    const user: any = useUserContext();

    return (
        <PackWrapper>
        <Layout>
            open ya boosta pak heeah, {user.name}!
            <br /><br />
            <CardContainer />
            <br /><br />
        </Layout>
        </PackWrapper>
    );
}