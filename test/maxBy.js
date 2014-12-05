var assert = require('assert');

var R = require('..');


describe('maxBy', function() {
    it('calculates the largest value of a list using the supplied comparator', function() {
        assert.deepEqual(R.maxBy(R.prop('x'), [{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: 5, y: 10});
    });

    it('returns undefined for the empty list', function() {
        assert.strictEqual(R.maxBy(R.prop('x'), []), undefined);
    });

    it('is properly curried', function() {
        var highestX = R.maxBy(R.prop('x'));
        assert.deepEqual(highestX([{x: 3, y: 1}, {x: 5, y: 10}, {x: -2, y: 0}]), {x: 5, y: 10});
    });
});
