var arity = require('../arity');


/*
 * Returns a function that makes a multi-argument version of compose from
 * either _compose or _composeP.
 */
module.exports = function _createComposer(composeFunction) {
  return function() {
    var idx = arguments.length - 1;
    var fn = arguments[idx];
    var length = fn.length;
    while (--idx >= 0) {
      fn = composeFunction(arguments[idx], fn);
    }
    return arity(length, fn);
  };
};
