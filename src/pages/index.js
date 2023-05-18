import Head from 'next/head';
import React from 'react';
import { Roboto_Condensed } from 'next/font/google';
import styles from '@/styles/Home.module.scss'
import normalize from 'normalize.css';

import config from '../config.json';
import Card from '../components/Card';

const roboto = Roboto_Condensed({ subsets: ['latin'], weight: ['300', '400', '700'] });

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
  const [filterActive, SetFilterActive] = React.useState(false);
  const [filter, SetFilter] = React.useState(new Set());
  const [showFilterResult, SetShowFilterResult] = React.useState(0);

  function handleChangeSubmit(e) {
    e.preventDefault();
    let array = Array.from(filter);
    if (e.target.value !== '')
      fetch(`${api}?brand=${array[0]}`)
        .then((res) => res.json())
        .then((data) => {
          SetCarsList(data.list);
        });
    else
      SetCarsList(cars);
  }

  function handleChangeFilterPanel(e) {
    SetFilterActive(!filterActive);
  }

  function handleChangeFilter(e) {
    document.getElementsByName('filterInput').forEach(element => {
      element.classList.add(styles.hidden);
    });
    let element = document.getElementById(`button${e.target.id}`);
    element.classList.toggle(styles.hidden);

    filter.has(e.target.value) ?
      filter.delete(e.target.value) : filter.add(e.target.value);
    SetFilter(filter);

    let array = Array.from(filter);
    let count = 0;

    array.forEach((auto) => {
      count += carsList.filter((item) => item.feedData.brandName === auto).length;
    })
    SetShowFilterResult(count);
  }

  return (
    <>
      <Head>
        <title>Test pages</title>
        <meta name="description" content="Test pages" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${roboto.className}`}>
        <div className={styles.showcase}>
          <div className={styles.filterPanel}>
            <div onClick={handleChangeFilterPanel}>
              <p>Марка</p><span className={filterActive ? styles.active : ''} />
            </div>
            <form className={filterActive ? '' : styles.hidden} onChange={handleChangeFilter} onSubmit={handleChangeSubmit}><ul>
              {config.auto.map((item, index) => {
                return <li key={index}>
                  <input type="checkbox" id={index} name={item} value={item} />
                  <label htmlFor={index}>{item}</label>
                  <input className={styles.hidden} name={'filterInput'} id={`button${index}`} type="submit"
                    value={showFilterResult > 0 ? `Показать ${showFilterResult} автомобилей` : "Автомобили не найдены"} />
                </li>
              })}
            </ul></form>
          </div>

          <ul className={styles.cards}>
            {carsList.map((item, index) => {
              if (index < cardsInPage)
                return <Card carCard={item} key={item._id} />
            })}
          </ul>
        </div>
      </main>
    </>
  )
}
