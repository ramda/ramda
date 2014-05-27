var assert = require("assert");
var Lib = require("./../ramda");

describe('generator', function() {
    var generator = Lib.generator;
    var g;
    function I(x) { return x; }
    function inc(n) { return n + 1; }
    
    g = generator(0, I, inc);

    it("has a '0' property", function() {
        assert.equal(g[0], 0);
    });
    it("has a 'tail' method", function() {
        assert.equal(typeof g.tail, "function");
    });
    it("has a 'length' property equal to Infinity", function() {
        assert.equal(g.length, Infinity);
    });
});

describe('take for a generator', function() {
    var generator = Lib.generator, take = Lib.take;
    var g;
    function I(x) { return x; }
    function inc(n) { return n + 1; }

    g = generator(0, I, inc);
    it("takes the first n elements of an infinite sequence", function() {
        assert.deepEqual(take(5, g), [0, 1, 2, 3, 4]);
    });
});

describe('takeWhile for a generator', function() {
    var generator = Lib.generator, takeWhile = Lib.takeWhile, identity = Lib.identity;
    var inc = function (n) {return n + 1;};
    var pred = function(n) {return n < 5;};

    var g = generator(0, identity, inc);
    it("takes the elements of an infinite sequence while the supplied predicate is true", function() {
        assert.deepEqual(takeWhile(pred, g), [0, 1, 2, 3, 4]);
    });
});

describe('skip for a generator', function() {
    var generator = Lib.generator, take = Lib.take, skip = Lib.skip;
    var g;
    function I(x) { return x; }
    function inc(n) { return n + 1; }
    g = generator(0, I, inc);

    it("skips the first n elements of an infinite sequence", function() {
        assert.deepEqual(take(5, skip(10, g)), [10, 11, 12, 13, 14]);
    });
});

describe('map for a generator', function() {
    var generator = Lib.generator, take = Lib.take, map = Lib.map;
    var g;
    function I(x) { return x; }
    function inc(n) { return n + 1; }
    function square(n) {return n * n;}

    g = generator(0, I, inc);

    it("maps a function over the elements of even an infinite sequence", function() {
        assert.deepEqual(take(5, map(square, g)), [0, 1, 4, 9, 16]);
    });
});

describe('filter for a generator', function() {
    var generator = Lib.generator, take = Lib.take, filter = Lib.filter;
    var even = function(n) {return n % 2 === 0;};

    var fibonacci = generator(
        [0, 1],
        function(pair) {return pair[0];},
        function(pair) {return [pair[1], pair[0] + pair[1]];}
    );

    it("filters the elements of even an infinite sequence according to a function", function() {
        assert.deepEqual(take(5, filter(even, fibonacci)), [0, 2, 8, 34, 144]);
    });
});

describe('repeat', function() {
    var take = Lib.take, repeat = Lib.repeat;

    it("returns a lazy list of identical values", function() {
        assert.deepEqual(take(5, repeat(0)), [0, 0, 0, 0, 0]);
    });

    it("can accept any value, including `null`", function() {
        assert.deepEqual(take(3, repeat(null)), [null, null, null]);
    });

    it("can accept any value, including `undefined`", function() {
        assert.deepEqual(take(4, repeat(undefined)), [undefined, undefined, undefined, undefined]);
    });

    it("can accept any value, including an arbitrary object", function() {
        assert.deepEqual(take(2, repeat({a: 10, b: {c: 20}})), [{a: 10, b: {c: 20}}, {a: 10, b: {c: 20}}]);
    });
});

describe('repeat.nTimes', function() {
    var repeat = Lib.repeat;

    it("returns a lazy list of identical values", function() {
        assert.deepEqual(repeat.nTimes(0, 5), [0, 0, 0, 0, 0]);
    });

    it("can accept any value, including `null`", function() {
        assert.deepEqual(repeat.nTimes(null, 3), [null, null, null]);
    });

    it("is automatically curried", function() {
        var nTrues = repeat.nTimes(true);
        assert.deepEqual(nTrues(4), [true, true, true, true]);
    });
});

