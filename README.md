# Я.Практикум / Мессенджер

## Описание
Проектная работа по написанию веб мессенджера на шаблонизаторе Handlebars

## Подходящие данные для форм
**Имя/Фамилия** — латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).

**Логин** — от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).

**Email** — латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.

**Пароль** — от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.

**Телефон** — от 10 до 15 символов, состоит из цифр, может начинается с плюса.

**Сообщение** — не должно быть пустым.

## Функциональность

### Авторизация
- регистрация
- авторизация
- выход из системы

### Работа с информацией пользователя 
- изменение данных пользователя
- изменение аватара 
- изменение пароля

### Работа с чатами 
- список чатов пользователя
- создание новых чатов
- добавление пользователя в чат
- удаление пользователя из чата

### Работа с сообщениями через WebSocket

## Макеты в Figma
https://www.figma.com/file/Pelka2T12iSogai8WSTOcG/Yandex-practicum-messenger?type=design&node-id=0%3A1&mode=dev

## Ссылка на Netlify
https://inspiring-sunshine-dd6aa5.netlify.app/

## Сcылки на PR
- 1 Спринт - https://github.com/vairaden/middle.messenger.praktikum.yandex/pull/4
- 2 Спринт - https://github.com/vairaden/middle.messenger.praktikum.yandex/pull/5
- 3 Спринт - https://github.com/vairaden/middle.messenger.praktikum.yandex/pull/6

## Запуск
**Версия NodeJS: 18.18.2**

- `npm run start` — production сборка проекта и запуск express сервера
- `npm run build` — production сборка проекта
- `npm run build:server` - сборка сервера
- `npm run preview` — запуск сервера vite
- `npm run dev` — запуск проекта в режиме разработки
- `npm run serve` — запуск express сервера
- `npm run lint:typescript` - линтинг typescript
- `npm run lint` - линтинг
- `npm run lint:fix` - линтинг с исправлением

