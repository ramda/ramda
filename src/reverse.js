var _curry1 = require('./internal/_curry1');
var _isGenerator = require('./internal/_isGenerator');
var _isString = require('./internal/_isString');
var _slice = require('./internal/_slice');
var take = require('./take');


/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */
module.exports = _curry1(function reverse(list) {
  if (_isGenerator(list)) {
    return function* reverseGenerator() {
      const arr = take(Infinity, list);
      let i = arr.length - 1;
      while (i >= 0) {
        yield arr[i];
        i -= 1;
      }
    };
  } else {
    return _isString(list) ? list.split('').reverse().join('') :
                             _slice(list).reverse();
  }
});
