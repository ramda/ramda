var assert = require('assert');

var R = require('..');


describe('evolve', function() {
    it('creates a new object by evolving the `object` according to the `transformation` functions', function() {
        var transf   = {elapsed: R.add(1), remaining: R.add(-1)};
        var object   = {name: 'Tomato', elapsed: 100, remaining: 1400};
        var expected = {name: 'Tomato', elapsed: 101, remaining: 1399};
        assert.deepEqual(R.evolve(transf, object), expected);
    });

    it('invokes function with undefined if object does not contain the key', function() {
        var transf   = {wow: String};
        var object   = {};
        var expected = {wow: 'undefined'};
        assert.deepEqual(R.evolve(transf, object), expected);
    });

    it('is not destructive', function() {
        var transf   = {elapsed: R.add(1), remaining: R.add(-1)};
        var object   = {name: 'Tomato', elapsed: 100, remaining: 1400};
        R.evolve(transf, object);
        assert.deepEqual(object, {name: 'Tomato', elapsed: 100, remaining: 1400});
    });

    it('is curried', function() {
        var tick = R.evolve({elapsed: R.add(1), remaining: R.add(-1)});
        var object   = {name: 'Tomato', elapsed: 100, remaining: 1400};
        var expected = {name: 'Tomato', elapsed: 101, remaining: 1399};
        assert.deepEqual(tick(object), expected);
    });
});
