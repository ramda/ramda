var assert = require('assert');
var R = require('..');

describe('identity', function() {
    it('returns its first argument', function() {
        assert.strictEqual(R.identity(), undefined);
        assert.strictEqual(R.identity('foo'), 'foo');
        assert.strictEqual(R.identity('foo', 'bar'), 'foo');
    });

    it('has length 1', function() {
        assert.strictEqual(R.identity.length, 1);
    });

    it('is aliased by `I`', function() {
        assert.strictEqual(R.I, R.identity);
    });
});

describe('argN', function() {
    it('returns a function which returns its nth argument', function() {
        assert.strictEqual(R.argN(0)('foo', 'bar'), 'foo');
        assert.strictEqual(R.argN(1)('foo', 'bar'), 'bar');
        assert.strictEqual(R.argN(2)('foo', 'bar'), undefined);
    });

    it('returns a function with length 0', function() {
        assert.strictEqual(R.argN(2).length, 0);
    });
});
