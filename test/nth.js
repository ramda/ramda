var assert = require('assert');

var R = require('..');


describe('nth', function() {
    var list = ['foo', 'bar', 'baz', 'quux'];

    it('accepts positive offsets', function() {
        assert.strictEqual(R.nth(0, list), 'foo');
        assert.strictEqual(R.nth(1, list), 'bar');
        assert.strictEqual(R.nth(2, list), 'baz');
        assert.strictEqual(R.nth(3, list), 'quux');
        assert.strictEqual(R.nth(4, list), undefined);
    });
    it('accepts negative offsets', function() {
        assert.strictEqual(R.nth(-1, list), 'quux');
        assert.strictEqual(R.nth(-2, list), 'baz');
        assert.strictEqual(R.nth(-3, list), 'bar');
        assert.strictEqual(R.nth(-4, list), 'foo');
        assert.strictEqual(R.nth(-5, list), undefined);
    });
    it('is curried', function() {
        assert.strictEqual(R.nth(0)(list), 'foo');
    });
    it('throws if applied to null or undefined', function() {
        assert.throws(function() { R.nth(0, null); }, TypeError);
        assert.throws(function() { R.nth(0, undefined); }, TypeError);
    });
});
