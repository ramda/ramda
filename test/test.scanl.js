var assert = require('assert');
var R = require('..');

describe('scanl', function() {
    var add = function(a, b) {return a + b;};
    var mult = function(a, b) {return a * b;};

    it('scans simple functions over arrays with the supplied accumulator', function() {
        assert.deepEqual(R.scanl(add, 0, [1, 2, 3, 4]), [0, 1, 3, 6, 10]);
        assert.deepEqual(R.scanl(mult, 1, [1, 2, 3, 4]), [1, 1, 2, 6, 24]);
    });

    it('returns the accumulator for an empty array', function() {
        assert.deepEqual(R.scanl(add, 0, []), [0]);
        assert.deepEqual(R.scanl(mult, 1, []), [1]);
    });

    it('is automatically curried', function() {
        var addOrConcat = R.scanl(add);
        var sum = addOrConcat(0);
        var cat = addOrConcat('');
        assert.deepEqual(sum([1, 2, 3, 4]), [0, 1, 3, 6, 10]);
        assert.deepEqual(cat(['1', '2', '3', '4']), ['', '1', '12', '123', '1234']);
    });

    it('correctly reports the arity of curried versions', function() {
        var sum = R.scanl(add, 0);
        assert.equal(sum.length, 1);
    });

    it('throws if called with no arguments', function() {
        assert.throws(R.scanl, TypeError);
    });

    it('returns a function which throws if called with no arguments', function() {
        assert.throws(R.scanl(R.add), TypeError);
    });
});
