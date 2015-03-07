var assert = require('assert');

var R = require('..');


describe('pathEq', function() {

    var obj = {
        a: 1,
        b: {
            ba: '2'
        }
    };

    it('returns true if the path matches the value', function() {
        assert.strictEqual(R.pathEq(['a'], 1, obj), true);
        assert.strictEqual(R.pathEq(['b', 'ba'], '2', obj), true);
    });

    it('returns false for non matches', function() {
        assert.strictEqual(R.pathEq(['a'], '1', obj), false);
        assert.strictEqual(R.pathEq(['b', 'ba'], 2, obj), false);
    });

    it('returns false for non existing values', function() {
        assert.strictEqual(R.pathEq(['c'], 'foo', obj), false);
        assert.strictEqual(R.pathEq(['c', 'd'], 'foo', obj), false);
    });

    it('accepts empty path', function() {
        assert.strictEqual(R.pathEq([], 42, {a: 1, b: 2}), false);
        assert.strictEqual(R.pathEq([], undefined, {a: 1, b: 2}), true);
    });

});
