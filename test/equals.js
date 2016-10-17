/* global Map, Set */

var Either = require('sanctuary-either');

var R = require('..');
var eq = require('./shared/eq');

describe('equals', function() {
  var a = [];
  var b = a;
  it('tests for deep equality of its operands', function() {
    eq(R.equals(100, 100), true);
    eq(R.equals(100, '100'), false);
    eq(R.equals([], []), true);
    eq(R.equals(a, b), true);
  });

  it('considers equal Boolean primitives equal', function() {
    eq(R.equals(true, true), true);
    eq(R.equals(false, false), true);
    eq(R.equals(true, false), false);
    eq(R.equals(false, true), false);
  });

  it('considers equivalent Boolean objects equal', function() {
    eq(R.equals(new Boolean(true), new Boolean(true)), true);
    eq(R.equals(new Boolean(false), new Boolean(false)), true);
    eq(R.equals(new Boolean(true), new Boolean(false)), false);
    eq(R.equals(new Boolean(false), new Boolean(true)), false);
  });

  it('never considers Boolean primitive equal to Boolean object', function() {
    eq(R.equals(true, new Boolean(true)), false);
    eq(R.equals(new Boolean(true), true), false);
    eq(R.equals(false, new Boolean(false)), false);
    eq(R.equals(new Boolean(false), false), false);
  });

  it('considers equal number primitives equal', function() {
    eq(R.equals(0, 0), true);
    eq(R.equals(0, 1), false);
    eq(R.equals(1, 0), false);
  });

  it('considers equivalent Number objects equal', function() {
    eq(R.equals(new Number(0), new Number(0)), true);
    eq(R.equals(new Number(0), new Number(1)), false);
    eq(R.equals(new Number(1), new Number(0)), false);
  });

  it('never considers number primitive equal to Number object', function() {
    eq(R.equals(0, new Number(0)), false);
    eq(R.equals(new Number(0), 0), false);
  });

  it('considers equal string primitives equal', function() {
    eq(R.equals('', ''), true);
    eq(R.equals('', 'x'), false);
    eq(R.equals('x', ''), false);
    eq(R.equals('foo', 'foo'), true);
    eq(R.equals('foo', 'bar'), false);
    eq(R.equals('bar', 'foo'), false);
  });

  it('considers equivalent String objects equal', function() {
    eq(R.equals(new String(''), new String('')), true);
    eq(R.equals(new String(''), new String('x')), false);
    eq(R.equals(new String('x'), new String('')), false);
    eq(R.equals(new String('foo'), new String('foo')), true);
    eq(R.equals(new String('foo'), new String('bar')), false);
    eq(R.equals(new String('bar'), new String('foo')), false);
  });

  it('never considers string primitive equal to String object', function() {
    eq(R.equals('', new String('')), false);
    eq(R.equals(new String(''), ''), false);
    eq(R.equals('x', new String('x')), false);
    eq(R.equals(new String('x'), 'x'), false);
  });

  it('handles objects', function() {
    eq(R.equals({}, {}), true);
    eq(R.equals({a:1, b:2}, {a:1, b:2}), true);
    eq(R.equals({a:2, b:3}, {b:3, a:2}), true);
    eq(R.equals({a:2, b:3}, {a:3, b:3}), false);
    eq(R.equals({a:2, b:3, c:1}, {a:2, b:3}), false);
  });

  it('considers equivalent Arguments objects equal', function() {
    var a = (function() { return arguments; }());
    var b = (function() { return arguments; }());
    var c = (function() { return arguments; }(1, 2, 3));
    var d = (function() { return arguments; }(1, 2, 3));

    eq(R.equals(a, b), true);
    eq(R.equals(b, a), true);
    eq(R.equals(c, d), true);
    eq(R.equals(d, c), true);
    eq(R.equals(a, c), false);
    eq(R.equals(c, a), false);
  });

  it('considers equivalent Error objects equal', function() {
    eq(R.equals(new Error('XXX'), new Error('XXX')), true);
    eq(R.equals(new Error('XXX'), new Error('YYY')), false);
    eq(R.equals(new Error('XXX'), new TypeError('XXX')), false);
    eq(R.equals(new Error('XXX'), new TypeError('YYY')), false);
  });

  var supportsSticky = false;
  try { RegExp('', 'y'); supportsSticky = true; } catch (e) {}

  var supportsUnicode = false;
  try { RegExp('', 'u'); supportsUnicode = true; } catch (e) {}

  it('handles regex', function() {
    eq(R.equals(/\s/, /\s/), true);
    eq(R.equals(/\s/, /\d/), false);
    eq(R.equals(/a/gi, /a/ig), true);
    eq(R.equals(/a/mgi, /a/img), true);
    eq(R.equals(/a/gi, /a/i), false);

    if (supportsSticky) {
      // eq(R.equals(/\s/y, /\s/y), true);
      // eq(R.equals(/a/mygi, /a/imgy), true);
    }

    if (supportsUnicode) {
      // eq(R.equals(/\s/u, /\s/u), true);
      // eq(R.equals(/a/mugi, /a/imgu), true);
    }
  });

  var listA = [1, 2, 3];
  var listB = [1, 3, 2];
  it('handles lists', function() {
    eq(R.equals([], {}), false);
    eq(R.equals(listA, listB), false);
  });

  var c = {}; c.v = c;
  var d = {}; d.v = d;
  var e = []; e.push(e);
  var f = []; f.push(f);
  var nestA = {a:[1, 2, {c:1}], b:1};
  var nestB = {a:[1, 2, {c:1}], b:1};
  var nestC = {a:[1, 2, {c:2}], b:1};
  it('handles recursive data structures', function() {
//  eq(R.equals(c, d), true);
//  eq(R.equals(e, f), true);
    eq(R.equals(nestA, nestB), true);
    eq(R.equals(nestA, nestC), false);
  });

  it('handles dates', function() {
    eq(R.equals(new Date(0), new Date(0)), true);
    eq(R.equals(new Date(1), new Date(1)), true);
    eq(R.equals(new Date(0), new Date(1)), false);
    eq(R.equals(new Date(1), new Date(0)), false);
  });

  it('dispatches to `equals` method recursively', function() {
    eq(R.equals(new Either.Left([42]), new Either.Left([42])), true);
    eq(R.equals(new Either.Left([42]), new Either.Left([43])), false);
    eq(R.equals(new Either.Left(42), {value: 42}), false);
    eq(R.equals({value: 42}, new Either.Left(42)), false);
    eq(R.equals(new Either.Left(42), new Either.Right(42)), false);
    eq(R.equals(new Either.Right(42), new Either.Left(42)), false);

    eq(R.equals([new Either.Left(42)], [new Either.Left(42)]), true);
    eq(R.equals([new Either.Left(42)], [new Either.Right(42)]), false);
    eq(R.equals([new Either.Right(42)], [new Either.Left(42)]), false);
    eq(R.equals([new Either.Right(42)], [new Either.Right(42)]), true);
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

    eq(R.equals(new Point(2, 2), new ColorPoint(2, 2, 'red')), false);
    eq(R.equals(new ColorPoint(2, 2, 'red'), new Point(2, 2)), false);
  });

});
