var assert = require('assert');

var R = require('..');


describe('mapAccumRight', function() {
    var add = function(a, b) {return [a + b, a + b];};
    var mult = function(a, b) {return [a * b, a * b];};

    it('map and accumulate simple functions over arrays with the supplied accumulator', function() {
        assert.deepEqual(R.mapAccumRight(add, 0, [1, 2, 3, 4]), [10, [10, 9, 7, 4]]);
        assert.deepEqual(R.mapAccumRight(mult, 1, [1, 2, 3, 4]), [24, [24, 24, 12, 4]]);
    });

    it('returns the list and accumulator for an empty array', function() {
        assert.deepEqual(R.mapAccumRight(add, 0, []), [0, []]);
        assert.deepEqual(R.mapAccumRight(mult, 1, []), [1, []]);
        assert.deepEqual(R.mapAccumRight(R.concat, [], []), [[], []]);
    });

    it('is automatically curried', function() {
        var addOrConcat = R.mapAccumRight(add);
        var sum = addOrConcat(0);
        var cat = addOrConcat('');
        assert.deepEqual(sum([1, 2, 3, 4]), [10, [10, 9, 7, 4]]);
        assert.deepEqual(cat(['1', '2', '3', '4']), ['4321', ['4321', '432', '43', '4']]);
    });

    it('correctly reports the arity of curried versions', function() {
        var sum = R.mapAccumRight(add, 0);
        assert.strictEqual(sum.length, 1);
    });
});
