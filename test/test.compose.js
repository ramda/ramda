var assert = require('assert');
var R = require('..');

describe('compose', function() {
    function a(x) {return x + 'A';}
    function b(x) {return x + 'B';}
    function c(x) {return x + 'C';}
    function d(x) {return x + 'D';}

    it('executes its passed in functions in order from right to left', function() {
        assert.equal(R.compose(a, b, c, d)(''), 'DCBA');
    });

    it('first function is passed multiple args', function() {
        function e(a, b, c) {
            return c + 'E';
        }
        assert.equal(R.compose(a, b, c, e)(1, 2, 3), '3ECBA');
    });

    it('passes context to functions', function() {
        function x(val) {
            return this.x * val;
        }
        function y(val) {
            return this.y * val;
        }
        function z(val) {
            return this.z * val;
        }
        var context = {
            a: R.compose(x, y, z),
            x: 4,
            y: 2,
            z: 1
        };
        assert.equal(context.a(5), 40);
    });

     it('returns a function with arity == rightmost argument', function() {
       function a2(x, y) { return 'A2'; }
       function a3(x, y) { return 'A2'; }
       function a4(x, y) { return 'A2'; }

       var f1 = R.compose(b, a);
       assert.equal(f1.length, a.length);
       var f2 = R.compose(b, a2);
       assert.equal(f2.length, a2.length);
       var f3 = R.compose(b, a3);
       assert.equal(f3.length, a3.length);
       var f4 = R.compose(b, a4);
       assert.equal(f4.length, a4.length);
    });

    it('throws if given no arguments', function() {
        assert.throws(function() { R.compose(); });
    });

    it('returns argument if given exactly one argument', function() {
        function f() {}
        assert.strictEqual(R.compose(f), f);
    });

});

describe('pipe', function() {
    function a(x) {return x + 'A';}
    function b(x) {return x + 'B';}
    function c(x) {return x + 'C';}
    function d(x) {return x + 'D';}

    it('executes its passed in functions in order from left to right', function() {
        assert.equal(R.pipe(a, b, c, d)(''), 'ABCD');
    });

    it('first function is passed multiple args', function() {
        function e(a, b, c) {
            return c + 'E';
        }
        assert.equal(R.pipe(e, a, b, c)(1, 2, 3), '3EABC');
    });

    it('passes context to functions', function() {
        function x(val) {
            return this.x * val;
        }
        function y(val) {
            return this.y * val;
        }
        function z(val) {
            return this.z * val;
        }
        var context = {
            a: R.pipe(x, y, z),
            x: 4,
            y: 2,
            z: 1
        };
        assert.equal(context.a(5), 40);
    });

    it('throws if given no arguments', function() {
        assert.throws(function() { R.pipe(); });
    });

    it('returns argument if given exactly one argument', function() {
        function f() {}
        assert.strictEqual(R.pipe(f), f);
    });
});

describe('useWith', function() {
    function max() { return Math.max.apply(Math, arguments); }
    function add1(x) { return x + 1; }
    function mult2(x) { return x * 2; }
    function div3(x) { return x / 3; }
    var f = R.useWith(max, add1, mult2, div3);

    it('takes a arbitrary number of function arguments and returns a function', function() {
        assert.equal(typeof R.useWith(max), 'function');
        assert.equal(typeof R.useWith(max, add1), 'function');
        assert.equal(typeof R.useWith(max, add1, mult2, div3), 'function');
    });

    it('passes the arguments received to their respective functions', function() {
        assert.equal(f(7, 8, 9), 16); // max(7 + 1, 8 * 2, 9 / 3);
    });

    it('passes additional arguments to the main function', function() {
        assert.equal(f(7, 8, 9, 10), 16);
        assert.equal(f(7, 8, 9, 20), 20);
    });

    it('nonetheless has the correct arity', function() {
        assert.equal(f.length, 3);
    });

});

describe('fork', function() {
    var mult = function(a, b) {return a * b;};

    it('passes the results of applying the arguments individually to two separate functions into a single one', function() {
        assert.equal(R.fork(mult, R.add(1), R.add(3))(2), 15); // mult(add1(2), add3(2)) = mult(3, 5) = 3 * 15;
    });
});
