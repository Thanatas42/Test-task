import React from "react";
import styles from '@/styles/Home.module.scss';

import Card from '../components/Card';

export default function CardList(props) {



    return (
        <ul className={styles.cards}>
            {props.carsList.map((item, index) => {
                if (index < props.cardsInPage)
                    return <Card carCard={item} key={item._id} />
            })}
        </ul>
    )
}