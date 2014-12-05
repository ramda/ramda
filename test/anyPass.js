var assert = require('assert');

var R = require('..');


describe('anyPass', function() {
    var odd = function(n) {return n % 2 !== 0;};
    var gt20 = function(n) {return n > 20;};
    var lt5 = function(n) {return n < 5;};
    var plusEq = function(w, x, y, z) { return w + x  === y + z; };

    it('reports whether any predicates are satisfied by a given value', function() {
        var ok = R.anyPass([odd, gt20, lt5]);
        assert.strictEqual(ok(7), true);
        assert.strictEqual(ok(9), true);
        assert.strictEqual(ok(10), false);
        assert.strictEqual(ok(18), false);
        assert.strictEqual(ok(3), true);
        assert.strictEqual(ok(22), true);
    });

    it('does not have to be curried', function() {
        assert.strictEqual(R.anyPass([odd, lt5], 3), true);
        assert.strictEqual(R.anyPass([odd, lt5], 22), false);
    });

    it('reports its arity as the longest predicate length', function() {
        assert.strictEqual(R.anyPass([odd, lt5, plusEq]).length, 4);
    });
});
