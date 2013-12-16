var assert = require('assert');
var Lib = require('./../ramda');

describe('flip', function() {
    var flip = Lib.flip;
    it('should return a function which inverts the first two arguments to the supplied function', function() {
        var f = function(a, b, c) {return a + ' ' + b + ' ' + c;};
        var g = flip(f);
        assert.equal(f('a', 'b', 'c'), 'a b c');
        assert.equal(g('a', 'b', 'c'), 'b a c');
    });

    it('should return a curried function', function() {
        var f = function(a, b, c) {return a + ' ' + b + ' ' + c;};
        var g = flip(f)('a');
        assert.equal(g('b', 'c'), 'b a c');
    });
});

//describe('cycle', function() {
//    var cycle = Lib.cycle;
//    it('should return a function which cycles the arguments to the supplied function so that the first becomes last', function() {
//        var f = function(a, b, c) {return a + ' ' + b + ' ' + c;};
//        var g = cycle(f);
//        var h = cycle(g);
//        assert.equal(f('a', 'b', 'c'), 'a b c');
//        assert.equal(g('a', 'b', 'c'), 'b c a');
//        assert.equal(h('a', 'b', 'c'), 'c a b');
//    });
//
//    it('should return a curried function', function() {
//        var f = function(a, b, c) {return a + ' ' + b + ' ' + c;};
//        var g = cycle(f)('a');
//        assert.equal(g('b', 'c'), 'b c a');
//    });
//});

describe('once', function() {
    var once = Lib.once;

    it('should return a function that calls the supplied function only the first time called', function() {
        var ctr = 0;
        var fn = once(function() {ctr++;});
        fn();
        assert.equal(ctr, 1);
        fn();
        assert.equal(ctr, 1);
        fn();
        assert.equal(ctr, 1);
    });

    it('should pass along arguments supplied', function() {
        var fn = once(function(a, b) {return a + b;});
        var result = fn(5, 10);
        assert.equal(result, 15);
    });

    it('should retain and return the first value calculated, even if different arguments are passed later', function() {
        var ctr = 0;
        var fn = once(function(a, b) {ctr++; return a + b;});
        var result = fn(5, 10);
        assert.equal(result, 15);
        assert.equal(ctr, 1);
        result = fn(20, 30);
        assert.equal(result, 15);
        assert.equal(ctr, 1);
    });
});

describe('memoize', function() {
    var memoize = Lib.memoize;

    it('should calculate the value for a given input only once', function() {
        var ctr = 0;
        var fib = memoize(function (n) {ctr++; return n < 2 ? n : fib(n - 2) + fib(n - 1);});
        var result = fib(10);
        assert.equal(result, 55);
        assert.equal(ctr, 11); // fib(0), fib(1), ... fib(10), no memoization would take 177 iterations.
    });

    it('should handle multiple parameters', function() {
        var f = memoize(function(a, b, c) {return a + ', ' + b + c;});
        assert.equal(f('Hello', 'World' , '!'), 'Hello, World!');
        assert.equal(f('Goodbye', 'Cruel World' , '!!!'), 'Goodbye, Cruel World!!!');
        assert.equal(f('Hello', 'how are you' , '?'), 'Hello, how are you?');
        assert.equal(f('Hello', 'World' , '!'), 'Hello, World!');
    });
});

describe('construct', function() {
    var construct = Lib.construct;
    var Rectangle = function(w, h) {this.width = w; this.height = h;};
    Rectangle.prototype.area = function() {return this.width * this.height;};

    it('should turn a constructor function into one that can be called without `new`', function() {
        var rect = construct(Rectangle);
        var r1 = rect(3, 4);
        assert(r1 instanceof Rectangle);
        assert.equal(r1.width, 3);
        assert.equal(r1.area(), 12);
    });

    it('should return a curried function', function() {
        var rect = construct(Rectangle);
        var rect3 = rect(3);
        var r1 = rect3(4);
        assert(r1 instanceof Rectangle);
        assert.equal(r1.width, 3);
        assert.equal(r1.height, 4);
        assert.equal(r1.area(), 12);
    });

});