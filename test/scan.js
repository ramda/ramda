var assert = require('assert');

var R = require('..');


describe('scan', function() {
    var add = function(a, b) {return a + b;};
    var mult = function(a, b) {return a * b;};

    it('scans simple functions over arrays with the supplied accumulator', function() {
        assert.deepEqual(R.scan(add, 0, [1, 2, 3, 4]), [0, 1, 3, 6, 10]);
        assert.deepEqual(R.scan(mult, 1, [1, 2, 3, 4]), [1, 1, 2, 6, 24]);
    });

    it('returns the accumulator for an empty array', function() {
        assert.deepEqual(R.scan(add, 0, []), [0]);
        assert.deepEqual(R.scan(mult, 1, []), [1]);
    });

    it('is automatically curried', function() {
        var addOrConcat = R.scan(add);
        var sum = addOrConcat(0);
        var cat = addOrConcat('');
        assert.deepEqual(sum([1, 2, 3, 4]), [0, 1, 3, 6, 10]);
        assert.deepEqual(cat(['1', '2', '3', '4']), ['', '1', '12', '123', '1234']);
    });

    it('correctly reports the arity of curried versions', function() {
        var sum = R.scan(add, 0);
        assert.strictEqual(sum.length, 1);
    });
});
