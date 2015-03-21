var curry = require('./curry');


/**
 * Returns the result of applying `obj[methodName]` to `args`.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig String -> Object -> [*] -> *
 * @param {String} methodName
 * @param {Object} obj
 * @param {Array} args
 * @return {*}
 * @example
 *
 *      //  toBinary :: Number -> String
 *      var toBinary = R.invoke('toString', R.__, [2])
 *
 *      toBinary(42); //=> '101010'
 *      toBinary(63); //=> '111111'
 */
module.exports = curry(function invoke(methodName, obj, args) {
  return obj[methodName].apply(obj, args);
});
