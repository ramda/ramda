var assert = require('assert');

var R = require('..');


describe('uniqWith', function() {
    var objs = [
        {x: R.T, i: 0}, {x: R.F, i: 1}, {x: R.T, i: 2}, {x: R.T, i: 3},
        {x: R.F, i: 4}, {x: R.F, i: 5}, {x: R.T, i: 6}, {x: R.F, i: 7}
    ];
    var objs2 = [
        {x: R.T, i: 0}, {x: R.F, i: 1}, {x: R.T, i: 2}, {x: R.T, i: 3},
        {x: R.F, i: 0}, {x: R.T, i: 1}, {x: R.F, i: 2}, {x: R.F, i: 3}
    ];
    function eqI(x, accX) { return x.i === accX.i; }

    it('returns a set from any array (i.e. purges duplicate elements) based on predicate', function() {
        assert.deepEqual(R.uniqWith(eqI, objs), objs);
        assert.deepEqual(R.uniqWith(eqI, objs2), [{x: R.T, i: 0}, {x: R.F, i: 1}, {x: R.T, i: 2}, {x: R.T, i: 3}]);
    });

    it('keeps elements from the left', function() {
        assert.deepEqual(R.uniqWith(eqI, [{i: 1}, {i: 2}, {i: 3}, {i: 4}, {i: 1}]), [{i: 1}, {i: 2}, {i: 3}, {i: 4}]);
    });

    it('returns an empty array for an empty array', function() {
        assert.deepEqual(R.uniqWith(eqI, []), []);
    });

    it('is curried', function() {
        assert.strictEqual(typeof R.uniqWith(eqI), 'function');
        assert.deepEqual(R.uniqWith(eqI)(objs), objs);
        assert.deepEqual(R.uniqWith(eqI)(objs2), [{x: R.T, i: 0}, {x: R.F, i: 1}, {x: R.T, i: 2}, {x: R.T, i: 3}]);
    });
});
