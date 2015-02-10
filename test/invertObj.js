var assert = require('assert');
var R = require('..');

describe('invertObj', function() {

    it('takes a list or object and returns an object', function() {
        assert.equal(typeof R.invertObj([]), 'object');
        assert.equal(typeof R.invertObj({}), 'object');
    });

    it('returns an empty object when applied to a primitive', function() {
        assert.deepEqual(R.invertObj(42), {});
        assert.deepEqual(R.invertObj('abc'), {});
    });

    it('returns an empty object when applied to null/undefined', function() {
        assert.deepEqual(R.invertObj(null), {});
        assert.deepEqual(R.invertObj(undefined), {});
    });

    it('returns the input\'s values as keys, and keys as values', function() {
        assert.deepEqual(R.invertObj(['a', 'b', 'c']),       {a:'0', b:'1', c:'2'});
        assert.deepEqual(R.invertObj({x:'a', y:'b', z:'c'}), {a:'x', b:'y', c:'z'});
    });

    it('prefers the last key found when handling keys with the same value', function() {
        assert.deepEqual(R.invertObj(['a', 'b', 'a']), {a:'2', b:'1'});
        assert.deepEqual(R.invertObj({x:'a', y:'b', z:'a', _id:'a'}), {a: '_id', b: 'y'});
    });

    // this one is more of a sanity check
    it('is not destructive', function() {
        var input = {x:'a', y:'b', z:'a', _id:'a'};
        R.invertObj(input);
        assert.deepEqual(input, {x:'a', y:'b', z:'a', _id:'a'});
    });
});
