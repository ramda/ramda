var assert = require('assert');
var iterdone = require('iterdone');
var lodash = require('lodash');

var R = require('..');


describe('reduce', function() {
    var add = function(a, b) {return a + b;};
    var mult = function(a, b) {return a * b;};
    var objA = {x: 'lc x', y: 'lc y', z: 'lc z', X: 'uc X', Y: 'uc Y', Z: 'uc Z'};
    var objB = {X: 'uc X', Y: 'uc Y', Z: 'uc Z', x: 'lc x', y: 'lc y', z: 'lc z'};
    var objC = {X: 'uc X', x: 'lc x', Y: 'uc Y', y: 'lc y', Z: 'uc Z', z: 'lc z'};
    function cat(a, b) { return a + ' ' + b[1]; }

    it('folds simple functions over arrays with the supplied accumulator', function() {
        assert.strictEqual(R.reduce(add, 0, [1, 2, 3, 4]), 10);
        assert.strictEqual(R.reduce(mult, 1, [1, 2, 3, 4]), 24);
    });

    it('folds functions over iterables with the supplied accumulator', function() {
        assert.strictEqual(R.reduce(add, 0, iterdone.range(1, 5)), 10);
        assert.strictEqual(R.reduce(mult, 1, iterdone.range(1, 5)), 24);
    });

    it('folds functions over duck typed iterators with the supplied accumulator', function() {
        assert.strictEqual(R.reduce(add, 0, iterdone.range(1, 5)[iterdone.symbol]()), 10);
        assert.strictEqual(R.reduce(mult, 1, iterdone.range(1, 5)[iterdone.symbol]()), 24);
    });

    it('dispatches to objects that implement `reduce`', function() {
        var obj = {x: [1, 2, 3], reduce: function(f, acc) { return lodash.reduce(this.x, f, acc); }};
        assert.strictEqual(R.reduce(add, 0, obj), 6);
        assert.strictEqual(R.reduce(add, 10, obj), 16);
    });

    it('folds an object in sorted-key order', function() {
        assert.strictEqual(R.reduce(cat, '', objA), ' uc X uc Y uc Z lc x lc y lc z');
        assert.strictEqual(R.reduce(cat, '', objA), R.reduce(cat, '', objB));
        assert.strictEqual(R.reduce(cat, '', objA), R.reduce(cat, '', objC));
    });

    it('returns the accumulator if the object has no enumerable own properties', function() {
        assert.deepEqual(R.reduce(cat, {}, {}), {});
        assert.deepEqual(R.reduce(cat, [], {}), []);
        assert.deepEqual(R.reduce(cat, 0, {}), 0);
        assert.deepEqual(R.reduce(cat, '', {}), '');
    });

    it('returns the accumulator for an empty array', function() {
        assert.strictEqual(R.reduce(add, 0, []), 0);
        assert.strictEqual(R.reduce(mult, 1, []), 1);
        assert.deepEqual(R.reduce(R.concat, [], []), []);
    });

    it('is automatically curried', function() {
        var addOrConcat = R.reduce(add);
        var sum = addOrConcat(0);
        var cat = addOrConcat('');
        assert.strictEqual(sum([1, 2, 3, 4]), 10);
        assert.strictEqual(cat(['1', '2', '3', '4']), '1234');
    });

    it('correctly reports the arity of curried versions', function() {
        var sum = R.reduce(add, 0);
        assert.strictEqual(sum.length, 1);
    });
});
