import React from "react";
import styles from '@/styles/Home.module.scss'

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Card(props) {
    let feedData = props.carCard.feedData;

    function transformFirstChar(string) {
        if (string)
            return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let status = props.carCard.serviceData.status === "В продаже" ? true : false;


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
                        <p>{`${feedData.engine.engineCapacity} л`} <span>/</span> {`${feedData.equipmentVariantEnginePower} лс `} <span>/</span> {`${transformFirstChar(feedData.equipmentVariantFuelType.toLowerCase())}`}</p>
                    </li>
                    <li>
                        <h5>кпп / ПРИВОД</h5>
                        <p>{`${feedData.equipmentVariantTransmission} / ${feedData.equipmentVariantDriveType}`}</p>
                    </li>
                    <li>
                        <h5>Пробег</h5>
                        <p>{feedData.invoice}</p>
                    </li>
                    <li>
                        <h5>Цвет</h5>
                        <p>{transformFirstChar(feedData.colorByClassifierName)}</p>
                    </li>
                    <li>
                        <h5>Пакеты</h5>
                        <p>{`${''} (+ ещё ${feedData.baseOptions.length} пакета)`}</p>
                    </li>
                </ul>
                <div className={styles.priceContainer}>
                    <div>
                        <p>{feedData.autoPriceSummary.toLocaleString()}<span>&nbsp;₽</span></p>
                        <p className={styles.advancePrice}>{"Доп. опции на"}<span style={{ color: "#22BF86" }}>&nbsp;{feedData.price.toLocaleString()}&nbsp;</span>{" ₽"}</p>
                    </div>
                    <button disabled={!status}>{status ? 'купить' : 'в поставке'}</button>
                </div>
            </div>
        </li>
    )
}