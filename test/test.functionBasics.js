var assert = require('assert');
var R = require('..');

describe('flip', function() {
    it('should return a function which inverts the first two arguments to the supplied function', function() {
        var f = function(a, b, c) {return a + ' ' + b + ' ' + c;};
        var g = R.flip(f);
        assert.equal(f('a', 'b', 'c'), 'a b c');
        assert.equal(g('a', 'b', 'c'), 'b a c');
    });

    it('should return a curried function', function() {
        var f = function(a, b, c) {return a + ' ' + b + ' ' + c;};
        var g = R.flip(f)('a');
        assert.equal(g('b', 'c'), 'b a c');
    });

    it('produces a function that throws if given no arguments', function() {
      var f = function(x, y) { return x + ' then ' + y; };
      var g = R.flip(f);
      assert.throws(g, TypeError);
    });
});

describe('once', function() {
    it('should return a function that calls the supplied function only the first time called', function() {
        var ctr = 0;
        var fn = R.once(function() {ctr++;});
        fn();
        assert.equal(ctr, 1);
        fn();
        assert.equal(ctr, 1);
        fn();
        assert.equal(ctr, 1);
    });

    it('should pass along arguments supplied', function() {
        var fn = R.once(function(a, b) {return a + b;});
        var result = fn(5, 10);
        assert.equal(result, 15);
    });

    it('should retain and return the first value calculated, even if different arguments are passed later', function() {
        var ctr = 0;
        var fn = R.once(function(a, b) {ctr++; return a + b;});
        var result = fn(5, 10);
        assert.equal(result, 15);
        assert.equal(ctr, 1);
        result = fn(20, 30);
        assert.equal(result, 15);
        assert.equal(ctr, 1);
    });
});

describe('memoize', function() {
    it('should calculate the value for a given input only once', function() {
        var ctr = 0;
        var fib = R.memoize(function (n) {ctr++; return n < 2 ? n : fib(n - 2) + fib(n - 1);});
        var result = fib(10);
        assert.equal(result, 55);
        assert.equal(ctr, 11); // fib(0), fib(1), ... fib(10), no memoization would take 177 iterations.
    });

    it('should handle multiple parameters', function() {
        var f = R.memoize(function(a, b, c) {return a + ', ' + b + c;});
        assert.equal(f('Hello', 'World' , '!'), 'Hello, World!');
        assert.equal(f('Goodbye', 'Cruel World' , '!!!'), 'Goodbye, Cruel World!!!');
        assert.equal(f('Hello', 'how are you' , '?'), 'Hello, how are you?');
        assert.equal(f('Hello', 'World' , '!'), 'Hello, World!');
    });
});

describe('construct', function() {
    var Rectangle = function(w, h) {this.width = w; this.height = h;};
    Rectangle.prototype.area = function() {return this.width * this.height;};

    it('should turn a constructor function into one that can be called without `new`', function() {
        var rect = R.construct(Rectangle);
        var r1 = rect(3, 4);
        assert(r1 instanceof Rectangle);
        assert.equal(r1.width, 3);
        assert.equal(r1.area(), 12);

        var regex = R.construct(RegExp);
        var word = regex('word', 'gi');
        assert(word instanceof RegExp);
        assert.equal(word.source, 'word');
        assert.equal(word.global, true);
    });

    it('should return a curried function', function() {
        var rect = R.construct(Rectangle);
        var rect3 = rect(3);
        var r1 = rect3(4);
        assert(r1 instanceof Rectangle);
        assert.equal(r1.width, 3);
        assert.equal(r1.height, 4);
        assert.equal(r1.area(), 12);

        var regex = R.construct(RegExp);
        var word = regex('word');
        var complete = word('gi');
        assert(complete instanceof RegExp);
        assert.equal(complete.source, 'word');
        assert.equal(complete.global, true);
    });
});

describe('constructN', function() {
    var Circle = function(r) {
        this.r = r;
        this.colors = Array.prototype.slice.call(arguments, 1);
    };
    Circle.prototype.area = function() {return Math.PI * Math.pow(this.r, 2);};

    it('should turn a constructor function into a function with n arguments', function() {
        var circle = R.constructN(2, Circle);
        var c1 = circle(1, 'red');
        assert(c1 instanceof Circle);
        assert.equal(c1.r, 1);
        assert.equal(c1.area(), Math.PI);
        assert.deepEqual(c1.colors, ['red']);

        var regex = R.constructN(1, RegExp);
        var pattern = regex('[a-z]');
        assert(pattern instanceof RegExp);
        assert.equal(pattern.source, '[a-z]');
    });
});

describe('unary', function() {
    it('should turn multiple-argument function into unary one', function() {
        R.unary(function(x, y, z) {
            assert.equal(arguments.length, 1);
            assert.equal(typeof y, 'undefined');
            assert.equal(typeof z, 'undefined');
        })(10, 20, 30);
    });

    it('initial argument is passed through normally', function() {
        R.unary(function(x, y, z) {
            assert.equal(x, 10);
        })(10, 20, 30);
    });
});

describe('binary', function() {
    it('should turn multiple-argument function into binary one', function() {
        R.binary(function(x, y, z) {
            assert.equal(arguments.length, 2);
            assert.equal(typeof z, 'undefined');
        })(10, 20, 30);
    });

    it('initial arguments are passed through normally', function() {
        R.binary(function(x, y, z) {
            assert.equal(x, 10);
            assert.equal(y, 20);
        })(10, 20, 30);
    });
});

describe('ap', function() {
    function inc(x) { return x + 1; }
    function mult2(x) { return x * 2; }
    function plus3(x) { return x + 3; }

    it('applies a list of functions to a list of values', function() {
      assert.deepEqual(R.ap([mult2, plus3], [1, 2, 3]), [2, 4, 6, 4, 5, 6]);
    });

    it('dispatches to the passed object\'s ap method when values is a non-Array object', function() {
      var obj = {ap: function(fs) { return {x: fs[0](1)}; }};
      assert.deepEqual(R.ap([R.add(1)], obj), obj.ap([R.add(1)]));
    });

    it('is curried', function() {
      var val = R.ap([mult2, plus3]);
      assert.equal(typeof val, 'function');
      assert.deepEqual(val([1, 2, 3]), [2, 4, 6, 4, 5, 6]);
    });
});
