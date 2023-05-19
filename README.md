# О проекте

Тестовое задание, реализовать страницу с витриной автомобилей с фильтрацией по марке автомобиля (Audi, Mitsubishi, Volkswagen, Kia, Honda, Hyundai) по макету, используя АПИ.
Выпадающее меню (для фильтра по марке автомобиля) и карточку автомобиля. Постраничность можно проигнорировать и выводить только первую страницу по каждому из запросов.

## Технологический стек

- Node.JS, React
- React hooks
- SCSS
- Normalize.css - для сброса станлартных стилей
- Функциональные компоненты React
- Для запросов к АПИ использовать Fetch-API

## Пояснение к реализации

### API
Не всегда удавалось однозначно идентифицировать свойство используемое в интерфейсе. Из за этого с рядом полей возникли проблемы (Пакеты комплектаций, отображаемая цена авто, пробег, дополнительные опции). Не хватало роута на все модели, без параметра brand, в частности фильтрации по моделям при заполнении параметров поиска и динмаическим отображением подходящих моделей - реадизация несколько "костыльная".

### API


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
