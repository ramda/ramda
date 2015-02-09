var _concat = require('./_concat');
var _hasMethod = require('./_hasMethod');
var _map = require('./_map');
var _reduce = require('./_reduce');


module.exports = function _ap(fns, vs) {
    return _hasMethod('ap', fns) ? fns.ap(vs) : _reduce(function(acc, fn) {
        return _concat(acc, _map(fn, vs));
    }, [], fns);
};
