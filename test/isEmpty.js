var assert = require('assert');

var R = require('..');


describe('isEmpty', function() {
    it('returns false for null', function() {
        assert.strictEqual(R.isEmpty(null), false);
    });

    it('returns false for undefined', function() {
        assert.strictEqual(R.isEmpty(undefined), false);
    });

    it('returns true for empty string', function() {
        assert.strictEqual(R.isEmpty(''), true);
    });

    it('returns true for empty array', function() {
        assert.strictEqual(R.isEmpty([]), true);
    });

    it('returns true for empty arguments object', function() {
        assert.strictEqual(R.isEmpty((function() { return arguments; }())), true);
    });

    it('returns true for object with own length property whose value is 0', function() {
        assert.strictEqual(R.isEmpty({length: 0, x: 1, y: 2}), true);
    });

    it('returns true for object with inherited length property whose value is 0', function() {
        function Empty() {}
        Empty.prototype.length = 0;
        assert.strictEqual(R.isEmpty(new Empty()), true);
    });

    it('returns false for every other value', function() {
        assert.strictEqual(R.isEmpty(0), false);
        assert.strictEqual(R.isEmpty(NaN), false);
        assert.strictEqual(R.isEmpty(['']), false);
        assert.strictEqual(R.isEmpty({}), false);

        function Nonempty() {}
        Nonempty.prototype.length = 1;
        assert.strictEqual(R.isEmpty(new Nonempty()), false);
    });
});
