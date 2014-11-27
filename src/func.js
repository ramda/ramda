var _noArgsException = require('./internal/_noArgsException');
var _slice = require('./internal/_slice');


/**
 * Calls the specified function on the supplied object. Any additional arguments
 * after `fn` and `obj` are passed in to `fn`. If no additional arguments are passed to `func`,
 * `fn` is invoked with no arguments.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig k -> {k : v} -> v(*)
 * @param {String} funcName The name of the property mapped to the function to invoke
 * @param {Object} obj The object
 * @return {*} The value of invoking `obj.fn`.
 * @example
 *
 *      R.func('add', R, 1, 2); //=> 3
 *
 *      var obj = { f: function() { return 'f called'; } };
 *      R.func('f', obj); //=> 'f called'
 */
module.exports = function func(funcName, obj) {
    switch (arguments.length) {
        case 0: throw _noArgsException();
        case 1: return function(obj) { return obj[funcName].apply(obj, _slice(arguments, 1)); };
        default: return obj[funcName].apply(obj, _slice(arguments, 2));
    }
};
