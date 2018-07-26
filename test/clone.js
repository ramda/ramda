var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('deep clone integers, strings and booleans', function() {
  it('clones integers', function() {
    eq(R.clone(-4), -4);
    eq(R.clone(9007199254740991), 9007199254740991);
  });

  it('clones floats', function() {
    eq(R.clone(-4.5), -4.5);
    eq(R.clone(0.0), 0.0);
  });

  it('clones strings', function() {
    eq(R.clone('ramda'), 'ramda');
  });

  it('clones booleans', function() {
    eq(R.clone(true), true);
  });

});

describe('deep clone objects', function() {
  it('clones shallow object', function() {
    var obj = {a: 1, b: 'ramda', c: true, d: new Date(2013, 11, 25)};
    var clone = R.clone(obj);
    obj.c = false;
    obj.d.setDate(31);
    eq(clone, {a: 1, b: 'ramda', c: true, d: new Date(2013, 11, 25)});
  });

  it('clones deep object', function() {
    var obj = {a: {b: {c: 'ramda'}}};
    var clone = R.clone(obj);
    obj.a.b.c = null;
    eq(clone, {a: {b: {c: 'ramda'}}});
  });

  it('clones objects with circular references', function() {
    var x = {c: null};
    var y = {a: x};
    var z = {b: y};
    x.c = z;
    var clone = R.clone(x);
    assert.notStrictEqual(x, clone);
    assert.notStrictEqual(x.c, clone.c);
    assert.notStrictEqual(x.c.b, clone.c.b);
    assert.notStrictEqual(x.c.b.a, clone.c.b.a);
    assert.notStrictEqual(x.c.b.a.c, clone.c.b.a.c);
    eq(R.keys(clone), R.keys(x));
    eq(R.keys(clone.c), R.keys(x.c));
    eq(R.keys(clone.c.b), R.keys(x.c.b));
    eq(R.keys(clone.c.b.a), R.keys(x.c.b.a));
    eq(R.keys(clone.c.b.a.c), R.keys(x.c.b.a.c));

    x.c.b = 1;
    assert.notDeepEqual(clone.c.b, x.c.b);
  });

  it('clone instances', function() {
    var Obj = function(x) {
      this.x = x;
    };
    Obj.prototype.get = function() {
      return this.x;
    };
    Obj.prototype.set = function(x) {
      this.x = x;
    };

    var obj = new Obj(10);
    eq(obj.get(), 10);

    var clone = R.clone(obj);
    eq(clone.get(), 10);

    assert.notStrictEqual(obj, clone);

    obj.set(11);
    eq(obj.get(), 11);
    eq(clone.get(), 10);
  });

});

describe('deep clone arrays', function() {
  it('clones shallow arrays', function() {
    var list = [1, 2, 3];
    var clone = R.clone(list);
    list.pop();
    eq(clone, [1, 2, 3]);
  });

  it('clones deep arrays', function() {
    var list = [1, [1, 2, 3], [[[5]]]];
    var clone = R.clone(list);

    assert.notStrictEqual(list, clone);
    assert.notStrictEqual(list[2], clone[2]);
    assert.notStrictEqual(list[2][0], clone[2][0]);

    eq(clone, [1, [1, 2, 3], [[[5]]]]);
  });

});

describe('deep clone functions', function() {
  it('keep reference to function', function() {
    var fn = function(x) { return x + x;};
    var list = [{a: fn}];

    var clone = R.clone(list);

    eq(clone[0].a(10), 20);
    eq(list[0].a, clone[0].a);
  });

});

describe('built-in types', function() {
  it('clones Date object', function() {
    var date = new Date(2014, 10, 14, 23, 59, 59, 999);

    var clone = R.clone(date);

    assert.notStrictEqual(date, clone);
    eq(clone, new Date(2014, 10, 14, 23, 59, 59, 999));

    eq(clone.getDay(), 5); // friday
  });

  it('clones RegExp object', function() {
    R.forEach(function(pattern) {
      var clone = R.clone(pattern);
      assert.notStrictEqual(clone, pattern);
      eq(clone.constructor, RegExp);
      eq(clone.source, pattern.source);
      eq(clone.global, pattern.global);
      eq(clone.ignoreCase, pattern.ignoreCase);
      eq(clone.multiline, pattern.multiline);
    }, [/x/, /x/g, /x/i, /x/m, /x/gi, /x/gm, /x/im, /x/gim]);
  });

});

describe('deep clone deep nested mixed objects', function() {
  it('clones array with objects', function() {
    var list = [{a: {b: 1}}, [{c: {d: 1}}]];
    var clone = R.clone(list);
    list[1][0] = null;
    eq(clone, [{a: {b: 1}}, [{c: {d: 1}}]]);
  });

  it('clones array with arrays', function() {
    var list = [[1], [[3]]];
    var clone = R.clone(list);
    list[1][0] = null;
    eq(clone, [[1], [[3]]]);
  });

  it('clones array with mutual ref object', function() {
    var obj = {a: 1};
    var list = [{b: obj}, {b: obj}];
    var clone = R.clone(list);

    assert.strictEqual(list[0].b, list[1].b);
    assert.strictEqual(clone[0].b, clone[1].b);
    assert.notStrictEqual(clone[0].b, list[0].b);
    assert.notStrictEqual(clone[1].b, list[1].b);

    eq(clone[0].b, {a:1});
    eq(clone[1].b, {a:1});

    obj.a = 2;
    eq(clone[0].b, {a:1});
    eq(clone[1].b, {a:1});
  });

});

describe('deep clone edge cases', function() {
  it('nulls, undefineds and empty objects and arrays', function() {
    eq(R.clone(null), null);
    eq(R.clone(undefined), undefined);
    assert.notStrictEqual(R.clone(undefined), null);

    var obj = {};
    assert.notStrictEqual(R.clone(obj), obj);

    var list = [];
    assert.notStrictEqual(R.clone(list), list);
  });

});


describe('Let `R.clone` use an arbitrary user defined `clone` method', function() {

  it('dispatches to `clone` method if present', function() {
    function ArbitraryClone(x) { this.value = x; }
    ArbitraryClone.prototype.clone = function() { return new ArbitraryClone(this.value); };

    var obj = new ArbitraryClone(42);
    var arbitraryClonedObj = R.clone(obj);
    eq(arbitraryClonedObj, new ArbitraryClone(42));
    eq(arbitraryClonedObj instanceof ArbitraryClone, true);
  });

});
