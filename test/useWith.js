var assert = require('assert');

var R = require('..');


describe('useWith', function() {
    function max() { return Math.max.apply(Math, arguments); }
    function add1(x) { return x + 1; }
    function mult2(x) { return x * 2; }
    function div3(x) { return x / 3; }
    var f = R.useWith(max, add1, mult2, div3);

    it('takes a arbitrary number of function arguments and returns a function', function() {
        assert.strictEqual(typeof R.useWith(max), 'function');
        assert.strictEqual(typeof R.useWith(max, add1), 'function');
        assert.strictEqual(typeof R.useWith(max, add1, mult2, div3), 'function');
    });

    it('passes the arguments received to their respective functions', function() {
        assert.strictEqual(f(7, 8, 9), 16); // max(7 + 1, 8 * 2, 9 / 3);
    });

    it('passes additional arguments to the main function', function() {
        assert.strictEqual(f(7, 8, 9, 10), 16);
        assert.strictEqual(f(7, 8, 9, 20), 20);
    });

    it('nonetheless has the correct arity', function() {
        assert.strictEqual(f.length, 3);
    });

});
