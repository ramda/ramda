/* global Map, Set, WeakMap, WeakSet */
/* jshint typed: true */

var assert = require('assert');

var R = require('..');

describe('equals', function() {
  var a = [];
  var b = a;
  it('tests for deep equality of its operands', function() {
    assert.strictEqual(R.equals(100, 100), true);
    assert.strictEqual(R.equals(100, '100'), false);
    assert.strictEqual(R.equals([], []), true);
    assert.strictEqual(R.equals(a, b), true);
  });

  it('considers equal Boolean primitives equal', function() {
    assert.strictEqual(R.equals(true, true), true);
    assert.strictEqual(R.equals(false, false), true);
    assert.strictEqual(R.equals(true, false), false);
    assert.strictEqual(R.equals(false, true), false);
  });

  it('considers equivalent Boolean objects equal', function() {
    /* jshint -W053 */
    assert.strictEqual(R.equals(new Boolean(true), new Boolean(true)), true);
    assert.strictEqual(R.equals(new Boolean(false), new Boolean(false)), true);
    assert.strictEqual(R.equals(new Boolean(true), new Boolean(false)), false);
    assert.strictEqual(R.equals(new Boolean(false), new Boolean(true)), false);
    /* jshint +W053 */
  });

  it('never considers Boolean primitive equal to Boolean object', function() {
    /* jshint -W053 */
    assert.strictEqual(R.equals(true, new Boolean(true)), false);
    assert.strictEqual(R.equals(new Boolean(true), true), false);
    assert.strictEqual(R.equals(false, new Boolean(false)), false);
    assert.strictEqual(R.equals(new Boolean(false), false), false);
    /* jshint +W053 */
  });

  it('considers equal number primitives equal', function() {
    assert.strictEqual(R.equals(0, 0), true);
    assert.strictEqual(R.equals(0, 1), false);
    assert.strictEqual(R.equals(1, 0), false);
  });

  it('considers equivalent Number objects equal', function() {
    /* jshint -W053 */
    assert.strictEqual(R.equals(new Number(0), new Number(0)), true);
    assert.strictEqual(R.equals(new Number(0), new Number(1)), false);
    assert.strictEqual(R.equals(new Number(1), new Number(0)), false);
    /* jshint +W053 */
  });

  it('never considers number primitive equal to Number object', function() {
    /* jshint -W053 */
    assert.strictEqual(R.equals(0, new Number(0)), false);
    assert.strictEqual(R.equals(new Number(0), 0), false);
    /* jshint +W053 */
  });

  it('considers equal string primitives equal', function() {
    assert.strictEqual(R.equals('', ''), true);
    assert.strictEqual(R.equals('', 'x'), false);
    assert.strictEqual(R.equals('x', ''), false);
    assert.strictEqual(R.equals('foo', 'foo'), true);
    assert.strictEqual(R.equals('foo', 'bar'), false);
    assert.strictEqual(R.equals('bar', 'foo'), false);
  });

  it('considers equivalent String objects equal', function() {
    /* jshint -W053 */
    assert.strictEqual(R.equals(new String(''), new String('')), true);
    assert.strictEqual(R.equals(new String(''), new String('x')), false);
    assert.strictEqual(R.equals(new String('x'), new String('')), false);
    assert.strictEqual(R.equals(new String('foo'), new String('foo')), true);
    assert.strictEqual(R.equals(new String('foo'), new String('bar')), false);
    assert.strictEqual(R.equals(new String('bar'), new String('foo')), false);
    /* jshint +W053 */
  });

  it('never considers string primitive equal to String object', function() {
    /* jshint -W053 */
    assert.strictEqual(R.equals('', new String('')), false);
    assert.strictEqual(R.equals(new String(''), ''), false);
    assert.strictEqual(R.equals('x', new String('x')), false);
    assert.strictEqual(R.equals(new String('x'), 'x'), false);
    /* jshint +W053 */
  });

  it('handles objects', function() {
    assert.strictEqual(R.equals({}, {}), true);
    assert.strictEqual(R.equals({a:1, b:2}, {a:1, b:2}), true);
    assert.strictEqual(R.equals({a:2, b:3}, {b:3, a:2}), true);
    assert.strictEqual(R.equals({a:2, b:3}, {a:3, b:3}), false);
    assert.strictEqual(R.equals({a:2, b:3, c:1}, {a:2, b:3}), false);
  });

  it('considers equivalent Arguments objects equal', function() {
    var a = (function() { return arguments; }());
    var b = (function() { return arguments; }());
    var c = (function() { return arguments; }(1, 2, 3));
    var d = (function() { return arguments; }(1, 2, 3));

    assert.strictEqual(R.equals(a, b), true);
    assert.strictEqual(R.equals(b, a), true);
    assert.strictEqual(R.equals(c, d), true);
    assert.strictEqual(R.equals(d, c), true);
    assert.strictEqual(R.equals(a, c), false);
    assert.strictEqual(R.equals(c, a), false);
  });

  var supportsSticky = false;
  try { RegExp('', 'y'); supportsSticky = true; } catch (e) {}

  var supportsUnicode = false;
  try { RegExp('', 'u'); supportsUnicode = true; } catch (e) {}

  it('handles regex', function() {
    assert.strictEqual(R.equals(/\s/, /\s/), true);
    assert.strictEqual(R.equals(/\s/, /\d/), false);
    assert.strictEqual(R.equals(/a/gi, /a/ig), true);
    assert.strictEqual(R.equals(/a/mgi, /a/img), true);
    assert.strictEqual(R.equals(/a/gi, /a/i), false);

    if (supportsSticky) {
      // assert.strictEqual(R.equals(/\s/y, /\s/y), true);
      // assert.strictEqual(R.equals(/a/mygi, /a/imgy), true);
    }

    if (supportsUnicode) {
      // assert.strictEqual(R.equals(/\s/u, /\s/u), true);
      // assert.strictEqual(R.equals(/a/mugi, /a/imgu), true);
    }
  });

  var listA = [1, 2, 3];
  var listB = [1, 3, 2];
  it('handles lists', function() {
    assert.strictEqual(R.equals([], {}), false);
    assert.strictEqual(R.equals(listA, listB), false);
  });

  var c = {}; c.v = c;
  var d = {}; d.v = d;
  var e = []; e.push(e);
  var f = []; f.push(f);
  var nestA = {a:[1, 2, {c:1}], b:1};
  var nestB = {a:[1, 2, {c:1}], b:1};
  var nestC = {a:[1, 2, {c:2}], b:1};
  it('handles recursive data structures', function() {
    assert.strictEqual(R.equals(c, d), true);
    assert.strictEqual(R.equals(e, f), true);
    assert.strictEqual(R.equals(nestA, nestB), true);
    assert.strictEqual(R.equals(nestA, nestC), false);
  });

  it('handles dates', function() {
    assert.strictEqual(R.equals(new Date(0), new Date(0)), true);
    assert.strictEqual(R.equals(new Date(1), new Date(1)), true);
    assert.strictEqual(R.equals(new Date(0), new Date(1)), false);
    assert.strictEqual(R.equals(new Date(1), new Date(0)), false);
  });

  it('requires that both objects have the same enumerable properties with the same values', function() {
    /* jshint -W053 */
    var a1 = [];
    var a2 = [];
    a2.x = 0;

    var b1 = new Boolean(false);
    var b2 = new Boolean(false);
    b2.x = 0;

    var d1 = new Date(0);
    var d2 = new Date(0);
    d2.x = 0;

    var n1 = new Number(0);
    var n2 = new Number(0);
    n2.x = 0;

    var r1 = /(?:)/;
    var r2 = /(?:)/;
    r2.x = 0;

    var s1 = new String('');
    var s2 = new String('');
    s2.x = 0;
    /* jshint +W053 */

    assert.strictEqual(R.equals(a1, a2), false);
    assert.strictEqual(R.equals(b1, b2), false);
    assert.strictEqual(R.equals(d1, d2), false);
    assert.strictEqual(R.equals(n1, n2), false);
    assert.strictEqual(R.equals(r1, r2), false);
    assert.strictEqual(R.equals(s1, s2), false);
  });

  if (typeof ArrayBuffer !== 'undefined' && typeof Int8Array !== 'undefined') {
    var typArr1 = new ArrayBuffer(10);
    typArr1[0] = 1;
    var typArr2 = new ArrayBuffer(10);
    typArr2[0] = 1;
    var typArr3 = new ArrayBuffer(10);
    var intTypArr = new Int8Array(typArr1);
    typArr3[0] = 0;
    it('handles typed arrays', function() {
      assert.strictEqual(R.equals(typArr1, typArr2), true);
      assert.strictEqual(R.equals(typArr1, typArr3), false);
      assert.strictEqual(R.equals(typArr1, intTypArr), false);
    });
  }

  if (typeof Map !== 'undefined') {
    it('compares Map objects by value', function() {
      assert.strictEqual(R.equals(new Map([]), new Map([])), true);
      assert.strictEqual(R.equals(new Map([]), new Map([[1, 'a']])), false);
      assert.strictEqual(R.equals(new Map([[1, 'a']]), new Map([])), false);
      assert.strictEqual(R.equals(new Map([[1, 'a']]), new Map([[1, 'a']])), true);
      assert.strictEqual(R.equals(new Map([[1, 'a']]), new Map([[1, 'b']])), false);
      assert.strictEqual(R.equals(new Map([[1, 'a'], [2, new Map([[3, 'c']])]]), new Map([[1, 'a'], [2, new Map([[3, 'c']])]])), true);
      assert.strictEqual(R.equals(new Map([[1, 'a'], [2, new Map([[3, 'c']])]]), new Map([[1, 'a'], [2, new Map([[3, 'd']])]])), false);
      assert.strictEqual(R.equals(new Map([[[1, 2, 3], [4, 5, 6]]]), new Map([[[1, 2, 3], [4, 5, 6]]])), true);
      assert.strictEqual(R.equals(new Map([[[1, 2, 3], [4, 5, 6]]]), new Map([[[1, 2, 3], [7, 8, 9]]])), false);
    });
  }

  if (typeof Set !== 'undefined') {
    it('compares Set objects by value', function() {
      assert.strictEqual(R.equals(new Set([]), new Set([])), true);
      assert.strictEqual(R.equals(new Set([]), new Set([1])), false);
      assert.strictEqual(R.equals(new Set([1]), new Set([])), false);
      assert.strictEqual(R.equals(new Set([1, new Set([2, new Set([3])])]), new Set([1, new Set([2, new Set([3])])])), true);
      assert.strictEqual(R.equals(new Set([1, new Set([2, new Set([3])])]), new Set([1, new Set([2, new Set([4])])])), false);
      assert.strictEqual(R.equals(new Set([[1, 2, 3], [4, 5, 6]]), new Set([[1, 2, 3], [4, 5, 6]])), true);
      assert.strictEqual(R.equals(new Set([[1, 2, 3], [4, 5, 6]]), new Set([[1, 2, 3], [7, 8, 9]])), false);
    });
  }

  if (typeof WeakMap !== 'undefined') {
    it('compares WeakMap objects by identity', function() {
      var m = new WeakMap([]);
      assert.strictEqual(R.equals(m, m), true);
      assert.strictEqual(R.equals(m, new WeakMap([])), false);
    });
  }

  if (typeof WeakSet !== 'undefined') {
    it('compares WeakSet objects by identity', function() {
      var s = new WeakSet([]);
      assert.strictEqual(R.equals(s, s), true);
      assert.strictEqual(R.equals(s, new WeakSet([])), false);
    });
  }

  it('dispatches to `equals` method recursively', function() {
    function Left(x) { this.value = x; }
    Left.prototype.equals = function(x) {
      return x instanceof Left && R.equals(x.value, this.value);
    };

    function Right(x) { this.value = x; }
    Right.prototype.equals = function(x) {
      return x instanceof Right && R.equals(x.value, this.value);
    };

    assert.strictEqual(R.equals(new Left([42]), new Left([42])), true);
    assert.strictEqual(R.equals(new Left([42]), new Left([43])), false);
    assert.strictEqual(R.equals(new Left(42), {value: 42}), false);
    assert.strictEqual(R.equals({value: 42}, new Left(42)), false);
    assert.strictEqual(R.equals(new Left(42), new Right(42)), false);
    assert.strictEqual(R.equals(new Right(42), new Left(42)), false);

    assert.strictEqual(R.equals([new Left(42)], [new Left(42)]), true);
    assert.strictEqual(R.equals([new Left(42)], [new Right(42)]), false);
    assert.strictEqual(R.equals([new Right(42)], [new Left(42)]), false);
    assert.strictEqual(R.equals([new Right(42)], [new Right(42)]), true);
  });

  it('is commutative', function() {
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }
    Point.prototype.equals = function(point) {
      return point instanceof Point &&
             this.x === point.x && this.y === point.y;
    };

    function ColorPoint(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
    }
    ColorPoint.prototype = new Point(0, 0);
    ColorPoint.prototype.equals = function(point) {
      return point instanceof ColorPoint &&
             this.x === point.x && this.y === point.y &&
             this.color === point.color;
    };

    assert.strictEqual(R.equals(new Point(2, 2), new ColorPoint(2, 2, 'red')), false);
    assert.strictEqual(R.equals(new ColorPoint(2, 2, 'red'), new Point(2, 2)), false);
  });

  it('is curried', function() {
    var isA = R.equals(a);
    assert.strictEqual(isA([]), true);
  });
});
