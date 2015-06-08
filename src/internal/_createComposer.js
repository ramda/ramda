var arity = require('../arity');


/*
 * Returns a function that makes a multi-argument version of compose from
 * either _compose or _composeP.
 */
module.exports = function _createComposer(composeFunction) {
  return function() {
    var fn = arguments[arguments.length - 1];
    var length = fn.length;
    var idx = arguments.length - 2;
    while (idx >= 0) {
      fn = composeFunction(arguments[idx], fn);
      idx -= 1;
    }
    return arity(length, fn);
  };
};
