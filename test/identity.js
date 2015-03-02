var assert = require('assert');

var R = require('..');


describe('identity', function() {
    it('returns its first argument', function() {
        assert.strictEqual(R.identity(undefined), undefined);
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
