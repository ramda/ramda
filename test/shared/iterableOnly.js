'use strict';

module.exports = iterable => Object.freeze({
  [Symbol.iterator]: () => iterable[Symbol.iterator]()
});
