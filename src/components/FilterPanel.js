import React from "react";
import styles from '@/styles/Home.module.scss'

export default function FilterPanel(props) {
    const [filterActive, SetFilterActive] = React.useState(false);
    const [filter, SetFilter] = React.useState(new Set());
    const [showFilterResult, SetShowFilterResult] = React.useState('...');

    async function getDataApi(carBrandsArr, count = false) {
        let results = [];
        let length = 0;

        for (let i = 0; i < carBrandsArr.length; i++) {
            await fetch(`${props.config.api}?brand=${carBrandsArr[i]}`)
                .then((res) => res.json())
                .then((data) => {
                    if (count) {
                        length += data.list.length;
                    } else {
                        data.list.forEach((item) => {
                            results.push(item);
                        });
                    }
                });
        }

        return count ? length : results;
    }

    async function handleChangeSubmit(e) {
        e.preventDefault();
        SetFilterActive(!filterActive);

        let array = filter.size > 0 ? Array.from(filter) : props.config.auto;

        props.SetCarsList(await getDataApi(array));
    }

    function handleChangeVisibleFilterPanel(e) {
        SetFilterActive(!filterActive);

        document.getElementsByName('filterInput')
            .forEach(element => { element.classList.add(styles.hidden) });
    }

    async function handleChangeFilter(e) {
        SetShowFilterResult('...');
        let checkArray = [];

        document.getElementsByName('filterInputCheckbox').forEach(c => {
            c.checked ? document.getElementById(`button${c.id}`).classList.add(styles.hidden) : '';
            if (!e.target.checked)
                c.checked ? checkArray.push(c) : '';
        });

        if (e.target.checked) {
            document.getElementById(`button${e.target.id}`).classList.remove(styles.hidden)
        } else {
            document.getElementById(`button${e.target.id}`).classList.add(styles.hidden)
            checkArray.length > 0 ? document.getElementById(`button${checkArray.at(-1).id}`).classList.remove(styles.hidden) : '';
        };

        filter.has(e.target.value) ?
            filter.delete(e.target.value) : filter.add(e.target.value);
        SetFilter(filter);

        let array = Array.from(filter);

        SetShowFilterResult(array.length === 0 ? props.cars.length : await getDataApi(array, true));
    }


    return (
        <div className={styles.filterPanel}>
            <div onClick={handleChangeVisibleFilterPanel}>
                <p>Марка</p><span className={filterActive ? styles.active : ''} />
            </div>
            <form id={'filterForm'} className={filterActive ? '' : styles.hidden} onChange={handleChangeFilter} onSubmit={handleChangeSubmit}><ul>
                {props.config.auto.map((item, index) => {
                    return <li key={index}>
                        <input type="checkbox" id={index} name={'filterInputCheckbox'} value={item} />
                        <label htmlFor={index}>{item}</label>
                        <input className={styles.hidden} name={'filterInput'} id={`button${index}`} type="submit"
                            value={showFilterResult === 0 ? "Автомобили не найдены" : `Показать ${showFilterResult} автомобилей`} />
                    </li>
                })}
            </ul></form>
        </div>
    )
}