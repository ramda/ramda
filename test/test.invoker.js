var assert = require('assert');
var R = require('..');

describe('invoker', function() {
    it('turns a method into a function', function() {
        var pop = R.invoker(Array.prototype.pop);
        assert.equal(pop([1, 2, 3]), 3);
    });

    it('returns a curried function', function() {
        var replace = R.invoker(String.prototype.replace);
        assert.equal(replace.length, 3);
        var removeWhitespace = replace(/\s/g, '');
        assert.equal(removeWhitespace('a b c'), 'abc');
    });

    it('operates on the correct argument, even in the presence of additional', function() {
        var toUpperCase = R.invoker(String.prototype.toUpperCase);
        assert.equal(toUpperCase('foo', 'bar'), 'FOO');
    });
});

describe('invokerN', function() {
    var concat3 = R.invokerN(2, Array.prototype.concat);

    it('returns a function with correct arity', function() {
        assert.equal(concat3.length, 3);
    });

    it('returns a curried function', function() {
        assert.deepEqual(concat3(3, 4, [1, 2]), [1, 2, 3, 4]);
    });
});
