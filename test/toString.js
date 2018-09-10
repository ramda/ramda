var assert = require('assert');

var R = require('../source');


describe('toString', function() {

  it('returns the string representation of null', function() {
    assert.strictEqual(R.toString(null), 'null');
  });

  it('returns the string representation of undefined', function() {
    assert.strictEqual(R.toString(undefined), 'undefined');
  });

  it('returns the string representation of a Boolean primitive', function() {
    assert.strictEqual(R.toString(true), 'true');
    assert.strictEqual(R.toString(false), 'false');
  });

  it('returns the string representation of a number primitive', function() {
    assert.strictEqual(R.toString(0), '0');
    assert.strictEqual(R.toString(-0), '-0');
    assert.strictEqual(R.toString(1.23), '1.23');
    assert.strictEqual(R.toString(-1.23), '-1.23');
    assert.strictEqual(R.toString(1e+23), '1e+23');
    assert.strictEqual(R.toString(-1e+23), '-1e+23');
    assert.strictEqual(R.toString(1e-23), '1e-23');
    assert.strictEqual(R.toString(-1e-23), '-1e-23');
    assert.strictEqual(R.toString(Infinity), 'Infinity');
    assert.strictEqual(R.toString(-Infinity), '-Infinity');
    assert.strictEqual(R.toString(NaN), 'NaN');
  });

  it('returns the string representation of a string primitive', function() {
    assert.strictEqual(R.toString('abc'), '"abc"');
    assert.strictEqual(R.toString('x "y" z'), '"x \\"y\\" z"');
    assert.strictEqual(R.toString("' '"), '"\' \'"');
    assert.strictEqual(R.toString('" "'), '"\\" \\""');
    assert.strictEqual(R.toString('\b \b'), '"\\b \\b"');
    assert.strictEqual(R.toString('\f \f'), '"\\f \\f"');
    assert.strictEqual(R.toString('\n \n'), '"\\n \\n"');
    assert.strictEqual(R.toString('\r \r'), '"\\r \\r"');
    assert.strictEqual(R.toString('\t \t'), '"\\t \\t"');
    assert.strictEqual(R.toString('\v \v'), '"\\v \\v"');
    assert.strictEqual(R.toString('\0 \0'), '"\\0 \\0"');
    assert.strictEqual(R.toString('\\ \\'), '"\\\\ \\\\"');
  });

  it('returns the string representation of a Boolean object', function() {
    assert.strictEqual(R.toString(new Boolean(true)), 'new Boolean(true)');
    assert.strictEqual(R.toString(new Boolean(false)), 'new Boolean(false)');
  });

  it('returns the string representation of a Number object', function() {
    assert.strictEqual(R.toString(new Number(0)), 'new Number(0)');
    assert.strictEqual(R.toString(new Number(-0)), 'new Number(-0)');
  });

  it('returns the string representation of a String object', function() {
    assert.strictEqual(R.toString(new String('abc')), 'new String("abc")');
    assert.strictEqual(R.toString(new String('x "y" z')), 'new String("x \\"y\\" z")');
    assert.strictEqual(R.toString(new String("' '")), 'new String("\' \'")');
    assert.strictEqual(R.toString(new String('" "')), 'new String("\\" \\"")');
    assert.strictEqual(R.toString(new String('\b \b')), 'new String("\\b \\b")');
    assert.strictEqual(R.toString(new String('\f \f')), 'new String("\\f \\f")');
    assert.strictEqual(R.toString(new String('\n \n')), 'new String("\\n \\n")');
    assert.strictEqual(R.toString(new String('\r \r')), 'new String("\\r \\r")');
    assert.strictEqual(R.toString(new String('\t \t')), 'new String("\\t \\t")');
    assert.strictEqual(R.toString(new String('\v \v')), 'new String("\\v \\v")');
    assert.strictEqual(R.toString(new String('\0 \0')), 'new String("\\0 \\0")');
    assert.strictEqual(R.toString(new String('\\ \\')), 'new String("\\\\ \\\\")');
  });

  it('returns the string representation of a Date object', function() {
    assert.strictEqual(R.toString(new Date('2001-02-03T04:05:06.000Z')), 'new Date("2001-02-03T04:05:06.000Z")');
    assert.strictEqual(R.toString(new Date('XXX')), 'new Date(NaN)');
  });

  it('returns the string representation of a RegExp object', function() {
    assert.strictEqual(R.toString(/(?:)/), '/(?:)/');
    assert.strictEqual(R.toString(/\//g), '/\\//g');
  });

  it('returns the string representation of a function', function() {
    var add = function add(a, b) { return a + b; };
    assert.strictEqual(R.toString(add), add.toString());
  });

  it('returns the string representation of an array', function() {
    assert.strictEqual(R.toString([]), '[]');
    assert.strictEqual(R.toString([1, 2, 3]), '[1, 2, 3]');
    assert.strictEqual(R.toString([1, [2, [3]]]), '[1, [2, [3]]]');
    assert.strictEqual(R.toString(['x', 'y']), '["x", "y"]');
  });

  it('returns the string representation of an array with non-numeric property names', function() {
    var xs = [1, 2, 3];
    xs.foo = 0;
    xs.bar = 0;
    xs.baz = 0;

    assert.strictEqual(R.toString(xs), '[1, 2, 3, "bar": 0, "baz": 0, "foo": 0]');
  });

  it('returns the string representation of an arguments object', function() {
    assert.strictEqual(R.toString((function() { return arguments; })()), '(function() { return arguments; }())');
    assert.strictEqual(R.toString((function() { return arguments; })(1, 2, 3)), '(function() { return arguments; }(1, 2, 3))');
    assert.strictEqual(R.toString((function() { return arguments; })(['x', 'y'])), '(function() { return arguments; }(["x", "y"]))');
  });

  it('returns the string representation of a plain object', function() {
    assert.strictEqual(R.toString({}), '{}');
    assert.strictEqual(R.toString({foo: 1, bar: 2, baz: 3}), '{"bar": 2, "baz": 3, "foo": 1}');
    assert.strictEqual(R.toString({'"quoted"': true}), '{"\\"quoted\\"": true}');
    assert.strictEqual(R.toString({a: {b: {c: {}}}}), '{"a": {"b": {"c": {}}}}');
  });

  it('treats instance without custom `toString` method as plain object', function() {
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }
    assert.strictEqual(R.toString(new Point(1, 2)), '{"x": 1, "y": 2}');
  });

  it('dispatches to custom `toString` method', function() {
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }
    Point.prototype.toString = function() {
      return 'new Point(' + this.x + ', ' + this.y + ')';
    };
    assert.strictEqual(R.toString(new Point(1, 2)), 'new Point(1, 2)');

    function Just(x) {
      if (!(this instanceof Just)) {
        return new Just(x);
      }
      this.value = x;
    }
    Just.prototype.toString = function() {
      return 'Just(' + R.toString(this.value) + ')';
    };
    assert.strictEqual(R.toString(Just(42)), 'Just(42)');
    assert.strictEqual(R.toString(Just([1, 2, 3])), 'Just([1, 2, 3])');
    assert.strictEqual(R.toString(Just(Just(Just('')))), 'Just(Just(Just("")))');

    assert.strictEqual(R.toString({toString: R.always('x')}), 'x');
  });

  it('handles object with no `toString` method', function() {
    if (typeof Object.create === 'function') {
      var a = Object.create(null);
      var b = Object.create(null); b.x = 1; b.y = 2;
      assert.strictEqual(R.toString(a), '{}');
      assert.strictEqual(R.toString(b), '{"x": 1, "y": 2}');
    }
  });

  it('handles circular references', function() {
    var a = [];
    a[0] = a;
    assert.strictEqual(R.toString(a), '[<Circular>]');

    var o = {};
    o.o = o;
    assert.strictEqual(R.toString(o), '{"o": <Circular>}');

    var b = ['bee'];
    var c = ['see'];
    b[1] = c;
    c[1] = b;
    assert.strictEqual(R.toString(b), '["bee", ["see", <Circular>]]');
    assert.strictEqual(R.toString(c), '["see", ["bee", <Circular>]]');

    var p = {};
    var q = {};
    p.q = q;
    q.p = p;
    assert.strictEqual(R.toString(p), '{"q": {"p": <Circular>}}');
    assert.strictEqual(R.toString(q), '{"p": {"q": <Circular>}}');

    var x = [];
    var y = {};
    x[0] = y;
    y.x = x;
    assert.strictEqual(R.toString(x), '[{"x": <Circular>}]');
    assert.strictEqual(R.toString(y), '{"x": [<Circular>]}');
  });

});
