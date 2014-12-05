var assert = require('assert');

var R = require('..');


describe('foldr', function() {
    var avg = function(a, b) {return (a + b) / 2;};

    it('folds lists in the right order', function() {
        assert.strictEqual(R.foldr(function(a, b) {return a + b;}, '', ['a', 'b', 'c', 'd']), 'dcba');
    });

    it('folds simple functions over arrays with the supplied accumulator', function() {
        assert.strictEqual(R.foldr(avg, 54, [12, 4, 10, 6]), 12);
    });

    it('returns the accumulator for an empty array', function() {
        assert.strictEqual(R.foldr(avg, 0, []), 0);
    });

    it('is automatically curried', function() {
        var something = R.foldr(avg, 54);
        var rcat = R.foldr(R.add, '');
        assert.strictEqual(something([12, 4, 10, 6]), 12);
        assert.strictEqual(rcat(['1', '2', '3', '4']), '4321');
    });

    it('correctly reports the arity of curried versions', function() {
        var something = R.foldr(avg, 0);
        assert.strictEqual(something.length, 1);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.foldr, TypeError);
        assert.throws(R.foldr(R.add), TypeError);
    });
});
