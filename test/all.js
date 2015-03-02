var assert = require('assert');

var R = require('..');


describe('all', function() {
    var even = function(n) {return n % 2 === 0;};
    var T = function() {return true;};

    it('returns true if all elements satisfy the predicate', function() {
        assert.strictEqual(R.all(even, [2, 4, 6, 8, 10, 12]), true);
    });

    it('returns false if any element fails to satisfy the predicate', function() {
        assert.strictEqual(R.all(even, [2, 4, 6, 8, 9, 10]), false);
    });

    it('returns true for an empty list', function() {
        assert.strictEqual(R.all(T, []), true);
    });

    it('short-circuits on first false value', function() {
        var count = 0;
        var test = function(n) {count++; return even(n);};
        var result = R.all(test, [2, 4, 6, 7, 8, 10]);
        assert(!result);
        assert.strictEqual(count, 4);
    });

    it('works with more complex objects', function() {
        var xs = [{x: 'abc'}, {x: 'ade'}, {x: 'fghiajk'}];
        function len3(o) { return o.x.length === 3; }
        function hasA(o) { return o.x.indexOf('a') > -1; }
        assert.strictEqual(R.all(len3, xs), false);
        assert.strictEqual(R.all(hasA, xs), true);
    });

    it('is automatically curried', function() {
        var count = 0;
        var test = function(n) {count++; return even(n);};
        assert(R.all(test)([2, 4, 6, 7, 8, 10]) === false);
    });
});
