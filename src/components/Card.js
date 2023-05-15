import React from 'react';
import styles from '@/styles/Home.module.css'

export default function Card(props) {
    let feedData = props.carCard.feedData;
    //{`${feedData.brandName} ${feedData.modelName} ${feedData.equipmentVariantName}`}
    //{feedData.modelYear}
    return (
        <li className={styles.card}>
            <div>
                <h2 className={styles.cardName}>Hyundai Solaris NEW Active Plus 1,4 6MT</h2>
                <span>2013</span>
            </div>
            <p className={styles.vinNumber}>{feedData.vin}</p>
            <div className={styles.carousels}>
                <img src={props.carCard.photobank.imgs[0].urlThumb}></img>
            </div>
            <div className={styles.options}>
                <h5>Двигатель</h5>
                <p>{`${feedData.equipmentVariantEngineCapacity / 1000} л/${feedData.equipmentVariantEnginePower} лс/${feedData.equipmentVariantFuelType}`}</p>
                <h5>КПП</h5>
                <p>{feedData.equipmentVariantTransmissionType}</p>
                <h5>Пробег</h5>
                <p>{feedData.invoice}</p>
                <h5>Цвет</h5>
                <p>{feedData.colorByClassifierName}</p>
                <h5>Пакеты</h5>
            </div>
        </li>
    )
}