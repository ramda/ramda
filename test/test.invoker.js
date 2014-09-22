var assert = require('assert');
var R = require('..');

describe('invoker', function() {
    it('should turn a method into a function', function() {
        var pop = R.invoker(Array.prototype.pop);
        assert.equal(pop([1, 2, 3]), 3);
    });

    it('should return a curried function', function() {
        var replace = R.invoker(String.prototype.replace);
        assert.equal(replace.length, 3);
        var removeWhitespace = replace(/\s/g, '');
        assert.equal(removeWhitespace('a b c'), 'abc');
    });
});

describe('invokerN', function() {
    var concat3 = R.invokerN(2, Array.prototype.concat);

    it('should return a function with correct arity', function() {
        assert.equal(concat3.length, 3);
    });

    it('should return a curried function', function() {
        assert.deepEqual(concat3(3, 4, [1, 2]), [1, 2, 3, 4]);
    });
});
