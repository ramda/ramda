var R = require('../source');
var eq = require('./shared/eq');
var assert = require('assert');


describe('dissoc', function() {
  it('copies an object omitting the specified property', function() {
    eq(R.dissoc('b', {a: 1, b: 2, c: 3}), {a: 1, c: 3});
    eq(R.dissoc('d', {a: 1, b: 2, c: 3}), {a: 1, b: 2, c: 3});
    eq(R.dissoc('c', {a: 1, b: 2, c: null}), {a: 1, b: 2});
    eq(R.dissoc('c', {a: 1, b: 2, c: undefined}), {a: 1, b: 2});

    var obj1 = {a: 1, b: 2};
    var obj2 = R.dissoc('c', obj1);

    eq(obj2, obj1);

    // Note: reference equality below!
    assert.notStrictEqual(obj2, obj1);
  });

  it('makes a shallow clone of an array, remove only the specified index', function() {
    var ary1 = [1, [2, 3], 4, 5];
    var ary2 = R.dissoc(2, ary1);
    var ary3 = R.dissoc(4, ary1);

    eq(ary2, [1, [2, 3], 5]);
    eq(ary3, [1, [2, 3], 4, 5]);

    // Note: reference equality below!
    assert.strictEqual(ary2[0], ary1[0]);
    assert.strictEqual(ary2[1], ary1[1]);
    assert.strictEqual(ary2[2], ary1[3]);
    assert.notStrictEqual(ary3, ary1);
    assert.strictEqual(ary3[0], ary1[0]);
    assert.strictEqual(ary3[1], ary1[1]);
    assert.strictEqual(ary3[2], ary1[2]);
    assert.strictEqual(ary3[3], ary1[3]);
  });

  it('includes prototype properties', function() {
    function Rectangle(width, height) {
      this.width = width;
      this.height = height;
    }
    var area = Rectangle.prototype.area = function() {
      return this.width * this.height;
    };
    var rect = new Rectangle(7, 6);

    eq(R.dissoc('area', rect), {width: 7, height: 6});
    eq(R.dissoc('width', rect), {height: 6, area: area});
    eq(R.dissoc('depth', rect), {width: 7, height: 6, area: area});
  });

  it('coerces non-string types', function() {
    eq(R.dissoc(42, {a: 1, b: 2, 42: 3}), {a: 1, b: 2});
    eq(R.dissoc(null, {a: 1, b: 2, 'null': 3}), {a: 1, b: 2});
    eq(R.dissoc(undefined, {a: 1, b: 2, undefined: 3}), {a: 1, b: 2});
  });

});
