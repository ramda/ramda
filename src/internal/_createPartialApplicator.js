var _meta = require('./_meta');
var _slice = require('./_slice');


module.exports = function _createPartialApplicator(concat) {
    return function(fn) {
        var args = _slice(arguments, 1);
        return _meta.set(function() {
            return fn.apply(this, concat(args, arguments));
        }, fn, Math.max(0, _meta.arity(fn) - args.length));
    };
};
