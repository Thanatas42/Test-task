import React from "react";
import styles from '@/styles/Home.module.css'

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Card(props) {

    let feedData = props.carCard.feedData;
    //{`${feedData.brandName} ${feedData.modelName} ${feedData.equipmentVariantName}`}
    //{feedData.modelYear}

    /* {props.carCard.photobank.imgs.map((item) => {
                    return <img src={item.urlThumb} key={item._id} alt={item.season} />
                })}
                
                <img src={props.carCard.photobank.imgs[2].urlThumb} />
                {feedData.vin}
                */
    console.log(feedData.baseOptions[0])

    return (
        <li className={styles.card}>
            <div className={styles.cardNameContainer}>
                <h2>{`${feedData.brandName} ${feedData.modelName} ${feedData.equipmentName} ${feedData.engine.engineCapacity} ${feedData.engine.engineTransmission}`}</h2>
                <span>{feedData.modelYear}</span>
            </div>
            <h5 className={styles.vinNumber}>{feedData.vin}</h5>
            <Swiper
                spaceBetween={7}
                slidesPerView={1.3}
            >
                {props.carCard.photobank.imgs.map((item, index) => {
                    return <SwiperSlide key={index}><img src={item.urlThumb} alt={item.season} /></SwiperSlide>
                })}
            </Swiper>
            <div>
                <ul className={styles.options}>
                    <li>
                        <h5>Двигатель</h5>
                        <p>{`${feedData.engine.engineCapacity} л`} <span>/</span> {`${feedData.equipmentVariantEnginePower} лс `} <span>/</span> {`${feedData.equipmentVariantFuelType.toLowerCase()}`}</p>
                    </li>
                    <li>
                        <h5>КПП</h5>
                        <p>{feedData.equipmentVariantTransmissionType}</p>
                    </li>
                    <li>
                        <h5>Пробег</h5>
                        <p>{feedData.invoice}</p>
                    </li>
                    <li>
                        <h5>Цвет</h5>
                        <p>{feedData.colorByClassifierName}</p>
                    </li>
                    <li>
                        <h5>Пакеты</h5>
                        <p>{`${feedData.baseOptions[0].universalOptions.name} (+ ещё ${feedData.baseOptions.length} пакета)`}</p>
                    </li>
                </ul>
                <div className={styles.priceContainer}>
                    <div>
                        <p>{feedData.autoPrice.toLocaleString() + " ₽"}</p>
                        <p>{`Доп. опции на ${feedData.price.toLocaleString()} ₽`}</p>
                    </div>
                    <button>{props.carCard.serviceData.status}</button>
                </div>
            </div>
        </li>
    )
}