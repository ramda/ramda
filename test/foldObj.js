var assert = require('assert');
var R = require('..');

describe('foldObj', function() {
    var objA = {x: 'lc x', y: 'lc y', z: 'lc z', X: 'uc X', Y: 'uc Y', Z: 'uc Z'};
    var objB = {X: 'uc X', Y: 'uc Y', Z: 'uc Z', x: 'lc x', y: 'lc y', z: 'lc z'};
    var objC = {X: 'uc X', x: 'lc x', Y: 'uc Y', y: 'lc y', Z: 'uc Z', z: 'lc z'};
    function cat(a, b) { return a + ' ' + b; }
    it('folds an object in sorted-key order', function() {
        assert.strictEqual(R.foldObj(cat, '', objA), ' uc X uc Y uc Z lc x lc y lc z');
        assert.strictEqual(R.foldObj(cat, '', objA), R.foldObj(cat, '', objB));
        assert.strictEqual(R.foldObj(cat, '', objA), R.foldObj(cat, '', objC));
    });
    it('returns the accumulator if the object has no enumerable own properties', function() {
        assert.deepEqual(R.foldObj(cat, {}, {}), {});
        assert.deepEqual(R.foldObj(cat, [], {}), []);
        assert.deepEqual(R.foldObj(cat, 0, {}), 0);
        assert.deepEqual(R.foldObj(cat, '', {}), '');
    });
    it('is curried', function() {
        assert(typeof R.foldObj(cat) === 'function');
        assert(typeof R.foldObj(cat)('') === 'function');
        assert(R.foldObj(cat)('')({b: 'B', a: 'A'}) === ' A B');
    });
    it('throws on zero arguments', function() {
        assert.throws(R.foldObj, TypeError);
    });
});
