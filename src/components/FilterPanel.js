import React from "react";
import styles from '@/styles/Home.module.scss'


export default function FilterPanel(props) {
    const [filterActive, SetFilterActive] = React.useState(false);
    const [filter, SetFilter] = React.useState(new Set());
    const [showFilterResult, SetShowFilterResult] = React.useState(0);

    function handleChangeSubmit(e) {
        e.preventDefault();

        let array = filter.size > 0 ? Array.from(filter) : props.config.auto;
        let results = [];
        for (let i = 0; i < array.length; i++) {
            fetch(`${props.config.api}?brand=${array[i]}`)
                .then((res) => res.json())
                .then((data) => {
                    results = results.concat(data.list);
                    props.SetCarsList(results);
                });
        }
    }

    function handleChangeFilterPanel(e) {
        SetFilterActive(!filterActive);
        document.getElementsByName('filterInput').forEach(element => { element.classList.add(styles.hidden) });
    }

    function handleChangeFilter(e) {
        if (e.target.checked) {
            document.getElementsByName('filterInput').forEach(element => { element.classList.add(styles.hidden) });
            document.getElementById(`button${e.target.id}`).classList.remove(styles.hidden);
        }

        filter.has(e.target.value) ?
            filter.delete(e.target.value) : filter.add(e.target.value);
        SetFilter(filter);

        let array = Array.from(filter);
        let count = 0;

        array.forEach((auto) => {
            count += props.cars.filter((item) => item.feedData.brandName === auto).length;
        })
        if (array.length === 0)
            count = props.cars.length;

        SetShowFilterResult(count);
    }


    return (
        <div className={styles.filterPanel}>
            <div onClick={handleChangeFilterPanel}>
                <p>Марка</p><span className={filterActive ? styles.active : ''} />
            </div>
            <form className={filterActive ? '' : styles.hidden} onChange={handleChangeFilter} onSubmit={handleChangeSubmit}><ul>
                {props.config.auto.map((item, index) => {
                    return <li key={index}>
                        <input type="checkbox" id={index} name={item} value={item} />
                        <label htmlFor={index}>{item}</label>
                        <input className={styles.hidden} name={'filterInput'} id={`button${index}`} type="submit"
                            value={showFilterResult > 0 ? `Показать ${showFilterResult} автомобилей` : "Автомобили не найдены"} />
                    </li>
                })}
            </ul></form>
        </div>
    )
}