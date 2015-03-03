// see https://clojuredocs.org/clojure.core/partition-by
var _makeXf = require('./_makeXf');

module.exports = _makeXf({
    Ctor: function PartitionByCtor(f, xf) {
        this.f = f;
        this.xf = xf;
        this.firstStep = false;
        this.toggle = null;
        this.batch = [];
    },
    init: function partitionByInit(result) {
        return this.xf.init();
    },
    result: function partitionByResult(result) {
        if (this.batch.length > 0) {
            result = this.xf.step(result, this.batch, void 0);
            this.batch = null;
            return this.xf.result(result);
        }
        // empty collection was passed in
        else {
            return this.xf.result(result);
        }
    },
    step: function partitionByStep(result, value, key, coll) {
        // first step, init some stuff
        if (this.firstStep === false) {
            this.firstStep = true;
            this.batch = [value];
            this.toggle = this.f(value, key, coll);
            return result;
        }
        else {
            var partitionVal = this.f(value, key, coll);
            // hit a new value
            // step with our current batch of values, start new batch
            if (partitionVal !== this.toggle) {
                result = this.xf.step(result, this.batch, key, coll);
                this.toggle = partitionVal;
                this.batch = [value];
            }
            // same value as current batch, mix in
            else {
                this.batch.push(value);
            }
            return result;
        }
    }
});
