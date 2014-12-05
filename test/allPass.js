var assert = require('assert');

var R = require('..');


describe('allPass', function() {
    var odd = function(n) {return n % 2 !== 0;};
    var lt20 = function(n) {return n < 20;};
    var gt5 = function(n) {return n > 5;};
    var plusEq = function(w, x, y, z) { return w + x  === y + z; };

    it('reports whether all predicates are satisfied by a given value', function() {
        var ok = R.allPass([odd, lt20, gt5]);
        assert.strictEqual(ok(7), true);
        assert.strictEqual(ok(9), true);
        assert.strictEqual(ok(10), false);
        assert.strictEqual(ok(3), false);
        assert.strictEqual(ok(21), false);
    });

    it('does not have to be curried', function() {
        assert.strictEqual(R.allPass([odd, gt5], 3), false);
        assert.strictEqual(R.allPass([odd, gt5], 7), true);
    });

    it('reports its arity as the longest predicate length', function() {
        assert.strictEqual(R.allPass([odd, gt5, plusEq]).length, 4);
    });
});
