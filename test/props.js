var assert = require('assert');

var R = require('..');


describe('props', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('returns empty array if no properties requested', function() {
        assert.deepEqual(R.props([], obj), []);
    });

    it('returns values for requested properties', function() {
        assert.deepEqual(R.props(['a', 'e'], obj), [1, 5]);
    });

    it('preserves order', function() {
        assert.deepEqual(R.props(['f', 'c', 'e'], obj), [6, 3, 5]);
    });

    it('returns undefined for nonexistent properties', function() {
        var ps = R.props(['a', 'nonexistent'], obj);
        assert.strictEqual(ps.length, 2);
        assert.strictEqual(ps[0], 1);
        assert.strictEqual(ps[1], void 0);
    });

    it('is automatically curried', function() {
        assert.deepEqual(R.props(['a', 'b'])(obj), [1, 2]);
    });
});
