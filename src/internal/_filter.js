var _makeXf = require('./_makeXf');

module.exports = _makeXf({
    init:function filterInit() {
        return this.xf.init();
    },
    result:function filterResult(result) {
        return this.xf.result(result);
    },
    step:function filterStep(result, value, key, coll) {
        return (
            this.f(value, key, coll) ?
                this.xf.step(result, value, key, coll) :
            // else
                result
        );
    }
});
