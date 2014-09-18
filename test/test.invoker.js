var assert = require('assert');
var R = require('..');

describe('invoker', function() {
    it('should turn a method into a function', function() {
        var pop = R.invoker('pop', Array.prototype);
        assert.equal(pop([1, 2, 3]), 3);
    });

    it('should return a curried function', function() {
        var replace = R.invoker('replace', String.prototype);
        assert.equal(replace.length, 3);
        var removeWhitespace = replace(/\s/g, '');
        assert.equal(removeWhitespace('a b c'), 'abc');
    });

    it('should return undefined when the method does not exists', function() {
        assert.equal(R.invoker('slice', {}), undefined);
    });

    it('returns a function returning undefined when the method does not exists on the target', function() {
        var firstChar = R.invoker('slice', Array.prototype)(0, 1);
        assert.equal(firstChar({}), undefined);
    });
});

describe('invokerN', function() {
    var concat3 = R.invokerN(2, 'concat', Array.prototype);

    it('should return a function with correct arity', function() {
        assert.equal(concat3.length, 3);
    });

    it('should return a curried function', function() {
        assert.deepEqual(concat3(3, 4, [1, 2]), [1, 2, 3, 4]);
    });
});
