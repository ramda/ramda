var assert = require('assert');

var R = require('..');


describe('minBy', function() {
    it('calculates the smallest value of a list using the supplied comparator', function() {
        assert.deepEqual(R.minBy(R.prop('x'), [{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: -2, y: 0});
    });

    it('returns null for the empty list', function() {
        assert.strictEqual(typeof(R.minBy(R.prop('x'), [])), 'undefined');
    });

    it('is properly curried', function() {
        var lowestX = R.minBy(R.prop('x'));
        assert.deepEqual(lowestX([{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: -2, y: 0});
    });
});
