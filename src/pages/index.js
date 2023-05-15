import Head from 'next/head'
import React from 'react';
import { useState } from "react";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Roboto_Condensed } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import Card from '../components/Card';

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto_Condensed({ subsets: ['latin'], weight: ['300', '400', '700'] });

export const getStaticProps = async () => {
  const res = await fetch('https://maximum.expert/api/stock-test?brand=Hyundai');
  const cars = await res.json();

  return {
    props: {
      cars,
    },
  };
};


export default function Home({ cars }) {
  const auto = ["Audi", "Mitsubishi", "Volkswagen", "Kia", "Honda", "Hyundai"];

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${roboto.className}`}>
        <div className={styles.flterPanel}>
          <select className={styles.filterPanel} name="city" id="city-select">
            <option value="">Марка</option>
            {auto.map((item) => {
              return <option key={item} value={item}>{item}</option>
            })}
          </select>
        </div>

        <ul className={styles.cards}>
          {cars.list.map((item) => {
            return <Card carCard={item} key={item._id}/>
          })}
        </ul>
      </main>
    </>
  )
}
