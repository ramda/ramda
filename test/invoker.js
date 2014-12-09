var assert = require('assert');

var R = require('..');


describe('invoker', function() {
    var concat2 = R.invoker(2, 'concat');

    it('returns a function with correct arity', function() {
        assert.strictEqual(concat2.length, 3);
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
        assert.strictEqual(R.invoker(2, 'concat', 'foo').length, 2);
    });

    it('applies additional parameters to the method', function() {
        assert.deepEqual(R.invoker(2, 'concat', 2)(3, [1]), [1, 2, 3]);
    });
});
