var assert = require('assert');
var R = require('../../..');
var lazylist = require('../lazylist');

describe('lazylist', function() {
    function I(x) { return x; }
    function inc(n) { return n + 1; }

    var lz = lazylist(0, I, inc);

    it('has a "0" property', function() {
        assert.equal(lz[0], 0);
    });
    it('has a "tail" method', function() {
        assert.equal(typeof lz.tail, 'function');
    });
    it('has a "length" property equal to Infinity', function() {
        assert.equal(lz.length, Infinity);
    });
});

describe('take for a lazylist', function() {
    var lz;
    function I(x) { return x; }
    function inc(n) { return n + 1; }

    lz = lazylist(0, I, inc);
    it('takes the first n elements of an infinite sequence', function() {
        assert.deepEqual(R.take(5, lz), [0, 1, 2, 3, 4]);
    });
});

describe('takeWhile for a lazylist', function() {
    var inc = function(n) {return n + 1;};
    var pred = function(n) {return n < 5;};

    var lz = lazylist(0, R.identity, inc);
    it('takes the elements of an infinite sequence while the supplied predicate is true', function() {
        assert.deepEqual(R.takeWhile(pred, lz), [0, 1, 2, 3, 4]);
    });
});

describe('skip for a lazylist', function() {
    var lz;
    function I(x) { return x; }
    function inc(n) { return n + 1; }
    lz = lazylist(0, I, inc);

    it('skips the first n elements of an infinite sequence', function() {
        assert.deepEqual(R.take(5, R.skip(10, lz)), [10, 11, 12, 13, 14]);
    });
});

describe('map for a lazylist', function() {
    var lz;
    function I(x) { return x; }
    function inc(n) { return n + 1; }
    function square(n) {return n * n;}

    lz = lazylist(0, I, inc);

    it('maps a function over the elements of even an infinite sequence', function() {
        assert.deepEqual(R.take(5, R.map(square, lz)), [0, 1, 4, 9, 16]);
    });
});

describe('filter for a lazylist', function() {
    var even = function(n) {return n % 2 === 0;};

    var fibonacci = lazylist(
        [0, 1],
        function(pair) {return pair[0];},
        function(pair) {return [pair[1], pair[0] + pair[1]];}
    );

    it('filters the elements of even an infinite sequence according to a function', function() {
        assert.deepEqual(R.take(5, R.filter(even, fibonacci)), [0, 2, 8, 34, 144]);
    });
});

describe('repeat', function() {
    it('returns a lazy list of identical values', function() {
        assert.deepEqual(R.take(5, R.repeat(0)), [0, 0, 0, 0, 0]);
    });

    it('can accept any value, including `null`', function() {
        assert.deepEqual(R.take(3, R.repeat(null)), [null, null, null]);
    });

    it('can accept any value, including `undefined`', function() {
        assert.deepEqual(R.take(4, R.repeat(undefined)), [undefined, undefined, undefined, undefined]);
    });

    it('can accept any value, including an arbitrary object', function() {
        assert.deepEqual(R.take(2, R.repeat({a: 10, b: {c: 20}})), [{a: 10, b: {c: 20}}, {a: 10, b: {c: 20}}]);
    });
});
