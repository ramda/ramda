var _makeXf = require('./_makeXf');
var flatten = require('../flatten');

// maps over a collection and then concatenates the result
// see https://clojuredocs.org/clojure.core/mapcat
module.exports = _makeXf({
    init:function mapCatInit() {
        return this.xf.init();
    },
    result:function mapCatResult(result) {
        return this.xf.result(flatten(result));
    },
    step:function mapCatStep(result, value, key, coll) {
        return this.xf.step(result, this.f(value, key, coll), key, coll);
    }
});
