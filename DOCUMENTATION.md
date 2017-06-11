# Документація

- [__](#__) `Function`
- [add](#add) `Math`
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
