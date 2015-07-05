var _curry1 = require('./internal/_curry1');


/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), and String (`''`). Other types are
 * supported if they define `<Type>.empty` and/or `<Type>.prototype.empty`.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig a -> a
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.empty(Just(42));      //=> Nothing()
 *      R.empty([1, 2, 3]);     //=> []
 *      R.empty('unicorns');    //=> ''
 *      R.empty({x: 1, y: 2});  //=> {}
 */
module.exports = _curry1(function empty(x) {
  if (x != null && typeof x.empty === 'function') {
    return x.empty();
  } else if (x != null && typeof x.constructor != null && typeof x.constructor.empty === 'function') {
    return x.constructor.empty();
  } else {
    switch (Object.prototype.toString.call(x)) {
      case '[object Array]':  return [];
      case '[object Object]': return {};
      case '[object String]': return '';
    }
  }
});
