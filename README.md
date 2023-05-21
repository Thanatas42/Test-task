# О проекте

Тестовое задание, реализовать страницу с витриной автомобилей с фильтрацией по марке автомобиля (Audi, Mitsubishi, Volkswagen, Kia, Honda, Hyundai) по макету, используя АПИ.
Выпадающее меню (для фильтра по марке автомобиля) и карточку автомобиля. Постраничность можно проигнорировать и выводить только первую страницу по каждому из запросов.

## Технологический стек

- Node.JS, React, Next.js
- React hooks
- SCSS
- Normalize.css - для сброса стандартных стилей
- Функциональные компоненты React
- Для запросов к АПИ использовать Fetch-API

## Пояснение к реализации

### Стек
Next.js, Sass и css-modules осваивал в процессе реализации, в прошлых проектах работал по BEM, React. Опыт в целом положительный, было интересно погрузиться.

### Макет
Блок с карточками автомобилей(сетка) - на flex. Хотелось уточнить, есть ли кейсы когда в карточки авто изменяется набор данных и карточка становится больше/меньше ломая общую сетку. В таком случае можно было реализовать сетку на grid, разделяя по столбцам.

### API
Не всегда удавалось однозначно идентифицировать свойство используемое в интерфейсе. Из за этого с рядом полей возникли проблемы (Пакеты комплектаций, отображаемая цена авто, пробег, дополнительные опции). Не хватало роута на все модели, без параметра brand, в частности фильтрации по моделям, при заполнении параметров поиска и динамическим отображением подходящих моделей - реадизация несколько "костыльная".

