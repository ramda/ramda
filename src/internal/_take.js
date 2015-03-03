var _makeXf = require('./_makeXf');
var _xfReduced = require('./_xfReduced');

module.exports = _makeXf({
    Ctor:function takeCtor(n, xf) {
        this.n = n;
        this.xf = xf;
        this.nTaken = 0;
    },
    init:function mapInit() {
        return this.xf.init();
    },
    result:function mapResult(result) {
        return this.xf.result(result);
    },
    step:function takeStep(result, value, key, coll) {
        if (this.nTaken++ < this.n) {
            return this.xf.step(result, value, key, coll);
        }
        else {
            return _xfReduced(result);
        }
    }
});
