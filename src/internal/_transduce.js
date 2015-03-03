var _reduce = require('./_reduce');
var _xfDefaultAccumulate = require('./_xfDefaultAccumulate');
var _xfDefaultInit = require('./_xfDefaultInit');
var _xfReducer = require('./_xfReducer');

module.exports = function _transduce(xf, coll) {
    var f = new _xfReducer(_xfDefaultAccumulate(coll));
    var init = _xfDefaultInit(coll);
    // build our transducer stack!
    xf = xf(f);
    return _reduce(xf, init, coll);
};
