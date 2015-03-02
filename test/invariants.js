var assert = require('assert');

var R = require('..');


describe('invariants', function() {

    it('-- applying function f with length n (where n > 0) to no arguments gives function with length n', function() {
        for (var prop in R) {
            if (typeof R[prop] === 'function' && R[prop].length > 0) {
                var result = R[prop]();
                assert.strictEqual(typeof result, 'function');
                assert.strictEqual(result.length, R[prop].length);
            }
        }
    });

    it('-- applying function f with length n (where n > 0) to R.__ gives function with length n', function() {
        for (var prop in R) {
            if (typeof R[prop] === 'function' && R[prop].length > 0) {
                var result = R[prop](R.__);
                assert.strictEqual(typeof result, 'function');
                assert.strictEqual(result.length, R[prop].length);
            }
        }
    });

    it('-- applying function f with length n (where n > 1) to any value other than R.__ gives function with length n - 1', function() {
        var testPartialApplication = function(fn, name) {
            if (fn.length > 1) {
                var result = fn(null);
                assert.strictEqual(typeof result, 'function');
                assert.strictEqual(result.length, fn.length - 1);
                testPartialApplication(result, name + "'");
            }
        };

        for (var prop in R) {
            if (typeof R[prop] === 'function') {
                testPartialApplication(R[prop], prop);
            }
        }
    });

});
