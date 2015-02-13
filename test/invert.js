var assert = require('assert');
var R = require('..');

describe('invert', function() {

    it('takes a list or object and returns an object of lists', function() {
        assert.equal(typeof R.invert([]), 'object');
        assert.equal(typeof R.invert({}), 'object');

        var inverted = R.invert([0]);
        var keys = R.keys(inverted);
        assert(R.is(Array, inverted[keys.pop()]));
    });

    it('returns an empty object when applied to a primitive', function() {
        assert.deepEqual(R.invert(42), {});
        assert.deepEqual(R.invert('abc'), {});
    });

    it('returns an empty object when applied to null/undefined', function() {
        assert.deepEqual(R.invert(null), {});
        assert.deepEqual(R.invert(undefined), {});
    });

    it('returns the input\'s values as keys, and keys as values of an array', function() {
        assert.deepEqual(R.invert(['a', 'b', 'c']),       {a:['0'], b:['1'], c:['2']});
        assert.deepEqual(R.invert({x:'a', y:'b', z:'c'}), {a:['x'], b:['y'], c:['z']});
    });

    it('puts keys that have the same value into the appropriate an array', function() {
        assert.deepEqual(R.invert(['a', 'b', 'a']), {a:['0', '2'], b:['1']});

        var inverted = R.invert({x:'a', y:'b', z:'a', _id:'a'});
        assert(R.indexOf('x', inverted.a)   > -1);
        assert(R.indexOf('z', inverted.a)   > -1);
        assert(R.indexOf('_id', inverted.a) > -1);
        assert.deepEqual(inverted.b, ['y']);
    });

    // this one is more of a sanity check
    it('is not destructive', function() {
        var input = {x:'a', y:'b', z:'a', _id:'a'};
        R.invert(input);
        assert.deepEqual(input, {x:'a', y:'b', z:'a', _id:'a'});
    });

    it('ignores inherited properties', function() {
        assert.deepEqual(R.invert({x: 'hasOwnProperty'}), {
            /* jshint -W001 */
            hasOwnProperty: ['x']
            /* jshint +W001 */
        });
    });
});
