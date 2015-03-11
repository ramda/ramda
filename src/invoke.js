var _slice = require('./internal/_slice');
var curry = require('./curry');


/**
 * Returns the result of invoking `obj[methodName]` with the zero or more
 * positional arguments following `methodName` and `obj`.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig String -> Object -> *
 * @param {String} methodName
 * @param {Object} obj
 * @return {*}
 * @example
 *
 *      R.invoke('add', R, 1, 2); //=> 3
 *
 *      R.invoke('f', {f: function() { return 'f called'; }}); //=> 'f called'
 */
module.exports = curry(function invoke(methodName, obj) {
    return obj[methodName].apply(obj, _slice(arguments, 2));
});
