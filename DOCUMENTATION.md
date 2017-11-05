# Документація

[A](#a), [B](#b), [C](#c), [D](#d), [J](#j), [I](#i), [M](#m), [N](#n), [P](#p), [R](#r), [S](#s), [T](#t), [U](#u), [X](#x), [Z](#z)

## A
- [__](#__) `Function`
- [add](#add) `Math`
- [addIndex](#addindex) `Function`
- [adjust](#adjust) `List`
- [all](#all) `List`
- [allPass](#allpass) `Logic`
- [always](#always) `Function`
- [and](#and) `Logic`
- [any](#any) `List`
- [anyPass](#anypass) `List`
- [ap](#ap) `Function`
- [aperture](#aperture) `List`
- [append](#append) `List`
- [apply](#apply) `Function`
- [applySpec](#applyspec) `Function`
- [ascend](#ascend) `Function`
- [assoc](#assoc) `Object`
- [assocPath](#assocpath) `Object`

**[⬆ вверх](#Документація)**

## B
- [binary](#binary) `Function`
- [bind](#bind) `Function`
- [both](#both) `Logic`

**[⬆ вверх](#Документація)**

## C
- [call](#call) `Function`
- [chain](#chain) `List`
- [compose](#compose) `Function`
- [converge](#converge) `Function`

**[⬆ вверх](#Документація)**

## D
- [descend](#descend) `Function`
- [dissoc](#dissoc) `Object`
- [dissocPath](#) ``

**[⬆ вверх](#Документація)**

## J
- [juxt](#) ``

**[⬆ вверх](#Документація)**

## I
- [identity](#identity) `Function`
- [into](#into) `List`

**[⬆ вверх](#Документація)**

## M
- [map](#map) `List`

**[⬆ вверх](#Документація)**

## N
- [nAry](#) ``
- [none](#none) `List`

**[⬆ вверх](#Документація)**

## P
- [partial](#) ``
- [path](#path) `Object`
- [pathEq](#patheq) `Relation`
- [pipe](#pipe) `Function`
- [prepend](#prepend) `List`

**[⬆ вверх](#Документація)**

## R
- [reduce](#reduce) `List`
- [reduced](#reduced) `List`
- [reduceRight](#reduceright) `List`

**[⬆ вверх](#Документація)**

## S
- [set](#set) `Object`
- [sort](#sort) `List`
- [sortBy](#sortby) `Relation`
- [sortWith](#sortwith) `Relation`
- [subtract](#subtract) `Math`

**[⬆ вверх](#Документація)**

## T
- [transduce](#transduce) `List`

**[⬆ вверх](#Документація)**

## U
- [unary](#) ``
- [update](#update) `List`
- [useWith](#usewith) `Function`

**[⬆ вверх](#Документація)**

## X
- [xprod](#xprod) `List`

**[⬆ вверх](#Документація)**

## Z
- [zip](#zip) `List`
- [zipObj](#zipobj) `List`
- [zipWith](#zipwith) `List`

**[⬆ вверх](#Документація)**


________

## __
### `[Function]`

_Додано у версії v0.6.0_

Спеціальне значення, для визначення "прогалин" у каррованих функціях,
яке дає змогу частковому застосуванню будь-якої комбінації аргументів, в незалежності від їх позицій.

Якщо `g` - це каррована тернарна функція і `_` є `R.__`, тоді наступне евівалентне:

- `g(1, 2, 3)`
- `g(_, 2, 3)(1)`
- `g(_, _, 3)(1)(2)`
- `g(_, _, 3)(1, 2)`
- `g(_, 2, _)(1, 3)`
- `g(_, 2)(1)(3)`
- `g(_, 2)(1, 3)`
- `g(_, 2)(_, 3)(1)`

```javascript
var greet = R.replace('{name}', R.__, 'Hello, {name}!');
greet('Alice'); //=> 'Hello, Alice!'
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20greet%20%3D%20R.replace%28%27%7Bname%7D%27%2C%20R.__%2C%20%27Hello%2C%20%7Bname%7D%21%27%29%3B%0Agreet%28%27Alice%27%29%3B%20%2F%2F%3D%3E%20%27Hello%2C%20Alice%21%27)



## add
### `[Math]`

`Number → Number → Number`

#### Параметри:
| a |
:---|
| b |
| повертає __Number__ |

_Додано у версії v0.1.0_

Додає два значення

Дивіться також [subtract](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#subtract).

```javascript
R.add(2, 3);       //=>  5
R.add(7)(10);      //=> 17
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;R.add%282%2C%203%29%3B%20%20%20%20%20%20%20%2F%2F%3D%3E%20%205%0AR.add%287%29%2810%29%3B%20%20%20%20%20%20%2F%2F%3D%3E%2017)

**[⬆ вверх](#Документація)**



## addIndex
### `[Function]`

`((a … → b) … → [a] → *) → (a …, Int, [a] → b) … → [a] → *)`

#### Параметри:
| fn | Функція ітерації списку, що не передає індекс чи список у функцію зворотнього виклику(callback) |
:---|:---|
| повертає __function__ | Змінена функція ітерації списку, що не передає (елемент, індекс, список)  у його функцію зворотнього виклику(callback) |

_Додано у версії v0.15.0_

Створює нову функцію ітерації списку з уже існуючої, за допомогою додавання двох нових аргументів до функції зворотнього виклику: теперішній індекс і весь список.

Це, в свою чергу, перетворить, наприклад функцію `R.map` у функцію, яка більше нагадує `Array.prototype.map`. Зверніть увагу на те, що це спрацює лише для функцій, в яких ітеруюча функція зворотнього виклику є першим аргументом, а список - останнім. (Останнє може бути не важливим, якщо аргумент списку не використовується.)

```javascript
var mapIndexed = R.addIndex(R.map);
mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
//=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;var%20mapIndexed%20%3D%20R.addIndex%28R.map%29%3B%0AmapIndexed%28%28val%2C%20idx%29%20%3D%3E%20idx%20%2B%20%27-%27%20%2B%20val%2C%20%5B%27f%27%2C%20%27o%27%2C%20%27o%27%2C%20%27b%27%2C%20%27a%27%2C%20%27r%27%5D%29%3B%0A%2F%2F%3D%3E%20%5B%270-f%27%2C%20%271-o%27%2C%20%272-o%27%2C%20%273-b%27%2C%20%274-a%27%2C%20%275-r%27%5D)

**[⬆ вверх](#Документація)**



## adjust
### `[List]`

`(a → a) → Number → [a] → [a]`

#### Параметри:
| fn | Функція яка буде застосована |
:---|:---|
| idx | Індекс |
| list | Масиво-подібний об'єкт, чиє значення буде замінено на вказаному за індексом місці. |
| повертає __Array__ | Копію переданого масиво-подібного об'єкту, з елементом (на місці згідно з індексом `idx`) заміненим значенням яке повернулось після застосування функції `fn` до існуючого елемента. |

_Додано у версії v0.14.0_

Застосовує функцію до вказаного за індексом елемента у масиві, повертаючи нову копію масиву з елементом, на вказаному за індексом місці, заміненим результатом застосованої функції.

Дивіться також [update](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#update).

```javascript
R.adjust(R.add(10), 1, [1, 2, 3]);     //=> [1, 12, 3]
R.adjust(R.add(10))(1)([1, 2, 3]);     //=> [1, 12, 3]
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?R.adjust%28R.add%2810%29%2C%201%2C%20%5B1%2C%202%2C%203%5D%29%3B%20%20%20%20%20%2F%2F%3D%3E%20%5B1%2C%2012%2C%203%5D%0AR.adjust%28R.add%2810%29%29%281%29%28%5B1%2C%202%2C%203%5D%29%3B%20%20%20%20%20%2F%2F%3D%3E%20%5B1%2C%2012%2C%203%5D)

**[⬆ вверх](#Документація)**



## all
### `[List]`

`(a → Boolean) → [a] → Boolean`

#### Параметри:
| fn | Функція предикат |
:---|:---|
| list | Масив, який має бути оцінений. |
| повертає __Boolean__ | `true`, якщо предикат вдовольняється кожним з елементів, в іншому випадку повернеться `false`. |

_Додано у версії v0.1.0_

Повертає `true`, якщо всі елементи списку відповідають предикату, `false`, якщо у списку немає жодного який би відповідав.

Застосовує до всіх метод другого аргументу, якщо він присутній.

Діє як перетворювач(трансдюсер), якщо трансформер зазначений на місці списку.

Дивіться також [any](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#any), [none](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#none), [transduce](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#transduce).

```javascript
var equals3 = R.equals(3);
R.all(equals3)([3, 3, 3, 3]); //=> true
R.all(equals3)([3, 3, 1, 3]); //=> false
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20equals3%20%3D%20R.equals%283%29%3B%0AR.all%28equals3%29%28%5B3%2C%203%2C%203%2C%203%5D%29%3B%20%2F%2F%3D%3E%20true%0AR.all%28equals3%29%28%5B3%2C%203%2C%201%2C%203%5D%29%3B%20%2F%2F%3D%3E%20false)

**[⬆ вверх](#Документація)**



## allPass
### `[Logic]`

`[(*… → Boolean)] → (*… → Boolean)`

#### Параметри:
| predicates | масив предикатів, які необхідно перевірити |
:---|:---|
| повертає __function__ | об'єднаний предикат |

_Додано у версії v0.9.0_

Приймає список предикатів і повертає предикат, який повертає `true` для заданого списку аргументів, якщо кожен з переданих предикатів задовольяється тими аргументами.

Повернута функція є каррованою, чия арність співпадає з арністю предиката з найвищою арністю.

Дивіться також [anyPass](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#anypass)

```javascript
var isQueen = R.propEq('rank', 'Q');
var isSpade = R.propEq('suit', '♠︎');
var isQueenOfSpades = R.allPass([isQueen, isSpade]);

isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;var%20isQueen%20%3D%20R.propEq%28%27rank%27%2C%20%27Q%27%29%3B%0Avar%20isSpade%20%3D%20R.propEq%28%27suit%27%2C%20%27%E2%99%A0%EF%B8%8E%27%29%3B%0Avar%20isQueenOfSpades%20%3D%20R.allPass%28%5BisQueen%2C%20isSpade%5D%29%3B%0A%0AisQueenOfSpades%28%7Brank%3A%20%27Q%27%2C%20suit%3A%20%27%E2%99%A3%EF%B8%8E%27%7D%29%3B%20%2F%2F%3D%3E%20false%0AisQueenOfSpades%28%7Brank%3A%20%27Q%27%2C%20suit%3A%20%27%E2%99%A0%EF%B8%8E%27%7D%29%3B%20%2F%2F%3D%3E%20true)

**[⬆ вверх](#Документація)**



## always
### `[Function]`

`a → (* → a)`

#### Параметри:
| val | Значення, яке необхідно обгорнути у функцію |
:---|:---|
| повертає __function__ | функція :: * -> val. |

_Додано у версії v0.1.0_

Повертає функцію, яка завжди повертає передане значення. __Зауважте__, що для не примітивів поертаєме значення буде посиланням а оригінальне значення.

Ця функція відома як `const`, константа, чи K (для K комбінатор) у інших мовах та бібліотеках.

```javascript
var t = R.always('Tee');
t(); //=> 'Tee'
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20t%20%3D%20R.always%28%27Tee%27%29%3B%0At%28%29%3B%20%2F%2F%3D%3E%20%27Tee%27)

**[⬆ вверх](#Документація)**



## and
### `[Logic]`

`a → b → a | b`

#### Параметри:
| a | |
:---|:---|
| b | |
| повертає __Any__ | перший аргумент, якщо він falsy, інакше - другий аргумент. |

_Додано у версії v0.1.0_

Повертає __`true`__, якщо обидва аргументи правидиві(`true`), інакше повертає - `false`.

Дивіться також [both](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#both).

```javascript
R.and(true, true); //=> true
R.and(true, false); //=> false
R.and(false, true); //=> false
R.and(false, false); //=> false
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;R.and%28true%2C%20true%29%3B%20%2F%2F%3D%3E%20true%0AR.and%28true%2C%20false%29%3B%20%2F%2F%3D%3E%20false%0AR.and%28false%2C%20true%29%3B%20%2F%2F%3D%3E%20false%0AR.and%28false%2C%20false%29%3B%20%2F%2F%3D%3E%20false)

**[⬆ вверх](#Документація)**



## any
### `[List]`

`(a → Boolean) → [a] → Boolean`

#### Параметри:
| fn | Функція предикат |
:---|:---|
| list | Масив, який має бути оцінений. |
| повертає __Boolean__ | `true`, якщо предикат вдовольняє хоча б один з елементів, в іншому випадку повернеться `false`. |

_Додано у версії v0.1.0_

Повертає `true`, якщо бодай один елемент списку відповідає предикату, в іншому випадку поверне `false`.

Застосовує до будь-якого методу другого аргументу, якщо він присутній.

Діє як перетворювач(трансдюсер), якщо трансформер зазначений на місці списку.

Дивіться також [all](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#all), [none](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#none), [transduce](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#transduce).

```javascript
var lessThan0 = R.flip(R.lt)(0);
var lessThan2 = R.flip(R.lt)(2);
R.any(lessThan0)([1, 2]); //=> false
R.any(lessThan2)([1, 2]); //=> true
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;var%20lessThan0%20%3D%20R.flip%28R.lt%29%280%29%3B%0Avar%20lessThan2%20%3D%20R.flip%28R.lt%29%282%29%3B%0AR.any%28lessThan0%29%28%5B1%2C%202%5D%29%3B%20%2F%2F%3D%3E%20false%0AR.any%28lessThan2%29%28%5B1%2C%202%5D%29%3B%20%2F%2F%3D%3E%20true)

**[⬆ вверх](#Документація)**



## anyPass
### `[Logic]`

`[(*… → Boolean)] → (*… → Boolean)`

#### Параметри:
| predicates | масив предикатів, які необхідно перевірити |
:---|:---|
| повертає __function__ | об'єднаний предикат |

_Додано у версії v0.9.0_

Приймає список предикатів і повертає предикат, який повертає `true` для заданого списку аргументів, якщо хоча б один з переданих предикатів задовольяється тими аргументами.

Повернута функція є каррованою, чия арність співпадає з арністю предиката з найвищою арністю.

Дивіться також [allPass](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#allpass)

```javascript
var isClub = R.propEq('suit', '♣');
var isSpade = R.propEq('suit', '♠');
var isBlackCard = R.anyPass([isClub, isSpade]);

isBlackCard({rank: '10', suit: '♣'}); //=> true
isBlackCard({rank: 'Q', suit: '♠'}); //=> true
isBlackCard({rank: 'Q', suit: '♦'}); //=> false
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20isClub%20%3D%20R.propEq%28%27suit%27%2C%20%27%E2%99%A3%27%29%3B%0Avar%20isSpade%20%3D%20R.propEq%28%27suit%27%2C%20%27%E2%99%A0%27%29%3B%0Avar%20isBlackCard%20%3D%20R.anyPass%28%5BisClub%2C%20isSpade%5D%29%3B%0A%0AisBlackCard%28%7Brank%3A%20%2710%27%2C%20suit%3A%20%27%E2%99%A3%27%7D%29%3B%20%2F%2F%3D%3E%20true%0AisBlackCard%28%7Brank%3A%20%27Q%27%2C%20suit%3A%20%27%E2%99%A0%27%7D%29%3B%20%2F%2F%3D%3E%20true%0AisBlackCard%28%7Brank%3A%20%27Q%27%2C%20suit%3A%20%27%E2%99%A6%27%7D%29%3B%20%2F%2F%3D%3E%20false)

**[⬆ вверх](#Документація)**



## ap
### `[Function]`

`[a → b] → [a] → [b]`

`Apply f => f (a → b) → f a → f b`

#### Параметри:
| applyF |
:---|
| applyX |
| повертає __*__ |

_Додано у версії v0.3.0_

`ap` застосовує список функцій до списку значень.

Передає метод `ap` другого аргумента, якщо той присутній. Також сприймає карровані функції як аплікативи.

```javascript
R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;R.ap%28%5BR.multiply%282%29%2C%20R.add%283%29%5D%2C%20%5B1%2C2%2C3%5D%29%3B%20%2F%2F%3D%3E%20%5B2%2C%204%2C%206%2C%204%2C%205%2C%206%5D%0AR.ap%28%5BR.concat%28%27tasty%20%27%29%2C%20R.toUpper%5D%2C%20%5B%27pizza%27%2C%20%27salad%27%5D%29%3B%20%2F%2F%3D%3E%20%5B%22tasty%20pizza%22%2C%20%22tasty%20salad%22%2C%20%22PIZZA%22%2C%20%22SALAD%22%5D)

**[⬆ вверх](#Документація)**



## aperture
### `[List]`

`Number → [a] → [[a]]`

#### Параметри:
| n | Якого розміру мають бути створені масиви. |
:---|:---|
| list | Список, який потрібно розбити на масиви з `n`-довжиною. |
| повертає __Array__ | Фінальний список масивів, кожен з довжиною `n`. |

_Додано у версії v0.12.0_

Повертає новий список, складений з масивів, кожен з довжиною `n` послідовних елементів. Якщо `n` більше ніж довжина списку - повертається порожній список.

Діє як перетворювач(transducer), якщо трансформер(transformer) передано на місці списку.

Дивіться також [transduce](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#transduce).

```javascript
R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
R.aperture(7, [1, 2, 3, 4, 5]); //=> []
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;R.aperture%282%2C%20%5B1%2C%202%2C%203%2C%204%2C%205%5D%29%3B%20%2F%2F%3D%3E%20%5B%5B1%2C%202%5D%2C%20%5B2%2C%203%5D%2C%20%5B3%2C%204%5D%2C%20%5B4%2C%205%5D%5D%0AR.aperture%283%2C%20%5B1%2C%202%2C%203%2C%204%2C%205%5D%29%3B%20%2F%2F%3D%3E%20%5B%5B1%2C%202%2C%203%5D%2C%20%5B2%2C%203%2C%204%5D%2C%20%5B3%2C%204%2C%205%5D%5D%0AR.aperture%287%2C%20%5B1%2C%202%2C%203%2C%204%2C%205%5D%29%3B%20%2F%2F%3D%3E%20%5B%5D)

**[⬆ вверх](#Документація)**



## append
### `[List]`

`a → [a] → [a]`

#### Параметри:
| el | Елемент, який треба додати до кінця списку. |
:---|:---|
| list | Список елементів до якого слід додати елемент. |
| повертає __Array__ | Новий список включаючий в себе елементи старого списку та вкінці доданий елемент `el`. |

_Додано у версії v0.1.0_

Повертає новий список, в якому знаходяться елементи переданого в якості параметру списку, та вкінці елемент переданий в якості аргументу.

Дивіться також [prepend](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#prepend).

```javascript
R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
R.append('tests', []); //=> ['tests']
R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;R.append%28%27tests%27%2C%20%5B%27write%27%2C%20%27more%27%5D%29%3B%20%2F%2F%3D%3E%20%5B%27write%27%2C%20%27more%27%2C%20%27tests%27%5D%0AR.append%28%27tests%27%2C%20%5B%5D%29%3B%20%2F%2F%3D%3E%20%5B%27tests%27%5D%0AR.append%28%5B%27tests%27%5D%2C%20%5B%27write%27%2C%20%27more%27%5D%29%3B%20%2F%2F%3D%3E%20%5B%27write%27%2C%20%27more%27%2C%20%5B%27tests%27%5D%5D)

**[⬆ вверх](#Документація)**



## apply
### `[Function]`

`(*… → a) → [*] → a`

#### Параметри:
| fn | Функція, яка буде викликана з аргументами `args` |
:---|:---|
| args | Аргументи, з якими має бути киликана функція `fn`. |
| повертає __*__ результат | Результат, рівний `fn(...args)` |

_Додано у версії v0.7.0_

Застосовує функцію `fn` до списку аргументів `args`. Це корисно для створення функції з фіксованою арністю із варіаційної функції. `fn` повинна бути прив'язаною функцією, у разі якщо контекст важливий.

Дивіться також [call](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#call), [unapply](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#unapply).

```javascript
var nums = [1, 2, 3, -99, 42, 6, 7];
R.apply(Math.max, nums); //=> 42
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;var%20nums%20%3D%20%5B1%2C%202%2C%203%2C%20-99%2C%2042%2C%206%2C%207%5D%3B%0AR.apply%28Math.max%2C%20nums%29%3B%20%2F%2F%3D%3E%2042)

**[⬆ вверх](#Документація)**



## applySpec
### `[Function]`

`{k: ((a, b, …, m) → v)} → ((a, b, …, m) → {k: v})`

#### Параметри:
| spec | Об'єкт, який рекурсивно відображає властивості функцій для отримання значеннь для цих властивостей. |
:---|:---|
| повертає __function__ | Функція, котра повертає об'єкт з такою ж структурою як і об'єкт `spec`, з кожною властивістю встановленою до значення, яке було повернуте викликом пов'язаної функції з переданими аргументами. |

_Додано у версії v0.20.0_

Враховуючи, що об'єкт `spec` рекурсивно відображає властивості для функції, створюється функція, яка створює об'єкт з такою самою структурою, шляхом співставлення кожної властивості з результатом виклику його пов'язаної функції з переданими аргументами.

Дивіться також [converge](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#converge), [juxt](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#juxt).

```javascript
var getMetrics = R.applySpec({
                                sum: R.add,
                                nested: { mul: R.multiply }
                             });
getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20getMetrics%20%3D%20R.applySpec%28%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20sum%3A%20R.add%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20nested%3A%20%7B%20mul%3A%20R.multiply%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%29%3B%0AgetMetrics%282%2C%204%29%3B%20%2F%2F%20%3D%3E%20%7B%20sum%3A%206%2C%20nested%3A%20%7B%20mul%3A%208%20%7D%20%7D)

**[⬆ вверх](#Документація)**



## ascend
### `[Function]`

`Ord b => (a → b) → a → a → Number`

#### Параметри:
| fn | Функція арністю один, котра повертає значення, яке може бути порівняним. |
:---|:---|
| a | Перший елемент для порівняння. |
| b | Другий елемент для порівняння. |
| повертає __Number__ | `-1` якщо `fn(a) < fn(b)`, `1` - якщо `fn(b) < fn(a)`, інакше поверне `0` |

_Додано у версії v0.23.0_

Робить висхідну функцію порівняння, яка повертає значення як може бути порівняне за допомогою `<` та `>`.

Дивіться також [descend](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#descend).

```javascript
var byAge = R.ascend(R.prop('age'));
var people = [
  // ...
];
var peopleByYoungestFirst = R.sort(byAge, people);
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20byAge%20%3D%20R.ascend%28R.prop%28%27age%27%29%29%3B%0Avar%20people%20%3D%20%5B%0A%20%20%2F%2F%20...%0A%5D%3B%0Avar%20peopleByYoungestFirst%20%3D%20R.sort%28byAge%2C%20people%29%3B)

**[⬆ вверх](#Документація)**



## assoc
### `[Object]`

`String → a → {k: v} → {k: v}`

#### Параметри:
| prop | Ім'я влативості яке має бути задане. |
:---|:---|
| val | Нове значення |
| obj | Об'єкт який має бути скопійований. |
| повертає __Object__ | Новий об'єкт, еквівалентний оригінальному, окрім зміненої властивості. |

_Додано у версії v0.8.0_

Робить поверхневу копію об'єкта задаючи чи перезаписуючи зазначену властивість новим значенням. __Зауважте__, що це так само копіює та вирівнює значення прототипів у нового об'єкта. Всі не примітивні значення копіюються за посиланням.

Дивіться також [dissoc](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#dissoc).

```javascript
R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;R.assoc%28%27c%27%2C%203%2C%20%7Ba%3A%201%2C%20b%3A%202%7D%29%3B%20%2F%2F%3D%3E%20%7Ba%3A%201%2C%20b%3A%202%2C%20c%3A%203%7D)

**[⬆ вверх](#Документація)**



## assocPath
### `[Object]`

`[Idx] → a → {a} → {a}`
`Idx = String | Int`

#### Параметри:
| path | шлях який треба задати. |
:---|:---|
| val | Нове значення |
| obj | Об'єкт який має бути скопійований. |
| повертає __Object__ | Новий об'єкт, еквівалентний оригінальному, окрім зазначеного шляху. |

_Додано у версії v0.8.0_

Робить поверхневу копію об'єкта, встановлюючи чи перезаписуючи вузли, які необхідні для створення зазначеного шляху і вставляючі зазначене значення в кінці того шляху. __Зауважте__, що це так само копіює та вирівнює значення прототипів у нового об'єкта. Всі не примітивні значення копіюються за посиланням.

Дивіться також [dissocPath](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#dissocPath).

```javascript
R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}

// Any missing or non-object keys in path will be overridden
R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;R.assocPath%28%5B%27a%27%2C%20%27b%27%2C%20%27c%27%5D%2C%2042%2C%20%7Ba%3A%20%7Bb%3A%20%7Bc%3A%200%7D%7D%7D%29%3B%20%2F%2F%3D%3E%20%7Ba%3A%20%7Bb%3A%20%7Bc%3A%2042%7D%7D%7D%0A%0A%2F%2F%20Any%20missing%20or%20non-object%20keys%20in%20path%20will%20be%20overridden%0AR.assocPath%28%5B%27a%27%2C%20%27b%27%2C%20%27c%27%5D%2C%2042%2C%20%7Ba%3A%205%7D%29%3B%20%2F%2F%3D%3E%20%7Ba%3A%20%7Bb%3A%20%7Bc%3A%2042%7D%7D%7D)

**[⬆ вверх](#Документація)**



## binary
### `[Function]`

`(* → c) → (a, b → c)`

#### Параметри:
| fn | Функція, яку необхідно обгорнути. |
:---|:---|
| повертає __function__ | Нова функція, яка огортає функцію `fn`. Нова функція гарантовано має арність 2. |

_Додано у версії v0.2.0_

Обгортає функцію будь-якої арності(включаючи нулярну) у функцію, котра приймає в себе чітко 2 аргументи. Жоден з надлишкових аргументів не буде переданий у обгорнуту функцію.

Дивіться також [nAry](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#nary), [unary](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#unary).

```javascript
var takesThreeArgs = function(a, b, c) {
  return [a, b, c];
};
takesThreeArgs.length; //=> 3
takesThreeArgs(1, 2, 3); //=> [1, 2, 3]

var takesTwoArgs = R.binary(takesThreeArgs);
takesTwoArgs.length; //=> 2
// Only 2 arguments are passed to the wrapped function
takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;var takesThreeArgs %3D function(a%2C b%2C c) {%0A return [a%2C b%2C c]%3B%0A}%3B%0AtakesThreeArgs.length%3B %2F%2F%3D> 3%0AtakesThreeArgs(1%2C 2%2C 3)%3B %2F%2F%3D> [1%2C 2%2C 3]%0A%0Avar takesTwoArgs %3D R.binary(takesThreeArgs)%3B%0AtakesTwoArgs.length%3B %2F%2F%3D> 2%0A%2F%2F Only 2 arguments are passed to the wrapped function%0AtakesTwoArgs(1%2C 2%2C 3)%3B %2F%2F%3D> [1%2C 2%2C undefined])

**[⬆ вверх](#Документація)**



## bind
### `[Function]`

`(* → *) → {*} → (* → *)`

#### Параметри:
| fn | Функція, яку необхідно прив'язати до контексту. |
:---|:---|
| thisObj | Контекст, до якого прив'язується функція `fn` |
| повертає __function__ | Функція, яка буде виконана у контексті `thisObj`. |

_Додано у версії v0.6.0_

Створює функцію прив'язану до контесту. __Зауважте:__ `R.bind` не надає додаткових можливостей до `Function.prototype.bind`.

Дивіться також [partial](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#partial).

```javascript
var log = R.bind(console.log, console);
R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
// logs {a: 2}
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20log%20%3D%20R.bind%28console.log%2C%20console%29%3B%0AR.pipe%28R.assoc%28%27a%27%2C%202%29%2C%20R.tap%28log%29%2C%20R.assoc%28%27a%27%2C%203%29%29%28%7Ba%3A%201%7D%29%3B%20%2F%2F%3D%3E%20%7Ba%3A%203%7D%0A%2F%2F%20logs%20%7Ba%3A%202%7D)

**[⬆ вверх](#Документація)**



## both
### `[Logic]`

`(*… → Boolean) → (*… → Boolean) → (*… → Boolean)`

#### Параметри:
| f | Предикат |
:---|:---|
| g | Інший предикат |
| повертає __function__ | функція, що застосовує свої аргументи до `f` та `g` та `&&` їх результатів разом. |

_Додано у версії v0.12.0_

Функція,яка викликає дві переданих функції і повертає `&&` результату. Це поверне результат першої функції, якщо вона `false`і, а інакше поверне другу функцію. __Зауважте__, що коротке замикання, а це означає, що друга функція не буде викликана, якщо перша поверне значення `false`.

В додачу до функцій, `R.both` також приймає будь-які сумісні з `fantasy-land` аплікативні функтори.

Дивіться також [and](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#and).

```javascript
var gt10 = R.gt(R.__, 10)
var lt20 = R.lt(R.__, 20)
var f = R.both(gt10, lt20);
f(15); //=> true
f(30); //=> false
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;var%20gt10%20%3D%20R.gt%28R.__%2C%2010%29%0Avar%20lt20%20%3D%20R.lt%28R.__%2C%2020%29%0Avar%20f%20%3D%20R.both%28gt10%2C%20lt20%29%3B%0Af%2815%29%3B%20%2F%2F%3D%3E%20true%0Af%2830%29%3B%20%2F%2F%3D%3E%20false)

**[⬆ вверх](#Документація)**



## call
### `[Function]`

`(*… → a),*… → a`

#### Параметри:
| fn | Функція, яку потрвібно застосувати до лишившихся аргументів. |
:---|:---|
| args | Будь-яка кількість позиційних аргументів. |
| повертає __*__ |   |

_Додано у версії v0.9.0_

Повертає результат виклику першого аргумента та залишивіся аргументи. Інколи це корисно в якості конверційнрї функції для `R.converge`: перша гілка може утворити функцію, в той час як решта гілок утворюють значення, які будуть передані у ту утворену функцію в якості аргументів.

Дивіться також [apply](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#apply).

```javascript
R.call(R.add, 1, 2); //=> 3

var indentN = R.pipe(R.times(R.always(' ')),
                     R.join(''),
                     R.replace(/^(?!$)/gm));

var format = R.converge(R.call, [
                            R.pipe(R.prop('indent'), indentN),
                            R.prop('value')
                        ]);

format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?R.call%28R.add%2C%201%2C%202%29%3B%20%2F%2F%3D%3E%203%0A%0Avar%20indentN%20%3D%20R.pipe%28R.times%28R.always%28%27%20%27%29%29%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20R.join%28%27%27%29%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20R.replace%28%2F%5E%28%3F%21%24%29%2Fgm%29%29%3B%0A%0Avar%20format%20%3D%20R.converge%28R.call%2C%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20R.pipe%28R.prop%28%27indent%27%29%2C%20indentN%29%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20R.prop%28%27value%27%29%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%29%3B%0A%0Aformat%28%7Bindent%3A%202%2C%20value%3A%20%27foo%5Cnbar%5Cnbaz%5Cn%27%7D%29%3B%20%2F%2F%3D%3E%20%27%20%20foo%5Cn%20%20bar%5Cn%20%20baz%5Cn%27)

**[⬆ вверх](#Документація)**



## chain
### `[List]`

`Chain m => (a → m b) → m a → m b`

#### Параметри:
| fn | Функція, з якою треба поєднати. |
:---|:---|
| list | Список для відображення. |
| повертає __Array__ | Результат плаского відображення списку `list` з функцією `fn`. |

_Додано у версії v0.3.0_

`chain` застосовує функцію до списку та об'єднує результати. `chain` також відомий у деяких бібліотеках як `flatMap`.

Виконується метод `chain` другого аргументу(якщо він наявний), згадно до [FantasyLand Chain специфікації](https://github.com/fantasyland/fantasy-land#chain).

Дивіться також [apply](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#apply).

```javascript
var duplicate = n => [n, n];
R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]

R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;var%20duplicate%20%3D%20n%20%3D%3E%20%5Bn%2C%20n%5D%3B%0AR.chain%28duplicate%2C%20%5B1%2C%202%2C%203%5D%29%3B%20%2F%2F%3D%3E%20%5B1%2C%201%2C%202%2C%202%2C%203%2C%203%5D%0A%0AR.chain%28R.append%2C%20R.head%29%28%5B1%2C%202%2C%203%5D%29%3B%20%2F%2F%3D%3E%20%5B1%2C%202%2C%203%2C%201%5D)

**[⬆ вверх](#Документація)**



## compose
### `[Function]`

`((y → z), (x → y), …, (o → p), ((a, b, …, n) → o)) → ((a, b, …, n) → z)`

#### Параметри:
| ...functions | Функції, які мають бути складені. |
:---|:---|
| повертає __function__ | Складену функцію |

_Додано у версії v0.1.0_

Виконує складання функції справа наліво. Крайня права функція може мати будь-яку арність, а інші функції повинні бути унарними.

__Зауважте:__ Результат методу `compose` не каррується автоматично.

Дивіться також [pipe](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#pipe).

```javascript
var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
var yellGreeting = R.compose(R.toUpper, classyGreeting);
yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"

R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20classyGreeting%20%3D%20%28firstName%2C%20lastName%29%20%3D%3E%20%22The%20name%27s%20%22%20%2B%20lastName%20%2B%20%22%2C%20%22%20%2B%20firstName%20%2B%20%22%20%22%20%2B%20lastName%0Avar%20yellGreeting%20%3D%20R.compose%28R.toUpper%2C%20classyGreeting%29%3B%0AyellGreeting%28%27James%27%2C%20%27Bond%27%29%3B%20%2F%2F%3D%3E%20%22THE%20NAME%27S%20BOND%2C%20JAMES%20BOND%22%0A%0AR.compose%28Math.abs%2C%20R.add%281%29%2C%20R.multiply%282%29%29%28-4%29%20%2F%2F%3D%3E%207)

**[⬆ вверх](#Документація)**



## converge
### `[Function]`

`(x1 → x2 → … → z) → [(a → b → … → x1), (a → b → … → x2), …] → (a → b → … → z)`

#### Параметри:
| after | Функція. `after` буде викликана з повертаємими значеннями `fn1` та `fn2` як її аргументи. |
:---|:---|
| functions | Список функцій. |
| повертає __function__ | Нова функція. |

_Додано у версії v0.4.2_

Приймає функцію перетворювач та список функцій та повертає нову функцію. Під час виклику ця нова функція застосовується до деяких аргументів, кожна передана функція застосовується до відповідних аргументів. Результат кожної застосованої функції передається як аргумент до функції перетворювача для створення повертаємого значення.

Дивіться також [useWith](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#usewith).

```javascript
var average = R.converge(R.divide, [R.sum, R.length])
average([1, 2, 3, 4, 5, 6, 7]) //=> 4

var strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
strangeConcat("Yodel") //=> "YODELyodel"
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;var%20average%20%3D%20R.converge%28R.divide%2C%20%5BR.sum%2C%20R.length%5D%29%0Aaverage%28%5B1%2C%202%2C%203%2C%204%2C%205%2C%206%2C%207%5D%29%20%2F%2F%3D%3E%204%0A%0Avar%20strangeConcat%20%3D%20R.converge%28R.concat%2C%20%5BR.toUpper%2C%20R.toLower%5D%29%0AstrangeConcat%28%22Yodel%22%29%20%2F%2F%3D%3E%20%22YODELyodel%22)

**[⬆ вверх](#Документація)**



## descend
### `[Function]`

`Ord b => (a → b) → a → a → Number`

#### Параметри:
| fn | Функція з арністю один, яка повертає значення, яке може бути порівняне |
:---|:---|
| a | Перший елемент, який буде порівняно. |
| b | Другий елемент, який буде порівняно. |
| повертає __Number__ | `-1` у випадку, якщо `fn(a) > fn(b)`, або `1`, якщо `fn(b) > fn(a), у інших випадках поверне `0` |

_Додано у версії v0.23.0_

Створює низхідну функцію порівняння з функції, яка повертає значення, яке, в подальшому, може бути порівняне з `<` та `>`.

Дивіться також [ascend](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#ascend).

```javascript
var byAge = R.descend(R.prop('age'));
var people = [
  // ...
];
var peopleByOldestFirst = R.sort(byAge, people);
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20byAge%20%3D%20R.descend%28R.prop%28%27age%27%29%29%3B%0Avar%20people%20%3D%20%5B%0A%20%20%2F%2F%20...%0A%5D%3B%0Avar%20peopleByOldestFirst%20%3D%20R.sort%28byAge%2C%20people%29%3B)

**[⬆ вверх](#Документація)**



## dissoc
### `[Object]`

`String → {k: v} → {k: v}`

#### Параметри:
| prop | Ім'я властивості, яку треба дисоціювати(відокремити) |
:---|:---|
| obj | Об'єкт, який потрібно клонувати |
| повертає __Object__ | Новий об'єкт, еквівалентний почавтковому, але без зазначеної властивості. |

_Додано у версії v0.10.0_

Повертає об'єкт, котрий не містись зазначеної властивості `prop`.

Дивіться також [assoc](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#assoc).

```javascript
R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.25.0#?R.dissoc%28%27b%27%2C%20%7Ba%3A%201%2C%20b%3A%202%2C%20c%3A%203%7D%29%3B%20%2F%2F%3D%3E%20%7Ba%3A%201%2C%20c%3A%203%7D)

**[⬆ вверх](#Документація)**



## identity
### `[Function]`

`a → a`

#### Параметри:
| x | Значення яке повернути. |
:---|:---|
| повертає __*__ | Введене значення `x` |

_Додано у версії v0.1.0_

Функція, яка нічого не робить, але повертає переданий в неї аргумент. Гарно підходить, щоб бути функцією за замовчуванням чи функцією-заповнювачем.

```javascript
R.identity(1); //=> 1

var obj = {};
R.identity(obj) === obj; //=> true
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?R.identity%281%29%3B%20%2F%2F%3D%3E%201%0A%0Avar%20obj%20%3D%20%7B%7D%3B%0AR.identity%28obj%29%20%3D%3D%3D%20obj%3B%20%2F%2F%3D%3E%20true)

**[⬆ вверх](#Документація)**



## into
### `[List]`

`a → (b → b) → [c] → a`

#### Параметри:
| acc | Початкове значення накопичувача. |
:---|:---|
| xf | Функція-перетворювач. Отримує трансформер і повертає трансформер. |
| list | Список, який потрібно перебрати. |
| повертає __*__ | Остаточне накопичене значення |

_Додано у версії v0.12.0_

Перетворює елементи списку за допомогою перетворювача(transducer) і додає трансформовані елементи до накопичувача, використовуючи відповідну функцію-ітератор в залежності від типу накопичувача.

Накопичувач може бути масивом, об'єктом чи трансформером. Перебрані елементи буде додано до масивів і об'єднано у строки. Об'єкти будуть об'єднані безпосередньо чи масиви з двома елементами будуть об'єднані у вигляді пар ключ-значення.

Накопичувач(акумулятор) може також бути об'єктом-трансформером, який абезпечує бінарність(2-арність) зменшення функції-ітератора, крок(step), нулярність(0-арність) початкового значення функціх, ініт(init), та унарність(1-арність) результату функції-витягнення, результат(result). Функція step використовується в якості функції-ітератора у методі reduce. Функція result використовується для перетворення кінцевого накопичувача у повертаємий тип і у більшості випадків являється `R.identity`. Функція init використовується для передачі початкового накопичувача.

Ітерації виконуються за допомогою `R.reduce` після ініціалізації перетворювача(transducer).

```javascript
var numbers = [1, 2, 3, 4];
var transducer = R.compose(R.map(R.add(1)), R.take(2));

R.into([], transducer, numbers); //=> [2, 3]

var intoArray = R.into([]);
intoArray(transducer, numbers); //=> [2, 3]
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20numbers%20%3D%20%5B1%2C%202%2C%203%2C%204%5D%3B%0Avar%20transducer%20%3D%20R.compose%28R.map%28R.add%281%29%29%2C%20R.take%282%29%29%3B%0A%0AR.into%28%5B%5D%2C%20transducer%2C%20numbers%29%3B%20%2F%2F%3D%3E%20%5B2%2C%203%5D%0A%0Avar%20intoArray%20%3D%20R.into%28%5B%5D%29%3B%0AintoArray%28transducer%2C%20numbers%29%3B%20%2F%2F%3D%3E%20%5B2%2C%203%5D)

**[⬆ вверх](#Документація)**



## map
### `[List]`

`Functor f => (a → b) → f a → f b`

#### Параметри:
| fn | Фунція, яка має бути викликана по відношенню до кожного елемента зі вхідного списку (`list`). |
:---|:---|
| list | Масив, який має бути перебраний. |
| повертає __Array__ | Новий список. |

_Додано у версії v0.1.0_

Приймає функцію та функтор, застосовує функцію до кожного значення у функторі і повертає функтор такої ж форми.

Ramda надає зручну реалізацію `map` для `Array` та `Object`, тому ця функція може бути застосована як до `[1, 2, 3]`, так і до `{x: 1, y: 2, z: 3}`.

Застосовується до `map` методу другого аргументу, якщо присутній.

Поводиться як трансдьюсер(`transducer`), якщо `transformer` передано на місці списку.

Також сприймає функції як функтори і зробить з них композицію.

Дивіться також [transduce](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#transduce), [addIndex](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#addindex).

```javascript
var double = x => x * 2;

R.map(double, [1, 2, 3]); //=> [2, 4, 6]

R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.25.0#?var%20double%20%3D%20x%20%3D%3E%20x%20%2A%202%3B%0A%0AR.map%28double%2C%20%5B1%2C%202%2C%203%5D%29%3B%20%2F%2F%3D%3E%20%5B2%2C%204%2C%206%5D%0A%0AR.map%28double%2C%20%7Bx%3A%201%2C%20y%3A%202%2C%20z%3A%203%7D%29%3B%20%2F%2F%3D%3E%20%7Bx%3A%202%2C%20y%3A%204%2C%20z%3A%206%7D)

**[⬆ вверх](#Документація)**



## none
### `[List]`

`(a → Boolean) → [a] → Boolean`

#### Параметри:
| fn | Функція предикат |
:---|:---|
| list | Масив, який має бути оцінений. |
| повертає __Boolean__ | `true`, якщо предикат не вдовольняє жоден з елементів, в іншому випадку повернеться `false`. |

_Додано у версії v0.12.0_

Повертає `true`, якщо жоден елемент списку не відповідає предикату, в іншому випадку поверне `false`.

Застосовує до кожного методу другого аргументу, якщо він присутній.

Дивіться також [all](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#all), [any](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#any).

```javascript
var isEven = n => n % 2 === 0;

R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
R.none(isEven, [1, 3, 5, 7, 8, 11]); //=> false
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20isEven%20%3D%20n%20%3D%3E%20n%20%25%202%20%3D%3D%3D%200%3B%0A%0AR.none%28isEven%2C%20%5B1%2C%203%2C%205%2C%207%2C%209%2C%2011%5D%29%3B%20%2F%2F%3D%3E%20true%0AR.none%28isEven%2C%20%5B1%2C%203%2C%205%2C%207%2C%208%2C%2011%5D%29%3B%20%2F%2F%3D%3E%20false)

**[⬆ вверх](#Документація)**



## path
### `[Object]`

`[Idx] → {a} → a | Undefined`
`Idx = String | Int`

#### Параметри:
| path | Шлях за яким треба провести пошук. | 
:---|:---|

| obj | Об'єкт, в якому треба віднайти потрібну властивість. |
| повертає __*__ | Дані які знаходять за вказаний шляхом `path`. |

_Додано у версії v0.2.0_

Знаходить значення за вказаним шляхом.

Дивіться також [path](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#prop).

```javascript
R.path(['a', 'b'], {a: {b: 2}}); //=> 2
R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?R.path%28%5B%27a%27%2C%20%27b%27%5D%2C%20%7Ba%3A%20%7Bb%3A%202%7D%7D%29%3B%20%2F%2F%3D%3E%202%0AR.path%28%5B%27a%27%2C%20%27b%27%5D%2C%20%7Bc%3A%20%7Bb%3A%202%7D%7D%29%3B%20%2F%2F%3D%3E%20undefined)

**[⬆ вверх](#Документація)**



## pathEq
### `[Relation]`

`[Idx] → a → {a} → Boolean`

| val | Значення, з яким потрібно порівняти вкладену властивість. |
| obj | Об'єкт, в якому треба перевірити вкладену властивість. |
| повертає __*__ | Дані які знаходять за вказаний шляхом `path`. |

_Додано у версії v0.7.0_

Визначає чи об'єкт містить певне значення за вказаним шляхом в плані `R.equals`. Найчастіше використовується для фільтрації списку.

```javascript
var user1 = { address: { zipCode: 90210 } };
var user2 = { address: { zipCode: 55555 } };
var user3 = { name: 'Bob' };
var users = [ user1, user2, user3 ];
var isFamous = R.pathEq(['address', 'zipCode'], 90210);
R.filter(isFamous, users); //=> [ user1 ]
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20user1%20%3D%20%7B%20address%3A%20%7B%20zipCode%3A%2090210%20%7D%20%7D%3B%0Avar%20user2%20%3D%20%7B%20address%3A%20%7B%20zipCode%3A%2055555%20%7D%20%7D%3B%0Avar%20user3%20%3D%20%7B%20name%3A%20%27Bob%27%20%7D%3B%0Avar%20users%20%3D%20%5B%20user1%2C%20user2%2C%20user3%20%5D%3B%0Avar%20isFamous%20%3D%20R.pathEq%28%5B%27address%27%2C%20%27zipCode%27%5D%2C%2090210%29%3B%0AR.filter%28isFamous%2C%20users%29%3B%20%2F%2F%3D%3E%20%5B%20user1%20%5D).

**[⬆ вверх](#Документація)**



## pipe
### `[Function]`

`(((a, b, …, n) → o), (o → p), …, (x → y), (y → z)) → ((a, b, …, n) → z)`

#### Параметри:
| ...functions |
:---|
| повертає __function__ |

_Додано у версії v0.1.0_

Виконує складання функції зліва направо. Крайня ліва функція може мати будь-яку арність, а інші функції повинні бути унарними.

В деяких бібліотеках ця функція називається `sequence`.

__Зауважте:__ Результат методу `pipe` не каррується автоматично.

Дивіться також [compose](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#compose).

```javascript
var f = R.pipe(Math.pow, R.negate, R.inc);

f(3, 4); // -(3^4) + 1
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20f%20%3D%20R.pipe%28Math.pow%2C%20R.negate%2C%20R.inc%29%3B%0A%0Af%283%2C%204%29%3B%20%2F%2F%20-%283%5E4%29%20%2B%201)

**[⬆ вверх](#Документація)**



## prepend
### `[List]`

`a → [a] → [a]`

#### Параметри:
| el | Елемент, який треба додати до початку списку. |
:---|:---|
| list | Список елементів до якого слід додати елемент. |
| повертає __Array__ | Новий масив. |

_Додано у версії v0.1.0_

Повертає новий список, в якому знаходяться елементи переданого в якості параметру списку, та на початку елемент переданий в якості аргументу.

Дивіться також [append](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#append).

```javascript
R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;R.prepend%28%27fee%27%2C%20%5B%27fi%27%2C%20%27fo%27%2C%20%27fum%27%5D%29%3B%20%2F%2F%3D%3E%20%5B%27fee%27%2C%20%27fi%27%2C%20%27fo%27%2C%20%27fum%27%5D)

**[⬆ вверх](#Документація)**



## props
### `[Object]`

`s → {s: a} → a | Undefined`

#### Параметри:
| p | Ім'я властивності | 
:---|:---|
| obj | Об'єкт запиту |
| повертає __*__ | Значення на місці `obj.p`. |

_Додано у версії v0.1.0_

Повертає функцію, яка, коли в неї передано об'єкт, повертає відповідну властивість цього об'єкту, якщо вона існує.

Дивіться також [path](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#path).

```javascript
R.prop('x', {x: 100}); //=> 100
R.prop('x', {}); //=> undefined
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?R.prop%28%27x%27%2C%20%7Bx%3A%20100%7D%29%3B%20%2F%2F%3D%3E%20100%0AR.prop%28%27x%27%2C%20%7B%7D%29%3B%20%2F%2F%3D%3E%20undefined)

**[⬆ вверх](#Документація)**



## reduce
### `[List]`

`((a, b) → a) → a → [b] → a`

#### Параметри:
| fn | Функція-ітератор. Отримує два значення, накопичувач(аккумулятор) і поточний елемент з масиву. |
:---|:---|
| acc | Значення накопичувача. |
| list | Список, який потрібно перебрати. |
| повертає __*__ | Остаточне накопичене значення |

_Додано у версії v0.1.0_

Під час ітерації(перебору) списку повертає єдиний елемент, послідовно викликаючи функцію-ітератор і передаючи їй значення акумулятора і поточне значення з масиву, а потім передає результат до наступного виклику.

Функція-ітератор отримує два значення: _(acc, value)_. Вона може використовувати `R.reduced` для комбінації ітерації.

Порядок аргументів у функції-ітераторі `reduceRight` є таким: _(value, acc)_.

**Зауважте:** `R.reduce` не пропускає видалені чи нерозподілені індекси(розріджені масиви), на відміну від вбудованого в javascript методу `Array.prototype.reduce`. Більш детальну інформацію, щодо цієї поведінки дивіться тут: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description)

Якщо присутній третій аргумент він також передається у метод `reduce`. При цьому, залежить від користувача, що робити з `R.reduced`, оскільки це не реалізовано у `reduce`.

Дивіться також [reduced](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#reduced), [addIndex](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#addindex), [reduceRight](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#reduceright).

```javascript
R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
          -               -10
         / \              / \
        -   4           -6   4
       / \              / \
      -   3   ==>     -3   3
     / \              / \
    -   2           -1   2
   / \              / \
  0   1            0   1
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?R.reduce%28R.subtract%2C%200%2C%20%5B1%2C%202%2C%203%2C%204%5D%29%20%2F%2F%20%3D%3E%20%28%28%28%280%20-%201%29%20-%202%29%20-%203%29%20-%204%29%20%3D%20-10%0A%2F%2F%20%20%20%20%20%20%20%20%20%20-%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20-10%0A%2F%2F%20%20%20%20%20%20%20%20%20%2F%20%5C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%20%5C%0A%2F%2F%20%20%20%20%20%20%20%20-%20%20%204%20%20%20%20%20%20%20%20%20%20%20-6%20%20%204%0A%2F%2F%20%20%20%20%20%20%20%2F%20%5C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%20%5C%0A%2F%2F%20%20%20%20%20%20-%20%20%203%20%20%20%3D%3D%3E%20%20%20%20%20-3%20%20%203%0A%2F%2F%20%20%20%20%20%2F%20%5C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%20%5C%0A%2F%2F%20%20%20%20-%20%20%202%20%20%20%20%20%20%20%20%20%20%20-1%20%20%202%0A%2F%2F%20%20%20%2F%20%5C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%20%5C%0A%2F%2F%20%200%20%20%201%20%20%20%20%20%20%20%20%20%20%20%200%20%20%201)

**[⬆ вверх](#Документація)**



## reduced
### `[List]`

`a → *`

#### Параметри:
| x | Фінальний результат `reduce`. |
:---|:---|
| повертає __*__ | Загорнуте значення |

_Додано у версії v0.15.0_

Повертає значення завернуте, щоб відзначити, що це остаточне значення функцій `reduce` та `transduce`. Значення, що повертається слід розглядати як чорний ящик: немає гарантій, що внутрішня структура стабільна.

**Зауважте:** ця оптимізація не доступна для функцій не перечислених вище. Наприклад, наразі немає підтримки `reduceRight`.

Дивіться також [reduce](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#reduce), [transduce](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#transduce).

```javascript
R.reduce(
 (acc, item) => item > 3 ? R.reduced(acc) : acc.concat(item),
 [],
 [1, 2, 3, 4, 5]) // [1, 2, 3]
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?R.reduce%28%0A%20%28acc%2C%20item%29%20%3D%3E%20item%20%3E%203%20%3F%20R.reduced%28acc%29%20%3A%20acc.concat%28item%29%2C%0A%20%5B%5D%2C%0A%20%5B1%2C%202%2C%203%2C%204%2C%205%5D%29%20%2F%2F%20%5B1%2C%202%2C%203%5D)

**[⬆ вверх](#Документація)**



## reduceRight
### `[List]`

`(a, b → b) → b → [a] → b`

#### Параметри:
| fn | Функція-ітератор. Отримує два значення, поточний елемент з масиву і накопичувач(аккумулятор). |
:---|:---|
| acc | Значення накопичувача. |
| list | Список, який потрібно перебрати. |
| повертає __*__ | Остаточне накопичене значення |

_Додано у версії v0.1.0_

Під час ітерації(перебору) списку повертає єдиний елемент, послідовно викликаючи функцію-ітератор і передаючи їй значення акумулятора і поточне значення з масиву, а потім передає результат до наступного виклику.

Схожий на `reduce`, окрім того, що проходиться по переданому списку справа наліво.

Функція-ітератор отримує два значення: _(value, acc)_, в той час як послідовність аргументів у методі `reduce` - навпаки: _(acc, value)_.

**Зауважте:** `R.reduceRight` не пропускає видалені чи нерозподілені індекси(розріджені масиви), на відміну від вбудованого в javascript методу `Array.prototype.reduceRight`. Більш детальну інформацію, щодо цієї поведінки дивіться тут: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description)

Дивіться також [reduce](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#reduce), [addIndex](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#addindex).

```javascript
R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
    -               -2
   / \              / \
  1   -            1   3
     / \              / \
    2   -     ==>    2  -1
       / \              / \
      3   -            3   4
         / \              / \
        4   0            4   0
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?R.reduceRight%28R.subtract%2C%200%2C%20%5B1%2C%202%2C%203%2C%204%5D%29%20%2F%2F%20%3D%3E%20%281%20-%20%282%20-%20%283%20-%20%284%20-%200%29%29%29%29%20%3D%20-2%0A%2F%2F%20%20%20%20-%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20-2%0A%2F%2F%20%20%20%2F%20%5C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%20%5C%0A%2F%2F%20%201%20%20%20-%20%20%20%20%20%20%20%20%20%20%20%201%20%20%203%0A%2F%2F%20%20%20%20%20%2F%20%5C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%20%5C%0A%2F%2F%20%20%20%202%20%20%20-%20%20%20%20%20%3D%3D%3E%20%20%20%202%20%20-1%0A%2F%2F%20%20%20%20%20%20%20%2F%20%5C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%20%5C%0A%2F%2F%20%20%20%20%20%203%20%20%20-%20%20%20%20%20%20%20%20%20%20%20%203%20%20%204%0A%2F%2F%20%20%20%20%20%20%20%20%20%2F%20%5C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%20%5C%0A%2F%2F%20%20%20%20%20%20%20%204%20%20%200%20%20%20%20%20%20%20%20%20%20%20%204%20%20%200)

**[⬆ вверх](#Документація)**



## set
### `[Object]`

`Lens s a → a → s → s`
`Lens s a = Functor f => (a → f a) → s → f s`

#### Параметри:
| lens |
:---|
| v |
| x |
| повертає __*__ |

_Додано у версії v0.16.0_

Повертає результат "оновлення" структури даних після заміни її конкретної частини, визначеної лінзою, на нове надане значення.

Дивіться також [prop](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#prop), [lensIndex](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#lensindex), [lensProp](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#lensprop).

```javascript
var xLens = R.lensProp('x');

R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20xLens%20%3D%20R.lensProp%28%27x%27%29%3B%0A%0AR.set%28xLens%2C%204%2C%20%7Bx%3A%201%2C%20y%3A%202%7D%29%3B%20%20%2F%2F%3D%3E%20%7Bx%3A%204%2C%20y%3A%202%7D%0AR.set%28xLens%2C%208%2C%20%7Bx%3A%201%2C%20y%3A%202%7D%29%3B%20%20%2F%2F%3D%3E%20%7Bx%3A%208%2C%20y%3A%202%7D)

**[⬆ вверх](#Документація)**



## sort
### `[List]`

`(a,a → Number) → [a] → [a]`

#### Параметри:
| comparator | Функція сортування :: a -> b -> Int |
:---|:---|
| list | Список, який необхідно відсортувати |
| повертає __Array__ | Новий масив з елементами, які відсортовані за допомогою функції порівняння(`comparator`- компаратор). |

_Додано у версії v0.1.0_

Повертає копію списку, відсортованого за допомогою функції порівняння, яка повинна щоразу приймати два значення і повертати від'ємне число, якщо перше значення менше за друге, і позитивне число, коли перше значення більше за друге, і нуль, коли обидва значення рівні.
Будь ласка, зауважте, що це копія списку. `R.sort` не модифікує початковий список.

```javascript
var diff = function(a, b) { return a - b; };
R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20diff%20%3D%20function%28a%2C%20b%29%20%7B%20return%20a%20-%20b%3B%20%7D%3B%0AR.sort%28diff%2C%20%5B4%2C2%2C7%2C5%5D%29%3B%20%2F%2F%3D%3E%20%5B2%2C%204%2C%205%2C%207%5D)

**[⬆ вверх](#Документація)**



## sortBy
### `[Relation]`

`Ord b => (a → b) → [a] → [a]`

#### Параметри:
| fn |  |
:---|:---|
| list | Список, який необхідно відсортувати |
| повертає __Array__ | Новий список, відсортований за ключами, згенерованими функцією `fn` |

_Додано у версії v0.1.0_

Сортує список згідно з наданою функції.

```javascript
var sortByFirstItem = R.sortBy(R.prop(0));
var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
var pairs = [[-1, 1], [-2, 2], [-3, 3]];
sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
var alice = {
  name: 'ALICE',
  age: 101
};
var bob = {
  name: 'Bob',
  age: -10
};
var clara = {
  name: 'clara',
  age: 314.159
};
var people = [clara, bob, alice];
sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20sortByFirstItem%20%3D%20R.sortBy%28R.prop%280%29%29%3B%0Avar%20sortByNameCaseInsensitive%20%3D%20R.sortBy%28R.compose%28R.toLower%2C%20R.prop%28%27name%27%29%29%29%3B%0Avar%20pairs%20%3D%20%5B%5B-1%2C%201%5D%2C%20%5B-2%2C%202%5D%2C%20%5B-3%2C%203%5D%5D%3B%0AsortByFirstItem%28pairs%29%3B%20%2F%2F%3D%3E%20%5B%5B-3%2C%203%5D%2C%20%5B-2%2C%202%5D%2C%20%5B-1%2C%201%5D%5D%0Avar%20alice%20%3D%20%7B%0A%20%20name%3A%20%27ALICE%27%2C%0A%20%20age%3A%20101%0A%7D%3B%0Avar%20bob%20%3D%20%7B%0A%20%20name%3A%20%27Bob%27%2C%0A%20%20age%3A%20-10%0A%7D%3B%0Avar%20clara%20%3D%20%7B%0A%20%20name%3A%20%27clara%27%2C%0A%20%20age%3A%20314.159%0A%7D%3B%0Avar%20people%20%3D%20%5Bclara%2C%20bob%2C%20alice%5D%3B%0AsortByNameCaseInsensitive%28people%29%3B%20%2F%2F%3D%3E%20%5Balice%2C%20bob%2C%20clara%5D)

**[⬆ вверх](#Документація)**



## sortWith
### `[Relation]`

`[a → a → Number] → [a] → [a]`

#### Параметри:
| functions | Список функцій порівняннь |
:---|:---|
| list | Список, який необхідно відсортувати |
| повертає __Array__ | Новий список, відсортований згідно з функціями порівняння |

_Додано у версії v0.23.0_

Сортує список згідно зі списком функцій порівняннь.

```javascript
var alice = {
  name: 'alice',
  age: 40
};
var bob = {
  name: 'bob',
  age: 30
};
var clara = {
  name: 'clara',
  age: 40
};
var people = [clara, bob, alice];
var ageNameSort = R.sortWith([
  R.descend(R.prop('age')),
  R.ascend(R.prop('name'))
]);
ageNameSort(people); //=> [alice, clara, bob]
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20alice%20%3D%20%7B%0A%20%20name%3A%20%27alice%27%2C%0A%20%20age%3A%2040%0A%7D%3B%0Avar%20bob%20%3D%20%7B%0A%20%20name%3A%20%27bob%27%2C%0A%20%20age%3A%2030%0A%7D%3B%0Avar%20clara%20%3D%20%7B%0A%20%20name%3A%20%27clara%27%2C%0A%20%20age%3A%2040%0A%7D%3B%0Avar%20people%20%3D%20%5Bclara%2C%20bob%2C%20alice%5D%3B%0Avar%20ageNameSort%20%3D%20R.sortWith%28%5B%0A%20%20R.descend%28R.prop%28%27age%27%29%29%2C%0A%20%20R.ascend%28R.prop%28%27name%27%29%29%0A%5D%29%3B%0AageNameSort%28people%29%3B%20%2F%2F%3D%3E%20%5Balice%2C%20clara%2C%20bob%5D)

**[⬆ вверх](#Документація)**



## subtract
### `[Math]`

`Number → Number → Number`

#### Параметри:
| a | перший аргумент |
:---|:---|
| b | другий аргумент |
| повертає __Number__ | Результат `a-b` |

_Додано у версії v0.1.0_

Віднімає свій другий аргумент від першого.

Дивіться також [add](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#add).

```javascript
R.subtract(10, 8); //=> 2

var minus5 = R.subtract(R.__, 5);
minus5(17); //=> 12

var complementaryAngle = R.subtract(90);
complementaryAngle(30); //=> 60
complementaryAngle(72); //=> 18
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;R.subtract%2810%2C%208%29%3B%20%2F%2F%3D%3E%202%0A%0Avar%20minus5%20%3D%20R.subtract%28R.__%2C%205%29%3B%0Aminus5%2817%29%3B%20%2F%2F%3D%3E%2012%0A%0Avar%20complementaryAngle%20%3D%20R.subtract%2890%29%3B%0AcomplementaryAngle%2830%29%3B%20%2F%2F%3D%3E%2060%0AcomplementaryAngle%2872%29%3B%20%2F%2F%3D%3E%2018)

**[⬆ вверх](#Документація)**



## transduce
### `[List]`

`(c → c) → (a,b → a) → a → [b] → a`

#### Параметри:
| xf | Функція-перетворювач. Отримує трансформер і повертає трансформер. |
:---|:---|
| fn | Функція-ітератор. Отримує два значення, накопичувач(аккумулятор) і поточний елемент з масиву. За необхідності, загорнутий як трансформер і використовується для ініціалізації перетворювача |
| acc | Початкове значення накопичувача. |
| list | Список, який потрібно перебрати. |
| повертає __*__ | Остаточне накопичене значення |

_Додано у версії v0.12.0_

Ініціалізує перетворювач, використовуючи передану функцію-ітератор. Повертає єдиний елемент перебираючи список, послідовно викликаючи перетворену функцію-ітератор і передаючи їй значення акумулятора і поточне значення з масиву, а потім передає результат до наступного виклику.

Функція ітератор отримує два значення: _`(acc, value)`_ (накопичувач та значення). Вона буде загорнута як трансформер для ініціалізації перетворювача. Трансформер може бути переданий безпосередньо на місці функції-ітератора. У обох випадках ітерація може бути достроково зупинена функції `R.reduced`.

Перетворювач являє собою функцію, яка приймає трансформер, повертає трансформер і може бути зкладена(composed) безпосередньо.

Трансформер - це об'єкт, який забезпечує бінарне(2-арне) зменшення функції-ітератора, крок, нулярне(0-арне) початкове значення функції, init, та унарний (1-арний) результат функції витягання, результат. Функція крок використовується в якості функції-ітератора у зменшенні(reduce). Функція результат використовується для перетворення остаточного накопичення у повертаємий тип і у більшості випадків являється `R.identity`. Функція init може використовуватись для передачі початкового накопичувача, але ігнорується методом `transduce`.

Ітерації виконуються за допомогою `R.reduce` після ініціалізації перетворювача(transducer).

Дивіться також [reduce](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#reduce), [reduced](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#reduced), [into](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#into).

```javascript
var numbers = [1, 2, 3, 4];
var transducer = R.compose(R.map(R.add(1)), R.take(2));

R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20numbers%20%3D%20%5B1%2C%202%2C%203%2C%204%5D%3B%0Avar%20transducer%20%3D%20R.compose%28R.map%28R.add%281%29%29%2C%20R.take%282%29%29%3B%0A%0AR.transduce%28transducer%2C%20R.flip%28R.append%29%2C%20%5B%5D%2C%20numbers%29%3B%20%2F%2F%3D%3E%20%5B2%2C%203%5D)

**[⬆ вверх](#Документація)**



## update
### `[List]`

`Number → a → [a] → [a]`

#### Параметри:
| idx | Індекс, який необхідно оновити |
:---|:---|
| x | Значення, на яке має на зазначеному за індексом місці у масиві, що повернеться. |
| list | Цільовий масиво-подібний об'єкт, який має бути оновленим. |
| повертає __Array__ | A copy of `list` with the value at index `idx` replaced with `x`. |

_Додано у версії v0.14.0_

Повертає нову копію масиву з елементом(на вказаному за індексом місці) заміненим на передане значення.

Дивіться також [adjust](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#adjust).

```javascript
R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?R.update%281%2C%2011%2C%20%5B0%2C%201%2C%202%5D%29%3B%20%20%20%20%20%2F%2F%3D%3E%20%5B0%2C%2011%2C%202%5D%0AR.update%281%29%2811%29%28%5B0%2C%201%2C%202%5D%29%3B%20%20%20%20%20%2F%2F%3D%3E%20%5B0%2C%2011%2C%202%5D)

**[⬆ вверх](#Документація)**



## useWith
### `[Function]`

`(x1 → x2 → … → z) → [(a → x1), (b → x2), …] → (a → b → … → z)`

#### Параметри:
| fn | Функція яку треба обгорнути. |
:---|:---|
| transformers | Список функцій трансформерів. |
| повертає __function__ | Обгорнута функція. |

_Додано у версії v0.1.0_

Приймає функцію `fn` та список функцій-трансформерів та повертає нову карровану функцію. Коли нова функція викликається, вона викликає функцію `fn` з аргументами, які складаються з результату виклику кожного переданого обробника при послідовних аргументах нової функції.

Якщо до поверненої функції передано більше аргуменів ніж до функцій-трансформерів, то ті аргументи передаються напряму до функції `fn` в якості додаткових аргументів. Якщо ви очікуєте на додаткові аргументи, які не потрібно перетворювати, то не дивлячись на те, що ви можете їх проігнорувати, краще передати сутність функції, для того, щоб нова функція відображала правильну арність.

Дивіться також [converge](https://github.com/ivanzusko/ramda/blob/master/DOCUMENTATION.md#converge).

```javascript
R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;R.useWith%28Math.pow%2C%20%5BR.identity%2C%20R.identity%5D%29%283%2C%204%29%3B%20%2F%2F%3D%3E%2081%0AR.useWith%28Math.pow%2C%20%5BR.identity%2C%20R.identity%5D%29%283%29%284%29%3B%20%2F%2F%3D%3E%2081%0AR.useWith%28Math.pow%2C%20%5BR.dec%2C%20R.inc%5D%29%283%2C%204%29%3B%20%2F%2F%3D%3E%2032%0AR.useWith%28Math.pow%2C%20%5BR.dec%2C%20R.inc%5D%29%283%29%284%29%3B%20%2F%2F%3D%3E%2032)

**[⬆ вверх](#Документація)**



## xprod
### `[List]`

`[a] → [b] → [[a,b]]`

#### Параметри:
| as | Перший список. |
:---|:---|
| bs | Другий список. |
| повертає __Array__ | Список, створений за допомогою поєднання кожної можливої пари від `as` до `bs` у пари (`[a, b]`). |

_Додано у версії v0.1.0_

Створює новий список з двох переданих, за допомогою створення всіх можливих пар з цих списків.

```javascript
R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;R.xprod%28%5B1%2C%202%5D%2C%20%5B%27a%27%2C%20%27b%27%5D%29%3B%20%2F%2F%3D%3E%20%5B%5B1%2C%20%27a%27%5D%2C%20%5B1%2C%20%27b%27%5D%2C%20%5B2%2C%20%27a%27%5D%2C%20%5B2%2C%20%27b%27%5D%5D)

**[⬆ вверх](#Документація)**



## zip
### `[List]`

`[a] → [b] → [[a,b]]`

#### Параметри:
| list1 | Перший список. |
:---|:---|
| list2 | Другий список. |
| повертає __Array__ | Спикок, утворений попарним з'єднанням елементів з однаковим індексом зі списків `list1` та `list2`. |

_Додано у версії v0.1.0_

Створює новий список з двох переданих, методом попарного поєднання елементів, що мають у своїх списках однакові індекси. Утворений з двох списків масив має скорочену довжену.
__Зауважте:__ `zip` є еквівалентним до `zipWith(function(a, b) { return [a, b] })`.

```javascript
R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?R.zip%28%5B1%2C%202%2C%203%5D%2C%20%5B%27a%27%2C%20%27b%27%2C%20%27c%27%5D%29%3B%20%2F%2F%3D%3E%20%5B%5B1%2C%20%27a%27%5D%2C%20%5B2%2C%20%27b%27%5D%2C%20%5B3%2C%20%27c%27%5D%5D)

**[⬆ вверх](#Документація)**



## zipObj
### `[List]`

`[String] → [*] → {String: *}`

#### Параметри:
| keys | Масив, що стане властивостями фінального об'єкту. |
:---|:---|
| values | Список значення фінального об'єкту. |
| повертає __Object__ | Об'єкт, утворений попарним поєднанням елементів з однаковими індексами в якості ключ-значення. |

_Додано у версії v0.3.0_

Створює новий об'єкт зі списку ключів та списку значення. Поєднання ключ/значення обрізається до довжини більш короткого з двох списків. __Зауважте:__ `zipObj` еквівалентний до `pipe(zipWith(pair), fromPairs)`.

```javascript
R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;R.zipObj%28%5B%27a%27%2C%20%27b%27%2C%20%27c%27%5D%2C%20%5B1%2C%202%2C%203%5D%29%3B%20%2F%2F%3D%3E%20%7Ba%3A%201%2C%20b%3A%202%2C%20c%3A%203%7D)

**[⬆ вверх](#Документація)**



## zipWith
### `[List]`

`(a,b → c) → [a] → [b] → [c]`

#### Параметри:
| fn | Функція, яку слід використати для поєднання двох елементів у одне значення. |
:---|:---|
| list1 | Перший масив. |
| list2 | Другий масив. |
| повертає __Array__ | Список створений за допомогою поєднання елементів з однаковими індексами у списках `list1` та `list2` та застосуванню щодо них функції `fn`. |

_Додано у версії v0.1.0_

Створює новий список з двох переданих завдяки застосуванню функції до кожної пари, утвореної з двох елементів з однаковими індексами у своїх списках. і списку ключів та списку значення. Фінальний масив скорочується до довжини найкоротшого з переданих списків.

```javascript
var f = (x, y) => {
  // ...
};
R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
//=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#;var%20f%20%3D%20%28x%2C%20y%29%20%3D%3E%20%7B%0A%20%20%2F%2F%20...%0A%7D%3B%0AR.zipWith%28f%2C%20%5B1%2C%202%2C%203%5D%2C%20%5B%27a%27%2C%20%27b%27%2C%20%27c%27%5D%29%3B%0A%2F%2F%3D%3E%20%5Bf%281%2C%20%27a%27%29%2C%20f%282%2C%20%27b%27%29%2C%20f%283%2C%20%27c%27%29%5D)

**[⬆ вверх](#Документація)**
