import Head from 'next/head';
import React from 'react';
import { Roboto_Condensed } from 'next/font/google';
import { Roboto } from 'next/font/google';
import styles from '@/styles/Home.module.scss'
import normalize from 'normalize.css';

import config from '../config.json';
import CardList from '../components/CardList';
import FilterPanel from '../components/FilterPanel';

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], weight: ['300', '400', '700'] });
const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '700'] });

const api = 'https://maximum.expert/api/stock-test';
const urls = config.auto.map((item) => { return api + '?brand=' + item; });
const cardsInPage = 21;


export async function getServerSideProps() {
  const series = async () => {
    let results = [];
    for (let i = 0; i < urls.length /*&& results.length < cardsInPage*/; i++) {
      const res = await fetch(urls[i]);
      const list = await res.json();
      results = results.concat(list.list);
    }
    return results;
  }
  const cars = await series();

  return {
    props: {
      cars
    },
  };
};

export default function Home({ cars }) {
  const [carsList, SetCarsList] = React.useState(cars);

  return (
    <>
      <Head>
        <title>Test pages</title>
        <meta name="description" content="Test pages" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${roboto.className} ${robotoCondensed.className}`}>
        <div className={styles.showcase}>
          <FilterPanel SetCarsList={SetCarsList} cars={cars} config={config} api={api} />
          <CardList carsList={carsList} cardsInPage={cardsInPage} />
        </div>
      </main>
    </>
  )
}
