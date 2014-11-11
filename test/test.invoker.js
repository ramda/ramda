var assert = require('assert');
var R = require('..');

describe('invokerN', function() {
    var concat2 = R.invokerN(2, 'concat');

    it('returns a function with correct arity', function() {
        assert.equal(concat2.length, 3);
    });

    it('calls the method on the object', function() {
        assert.deepEqual(concat2(3, 4, [1, 2]), [1, 2, 3, 4]);
    });

    it('curries the method call', function() {
        assert.deepEqual(concat2(3)(4)([1, 2]), [1, 2, 3, 4]);
        assert.deepEqual(concat2(3, 4)([1, 2]), [1, 2, 3, 4]);
        assert.deepEqual(concat2(3)(4, [1, 2]), [1, 2, 3, 4]);
    });

    it('returns a function with correct arity when additional parameters are given', function() {
        assert.equal(R.invokerN(2, 'concat', 'foo').length, 2);
    });

    it('applies additional parameters to the method', function() {
        assert.deepEqual(R.invokerN(2, 'concat', 2)(3, [1]), [1, 2, 3]);
    });
});
