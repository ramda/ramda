var assert = require('assert');
var R = require('..');

describe('foldObjIndexed', function() {
    var objA = {x: 'lc x', y: 'lc y', z: 'lc z', X: 'uc X', Y: 'uc Y', Z: 'uc Z'};
    var objB = {X: 'uc X', Y: 'uc Y', Z: 'uc Z', x: 'lc x', y: 'lc y', z: 'lc z'};
    var objC = {X: 'uc X', x: 'lc x', Y: 'uc Y', y: 'lc y', Z: 'uc Z', z: 'lc z'};
    function catkv(a, v, k) { return a + ' ' + 'key: ' + k + ', ' + 'value: ' + v + ';' ; }
    function catkvo(a, v, k, o) { return a + ' (' + k + ', ' + v + ') ' + o.Y; }
    it('folds an object in sorted-key order', function() {
        assert.strictEqual(R.foldObjIndexed(catkv, '', objA),
            ' key: X, value: uc X; key: Y, value: uc Y; key: Z, value: uc Z; key: x, value: lc x; key: y, value: lc y; key: z, value: lc z;');
        assert.strictEqual(R.foldObjIndexed(catkv, '', objA), R.foldObjIndexed(catkv, '', objB));
        assert.strictEqual(R.foldObjIndexed(catkv, '', objA), R.foldObjIndexed(catkv, '', objC));
    });
    it('may also pass the full object as the fourth parameter to the iterator function', function() {
        assert.strictEqual(R.foldObjIndexed(catkvo, '', {b: 'B', a: 'A', Y: 'Y'}), ' (Y, Y) Y (a, A) Y (b, B) Y');
    });
    it('returns the accumulator if the object has no enumerable own properties', function() {
        assert.deepEqual(R.foldObjIndexed(catkv, {}, {}), {});
        assert.deepEqual(R.foldObjIndexed(catkv, [], {}), []);
        assert.deepEqual(R.foldObjIndexed(catkv, 0, {}), 0);
        assert.deepEqual(R.foldObjIndexed(catkv, '', {}), '');
    });
    it('is curried', function() {
        assert(typeof R.foldObjIndexed(catkv) === 'function');
        assert(typeof R.foldObjIndexed(catkv)('') === 'function');
        assert(R.foldObjIndexed(catkv)('')({b: 'B', a: 'A'}) === ' key: a, value: A; key: b, value: B;');
    });
    it('throws on zero arguments', function() {
        assert.throws(R.foldObjIndexed, TypeError);
    });
});
