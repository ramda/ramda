# Документація

- [__](#__) `Function`
- [add](#add) `Math`
- [addIndex](#addindex) `Function`
- [adjust](#adjust) `List`
- [subtract](#subtract) `Math`

Here will live all translated methods names with anchor links to the translated sections below

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

Це, в свою чергу, перетворить, наприклад функцію `R.map` у функцію, яка більше нагадує `Array.prototype.map`. Зверніть увагу на те, що це спрацює лише для функцій, в яких ітеруюча функція зворотнього виклику є першим аргументом, а список - останнім. (Це)
This would turn, for instance, R.map function into one that more closely resembles Array.prototype.map. Note that this will only work for functions in which the iteration callback function is the first parameter, and where the list is the last parameter. (Останнє може бути не важливим, якщо аргумент списку не використовується.)

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
var isQueen = R.propEq('rank', 'Q');
var isSpade = R.propEq('suit', '♠︎');
var isQueenOfSpades = R.allPass([isQueen, isSpade]);

isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
```
Спробуйте у [REPL](http://ramdajs.com/repl/?v=0.24.1#?var%20isQueen%20%3D%20R.propEq%28%27rank%27%2C%20%27Q%27%29%3B%0Avar%20isSpade%20%3D%20R.propEq%28%27suit%27%2C%20%27%E2%99%A0%EF%B8%8E%27%29%3B%0Avar%20isQueenOfSpades%20%3D%20R.allPass%28%5BisQueen%2C%20isSpade%5D%29%3B%0A%0AisQueenOfSpades%28%7Brank%3A%20%27Q%27%2C%20suit%3A%20%27%E2%99%A3%EF%B8%8E%27%7D%29%3B%20%2F%2F%3D%3E%20false%0AisQueenOfSpades%28%7Brank%3A%20%27Q%27%2C%20suit%3A%20%27%E2%99%A0%EF%B8%8E%27%7D%29%3B%20%2F%2F%3D%3E%20true)

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
