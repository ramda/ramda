var assert = require('assert');

var R = require('..');


describe('compose', function() {
    function a(x) {return x + 'A';}
    function b(x) {return x + 'B';}
    function c(x) {return x + 'C';}
    function d(x) {return x + 'D';}

    it('executes its passed in functions in order from right to left', function() {
        assert.strictEqual(R.compose(a, b, c, d)(''), 'DCBA');
    });

    it('first function is passed multiple args', function() {
        function e(a, b, c) {
            return c + 'E';
        }
        assert.strictEqual(R.compose(a, b, c, e)(1, 2, 3), '3ECBA');
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
        assert.strictEqual(context.a(5), 40);
    });

    it('returns a function with arity == rightmost argument', function() {
        function a2(x, y) { void y; return 'A2'; }
        function a3(x, y) { void y; return 'A2'; }
        function a4(x, y) { void y; return 'A2'; }

        var f1 = R.compose(b, a);
        assert.strictEqual(f1.length, a.length);
        var f2 = R.compose(b, a2);
        assert.strictEqual(f2.length, a2.length);
        var f3 = R.compose(b, a3);
        assert.strictEqual(f3.length, a3.length);
        var f4 = R.compose(b, a4);
        assert.strictEqual(f4.length, a4.length);
    });

    it('throws if given no arguments', function() {
        assert.throws(function() { R.compose(); });
    });

    it('can be applied to one argument', function() {
        var f = function(a, b, c) { return [a, b, c]; };
        var g = R.compose(f);
        assert.strictEqual(g.length, 3);
        assert.deepEqual(g(1, 2, 3), [1, 2, 3]);
    });

});
