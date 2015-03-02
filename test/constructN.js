var assert = require('assert');

var R = require('..');


describe('constructN', function() {
    var Circle = function(r) {
        this.r = r;
        this.colors = Array.prototype.slice.call(arguments, 1);
    };
    Circle.prototype.area = function() {return Math.PI * Math.pow(this.r, 2);};

    it('turns a constructor function into a function with n arguments', function() {
        var circle = R.constructN(2, Circle);
        var c1 = circle(1, 'red');
        assert(c1 instanceof Circle);
        assert.strictEqual(c1.r, 1);
        assert.strictEqual(c1.area(), Math.PI);
        assert.deepEqual(c1.colors, ['red']);

        var regex = R.constructN(1, RegExp);
        var pattern = regex('[a-z]');
        assert(pattern instanceof RegExp);
        assert.strictEqual(pattern.source, '[a-z]');
    });

    it('can be used to create Date object', function() {
        var date = R.constructN(3, Date)(1984, 3, 26);
        assert(date instanceof Date);
        assert.strictEqual(date.getFullYear(), 1984);
    });

    it('supports constructors with no arguments', function() {
        function Foo() {}
        var foo = R.constructN(0, Foo)();
        assert(foo instanceof Foo);
    });

    it('does not support constructor with greater than ten arguments', function() {
        assert.throws(function() {
            function Foo($0, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) {
                this.eleventh = $10;
            }
            R.constructN(11, Foo);
        }, function(err) {
            return (err instanceof Error &&
                    err.message === 'Constructor with greater than ten arguments');
        });
    });

    it('is curried', function() {
        function G(a, b, c) { this.a = a; this.b = b; this.c = c; }
        var construct2 = R.constructN(2);
        assert(typeof construct2 === 'function');
        var g2 = construct2(G);
        assert(typeof g2 === 'function');
        assert(g2('a', 'b') instanceof G);
        assert(g2('a')('b') instanceof G);
    });
});
