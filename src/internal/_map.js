var _makeXf = require('./_makeXf');

module.exports = _makeXf({
    init:function mapInit() {
        return this.xf.init();
    },
    result:function mapResult(result) {
        return this.xf.result(result);
    },
    step:function mapStep(result, value, key, coll) {
        return this.xf.step(result, this.f(value, key, coll), key, coll);
    }
});
