var _xfMakeType = require('./_xfMakeType');
var identity = require('../identity');

module.exports = _xfMakeType({
    step: function reduceStepFn(result, value, key, coll) {
        return this.f(result, value, key, coll);
    },
    init:function reduceInitFn(){},
    result:identity
});
