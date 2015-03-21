var _slice = require('./_slice');
var arity = require('../arity');


module.exports = function _createPartialApplicator(concat) {
  return function(fn) {
    var args = _slice(arguments, 1);
    return arity(Math.max(0, fn.length - args.length), function() {
      return fn.apply(this, concat(args, arguments));
    });
  };
};
