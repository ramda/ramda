Ramda
=============

Практична функціональна бібліотека для JavaScript програмістів.

[![Build Status](https://travis-ci.org/ramda/ramda.svg?branch=master)](https://travis-ci.org/ramda/ramda)
[![npm module](https://badge.fury.io/js/ramda.svg)](https://www.npmjs.org/package/ramda)
[![dependencies](https://david-dm.org/ramda/ramda.svg)](https://david-dm.org/ramda/ramda)
[![Gitter](https://badges.gitter.im/Join_Chat.svg)](https://gitter.im/ramda/ramda?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


Чому Ramda?
----------

<img src="http://ramda.jcphillipps.com/logo/ramdaFilled_200x235.png" 
     width="170" height="190" align="right" hspace="12" />

Вже є кілька відмінних бібліотек з функціональним ароматом. Як правило, вони призначенні для того, щоб бути інструментами загального призначення, що підходять для роботи в декількох парадигмах. У Ramda, в свою чергу, більш конкретна мета. Ми хотіли бібліотеку, розроблену спеціально для програмування у функціональному стилі, бібліотеку, з якою легко створювати функціональні джерела інформації, яка не змінює данні користувача.



Яка різниця?
-----------------

Основні відмінні риси Ramda є:

* Ramda ставить наголос на більш чистому функціональному стилі. Незмінність даних і відсутність побічних ефектів у функцій лежать у самому серці філософії дизайну. Це може допомогти вам виконати роботy за допомогою простого та елегантного коду.

* Ramda функції мають автоматичний каррінг. Це дозволяє легко будувати нові функції зі старих просто не передаючи кінцевий параметр.

* Параметри у Ramda функціях розташовані таким чином, щоб зробити каррінг якомога зручнішим. Дані, які мають бути обробленими, як правило, подаються в останню чергу.

Останні два пункти разом роблять дуже легким створення функцій у вигляді послідовності простих функцій, кожна з яких перетворює дані та передає їх до наступної. Ramda зпроектована для підтримки такого стилю написання коду.


Введення
-------------

* [Введення в Ramda](http://buzzdecafe.github.io/code/2014/05/16/introducing-ramda) by Buzz de Cafe
* [Чому Ramda?](http://fr.umio.us/why-ramda/) by Scott Sauyet
* [Сприяння каррінгу](http://fr.umio.us/favoring-curry/) by Scott Sauyet
* [Чому кіррінг допомогає](https://hughfdjackson.com/javascript/why-curry-helps/) by Hugh Jackson
* [Агов, Underscore, ти робиш це неправильно!](https://www.youtube.com/watch?v=m3svKOdZijA&app=desktop) by Brian Lonsdorf
* [Думати в Ramda](http://randycoulman.com/blog/categories/thinking-in-ramda) by Randy Coulman


Філософія
----------
Використовуючи Ramda ви повинні почуватись наче ви просто використовуєте JavaScript. Це приктичний, функціональний JavaScript. Ми не представляємо лямбда вирази у строках, ми не запозичуємо cons списки, ми не портуємо всі функції з Clojure.

Наші базові структури даних - це прості JavaScript об'єкти і наші звичайні колекції - це JavaScript масиви. Ми також зберігаємо інші вбудовані у JavaScript фунції, такі як функції, як об'єкти з властивостями.

Функціональне програмування в значній мірі пов'язано з незмінюємими (не мутабельними) об'єктами та функціями без побічних ефектів. Хоча Ramda не застосовує це, вона дозволяє використовувати такий стиль з якомога меншим "тертям".

Ми прагнемо до реалізації як чистоти так і елегантності, але АРІ лишається королем. Ми частково приносимо в жертву елегантність реалізації заради більш чистого АРІ.

І останнє, але не менш важливе: Ramda прагне до продуктивності. Надійна та швидка реалізація перемагають будь-які поняття функціональної чистоти.

Встановлення
------------

Для використання з node:

```bash
$ npm install ramda
```

Після чого в консолі:

```javascript
const R = require('ramda');
```

Для прямого використання в браузері:

```html
<script src="path/to/yourCopyOf/ramda.js"></script>
```

чи мініміфікована версія:

```html
<script src="path/to/yourCopyOf/ramda.min.js"></script>
```

або з CDN чи cdnjs:

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/ramda/0.24.1/ramda.min.js"></script>
```

чи за допомогою одного з посиланнь наведених нижче з [jsDelivr](http://jsdelivr.com):

```html
<script src="//cdn.jsdelivr.net/ramda/0.24.1/ramda.min.js"></script>
<script src="//cdn.jsdelivr.net/ramda/0.24/ramda.min.js"></script>
<script src="//cdn.jsdelivr.net/ramda/latest/ramda.min.js"></script>
```

(зауважте, що використання `latest` привносить величезний ризик, що при зміні ramda API ваш код може зломатися.)

Ці теги script додають змінну `R` до глобальної області видимості браузера.

Або ви можете вставити ramda у будь-який нічого не підозрюючий сайт за допомогою [bookmarklet](https://github.com/ramda/ramda/blob/master/BOOKMARKLET.md).

### Збірка

* на Unix-базованих платформах, `npm run build` оновлює __dist/ramda.js__ та __dist/ramda.min.js__
* на Windows, запишіть результат `scripts/build --complete` до тимчасового файлу, після чого переіменуйте тимчасовий файл на __dist/ramda.js__.

#### Часткова збірка

Можливо зібрати Ramda з підмножиною функціональних можливостей задля зменшення розміру файла. Система збірки Ramda надає цю можливість за допомогою прапорців у командній строці. Наприклад, якщо ви використовуєте `R.compose`, `R.reduce` та `R.filter`, ви можете створити часткову збірку за допомогою наступного:

    ./scripts/build -- src/compose.js src/reduce.js src/filter.js > dist/ramda.custom.js

Для цього потрібно мати встановленим Node/io.js. 

Документація
-------------

- Переклад API-документації [українською мовою](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md).
- API документація [англійською мовою](http://ramdajs.com/docs/).

Ім'я
--------

Добре, ми як вівці :ram:.  Це все. Це коротке ім'я, ніким поки не зайняте. Це з легкістю могло би бути `eweda`, але тоді ми б були змушені казати _eweda lamb!_ (lamb - ягня, прим.перекладача), а ніхто того не хоче. Для тих, хто не є носіє англійської мови, _lambs_ - це дитинча вівці, _ewes_ - це вівцематка, а _rams_ - барани. Тому, можливо, _ramda_ - це подорослішавша lambda... Але, напевно, ні.




Запуск тестів
----------------------

**Консоль:**

Для запуску тестів з консолі, вам необхідно встановити `mocha`:

    npm install -g mocha

Тоді з кореня вашого проекту ви можете просто викликати

    mocha

Або якщо ви встановили залежності через:

    npm install

тоді ви можете запустити тести (і отримати вивід деталей) запустивши команду:

    npm test

**Браузер:**

Ви можете використовувати [testem](https://github.com/airportyh/testem) для тестування у різних браузерах (и навіть у "бузголових" браузрах), з миттєвим перезавантаженням тестівю. Встановіть __testem__ (`npm install -g testem`) і виконайте `testem`. Відкрийте посилання яке надасть вам ваш браузер і ви побачите результати у вашому терміналі.

Якщо у вас встановлений _PhantomJS_ , ви можете виконати `testem -l phantomjs` для запуску тестів повністю у "безголовому" режимі.


Переклади
-----------------

- [Англійською(English)](https://github.com/ramda/ramda)
- [Китайською(中文)](http://ramda.cn/)


Подяки
-----------------

Дякуємо [J. C. Phillipps](http://www.jcphillipps.com) за Ramda logo.
Ramda logo artwork &copy; 2014 J. C. Phillipps. Licensed Creative Commons 
[CC BY-NC-SA 3.0](http://creativecommons.org/licenses/by-nc-sa/3.0/).
