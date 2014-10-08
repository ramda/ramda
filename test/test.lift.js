/* jshint -W053 */

var assert = require('assert');
var R = require('..');

var addN = function() {
    return Array.prototype.reduce.call(arguments, function(a, b) { return a + b; }, 0);
};
var add3 = R.curry(function add3(a, b, c) {
    return a + b + c;
});
var add4 = R.curry(function add4(a, b, c, d) {
    return a + b + c + d;
});
var add5 = R.curry(function add5(a, b, c, d, e) {
    return a + b + c + d + e;
});
var madd3 = R.lift(add3);
var madd4 = R.lift(add4);
var madd5 = R.lift(add5);

describe('lift', function() {

    it('returns a function if called with just a function', function() {
        assert(typeof R.lift(R.add) === 'function');
    });

    it('produces a cross-product of array values', function() {
        assert.deepEqual(madd3([1, 2, 3], [1, 2], [1, 2, 3]), [3, 4, 5, 4, 5, 6, 4, 5, 6, 5, 6, 7, 5, 6, 7, 6, 7, 8]);
        assert.deepEqual(madd3([1], [2], [3]), [6]);
        assert.deepEqual(madd3([1, 2], [3, 4], [5, 6]), [9, 10, 10, 11, 10, 11, 11, 12]);
    });

    it('can lift functions of any arity', function() {
        assert.deepEqual(madd3([1, 10], [2], [3]), [6, 15]);
        assert.deepEqual(madd4([1, 10], [2], [3], [40]), [46, 55]);
        assert.deepEqual(madd5([1, 10], [2], [3], [40], [500, 1000]), [546, 1046, 555, 1055]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.lift);
    });
});

describe('liftN', function() {

    var addN3 = R.liftN(3, addN);
    var addN4 = R.liftN(4, addN);
    var addN5 = R.liftN(5, addN);

    it('returns a function', function() {
        assert(typeof R.liftN(3, add3) === 'function');
    });

    it('limits a variadic function to the specified arity', function() {
        assert.deepEqual(addN3([1, 10], [2], [3]), [6, 15]);
    });

    it('produces a cross-product of array values', function() {
        assert.deepEqual(addN3([1, 2, 3], [1, 2], [1, 2, 3]), [3, 4, 5, 4, 5, 6, 4, 5, 6, 5, 6, 7, 5, 6, 7, 6, 7, 8]);
        assert.deepEqual(addN3([1], [2], [3]), [6]);
        assert.deepEqual(addN3([1, 2], [3, 4], [5, 6]), [9, 10, 10, 11, 10, 11, 11, 12]);
    });

    it('can lift functions of any arity', function() {
        assert.deepEqual(addN3([1, 10], [2], [3]), [6, 15]);
        assert.deepEqual(addN4([1, 10], [2], [3], [40]), [46, 55]);
        assert.deepEqual(addN5([1, 10], [2], [3], [40], [500, 1000]), [546, 1046, 555, 1055]);
    });

    it('is curried', function() {
        var f4 = R.liftN(4);
        assert(typeof f4 === 'function');
        assert.deepEqual(f4(addN)([1], [2], [3], [4, 5]), [10, 11]);
    });

    it('throws on zero arguments', function() {
        assert.throws(R.lift);
    });
});
