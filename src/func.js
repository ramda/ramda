var _slice = require('./internal/_slice');
var curry = require('./curry');


/**
 * Calls the specified function on the supplied object. Any additional arguments
 * after `fn` and `obj` are passed in to `fn`. If no additional arguments are passed to `func`,
 * `fn` is invoked with no arguments.
 *
 * @deprecated since v0.12.0
 * @func
 * @memberOf R
 * @category Object
 * @sig k -> {k : v} -> v(*)
 * @param {String} funcName The name of the property mapped to the function to invoke
 * @param {Object} obj The object
 * @return {*} The value of invoking `obj.fn`.
 * @see R.invoke
 * @example
 *
 *      R.func('add', R, 1, 2); //=> 3
 *
 *      var obj = { f: function() { return 'f called'; } };
 *      R.func('f', obj); //=> 'f called'
 */
module.exports = curry(function func(funcName, obj) {
  return obj[funcName].apply(obj, _slice(arguments, 2));
});
