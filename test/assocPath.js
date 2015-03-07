var assert = require('assert');

var R = require('..');


describe('assocPath', function() {
    it('makes a shallow clone of an object, overriding only what is necessary for the path', function() {
        var obj1 = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: 5, j: {k: 6, l: 7}}}, m: 8};
        var obj2 = R.assocPath(['f', 'g', 'i'], {x: 42}, obj1);
        assert.deepEqual(obj2,
            {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: {x: 42}, j: {k: 6, l: 7}}}, m: 8}
        );
        // Note: reference equality below!
        assert.strictEqual(obj2.a, obj1.a);
        assert.strictEqual(obj2.m, obj1.m);
        assert.strictEqual(obj2.f.g.h, obj1.f.g.h);
        assert.strictEqual(obj2.f.g.j, obj1.f.g.j);
    });

    it('is the equivalent of clone and setPath if the property is not on the original', function() {
        var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
        var obj2 = R.assocPath(['x', 'y', 'z'], {w: 42}, obj1);
        assert.deepEqual(obj2, {a: 1, b: {c: 2, d: 3}, e: 4, f: 5, x: {y: {z: {w: 42}}}});
        // Note: reference equality below!
        assert.strictEqual(obj2.a, obj1.a);
        assert.strictEqual(obj2.b, obj1.b);
        assert.strictEqual(obj2.f, obj1.f);
    });

    it('is properly curried', function() {
        var obj1 = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: 5, j: {k: 6, l: 7}}}, m: 8};
        var expected = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: {x: 42}, j: {k: 6, l: 7}}}, m: 8};
        var f = R.assocPath(['f', 'g', 'i']);
        var g = f({x: 42});
        assert.deepEqual(f({x: 42}, obj1), expected);
        assert.deepEqual(g(obj1), expected);
    });

    it('accepts empty path', function() {
        assert.deepEqual(R.assocPath([], 3, {a: 1, b: 2}), {a: 1, b: 2});
    });
});
