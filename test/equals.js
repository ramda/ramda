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

  var date1 = new Date(0);
  var date2 = new Date(0);
  var date3 = new Date(1);
  var date4 = new Date(0);
  date4.v = 'value';
  it('handles dates', function() {
    assert.strictEqual(R.equals(date1, date2), true);
    assert.strictEqual(R.equals(date2, date3), false);
    assert.strictEqual(R.equals(date1, date4), false);
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

  it('dispatches to `equals` method', function() {
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
  });

  it('is curried', function() {
    var isA = R.equals(a);
    assert.strictEqual(isA([]), true);
  });
});
