var assert = require('assert');

var R = require('..');


describe('toString', function () {

  it('returns the string representation of nulls', function () {
    assert.strictEqual(R.toStringN(null, null), 'null,null');
  });

  it('returns the string representation of undefined', function () {
    assert.strictEqual(R.toStringN(undefined, undefined), 'undefined,undefined');
  });

  it('returns the string representation of a Boolean primitive', function () {
    assert.strictEqual(R.toStringN(true, false), 'true,false');
  });

  it('returns the string representation of a number primitive', function () {
    assert.strictEqual(R.toStringN(0, -0), '0,-0');
    assert.strictEqual(R.toStringN(1.23, '-1.23'), '1.23,"-1.23"');
    assert.strictEqual(R.toStringN(1e+23, -1e+23), '1e+23,-1e+23');
    assert.strictEqual(R.toStringN(1e-23, -1e-23), '1e-23,-1e-23');
    assert.strictEqual(R.toStringN(Infinity, -Infinity), 'Infinity,-Infinity');
    assert.strictEqual(R.toStringN(NaN, NaN, NaN), 'NaN,NaN,NaN');
  });

  it('returns the string representation of a string primitive', function () {
    assert.strictEqual(R.toStringN('abc', 'x "y" z', "' '"), '"abc","x \\"y\\" z","\' \'"');
    assert.strictEqual(R.toStringN('" "'), '"\\" \\""');
    assert.strictEqual(R.toStringN('\b \b',
      '\f \f',
      '\n \n',
      '\r \r',
      '\t \t',
      '\v \v',
      '\0 \0',
      '\\ \\'),
      '"\\b \\b","\\f \\f","\\n \\n","\\r \\r","\\t \\t","\\v \\v","\\0 \\0","\\\\ \\\\"');
  });

  it('returns the string representation of a Boolean object', function () {
    assert.strictEqual(R.toStringN(new Boolean(true), new Boolean(false)), 'new Boolean(true),new Boolean(false)');
  });

  it('returns the string representation of a Number object', function () {
    assert.strictEqual(R.toStringN(new Number(0), new Number(-0)), 'new Number(0),new Number(-0)');
  });

  it('returns the string representation of a String object', function () {
    assert.strictEqual(R.toStringN(new String('abc')), 'new String("abc")');
    assert.strictEqual(R.toStringN(new String('x "y" z')), 'new String("x \\"y\\" z")');
    assert.strictEqual(R.toStringN(new String("' '")), 'new String("\' \'")');
    assert.strictEqual(R.toStringN(new String('" "')), 'new String("\\" \\"")');
    assert.strictEqual(R.toStringN(new String('\b \b')), 'new String("\\b \\b")');
    assert.strictEqual(R.toStringN(new String('\f \f')), 'new String("\\f \\f")');
    assert.strictEqual(R.toStringN(new String('\n \n')), 'new String("\\n \\n")');
    assert.strictEqual(R.toStringN(new String('\r \r')), 'new String("\\r \\r")');
    assert.strictEqual(R.toStringN(new String('\t \t')), 'new String("\\t \\t")');
    assert.strictEqual(R.toStringN(new String('\v \v')), 'new String("\\v \\v")');
    assert.strictEqual(R.toStringN(new String('\0 \0')), 'new String("\\0 \\0")');
    assert.strictEqual(R.toStringN(new String('\\ \\')), 'new String("\\\\ \\\\")');
  });

  it('returns the string representation of a Date object', function () {
    assert.strictEqual(R.toStringN(new Date('2001-02-03T04:05:06.000Z')), 'new Date("2001-02-03T04:05:06.000Z")');
    assert.strictEqual(R.toStringN(new Date('XXX')), 'new Date(NaN)');
  });

  it('returns the string representation of a RegExp object', function () {
    assert.strictEqual(R.toStringN(/(?:)/), '/(?:)/');
    assert.strictEqual(R.toStringN(/\//g), '/\\//g');
  });

  it('returns the string representation of a function', function () {
    assert.strictEqual(R.toStringN(function add(a, b) { return a + b; }), 'function add(a, b) { return a + b; }');
  });

  it('returns the string representation of an array', function () {
    assert.strictEqual(R.toStringN([]), '[]');
    assert.strictEqual(R.toStringN([1, 2, 3]), '[1, 2, 3]');
    assert.strictEqual(R.toStringN([1, [2, [3]]]), '[1, [2, [3]]]');
    assert.strictEqual(R.toStringN(['x', 'y']), '["x", "y"]');
  });

  it('returns the string representation of an array with non-numeric property names', function () {
    var xs = [1, 2, 3];
    xs.foo = 0;
    xs.bar = 0;
    xs.baz = 0;

    assert.strictEqual(R.toStringN(/x/.exec('xyz')), '["x", "index": 0, "input": "xyz"]');
    assert.strictEqual(R.toStringN(xs), '[1, 2, 3, "bar": 0, "baz": 0, "foo": 0]');
  });

  it('returns the string representation of an arguments object', function () {
    assert.strictEqual(R.toStringN((function () { return arguments; })()), '(function() { return arguments; }())');
    assert.strictEqual(R.toStringN((function () { return arguments; })(1, 2, 3)), '(function() { return arguments; }(1, 2, 3))');
    assert.strictEqual(R.toStringN((function () { return arguments; })(['x', 'y'])), '(function() { return arguments; }(["x", "y"]))');
  });

  it('returns the string representation of a plain object', function () {
    assert.strictEqual(R.toStringN({}), '{}');
    assert.strictEqual(R.toStringN({ foo: 1, bar: 2, baz: 3 }), '{"bar": 2, "baz": 3, "foo": 1}');
    assert.strictEqual(R.toStringN({ '"quoted"': true }), '{"\\"quoted\\"": true}');
    assert.strictEqual(R.toStringN({ a: { b: { c: {} } } }), '{"a": {"b": {"c": {}}}}');
  });

  it('treats instance without custom `toString` method as plain object', function () {
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }
    assert.strictEqual(R.toStringN(new Point(1, 2)), '{"x": 1, "y": 2}');
  });

  it('dispatches to custom `toString` method', function () {
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }
    Point.prototype.toString = function () {
      return 'new Point(' + this.x + ', ' + this.y + ')';
    };
    assert.strictEqual(R.toStringN(new Point(1, 2)), 'new Point(1, 2)');

    function Just(x) {
      if (!(this instanceof Just)) {
        return new Just(x);
      }
      this.value = x;
    }
    Just.prototype.toString = function () {
      return 'Just(' + R.toStringN(this.value) + ')';
    };
    assert.strictEqual(R.toStringN(Just(42)), 'Just(42)');
    assert.strictEqual(R.toStringN(Just([1, 2, 3])), 'Just([1, 2, 3])');
    assert.strictEqual(R.toStringN(Just(Just(Just('')))), 'Just(Just(Just("")))');

    assert.strictEqual(R.toStringN({ toString: R.always('x') }), 'x');
  });

  it('handles object with no `toString` method', function () {
    if (typeof Object.create === 'function') {
      var a = Object.create(null);
      var b = Object.create(null); b.x = 1; b.y = 2;
      assert.strictEqual(R.toStringN(a), '{}');
      assert.strictEqual(R.toStringN(b), '{"x": 1, "y": 2}');
    }
  });

  it('handles circular references', function () {
    var a = [];
    a[0] = a;
    assert.strictEqual(R.toStringN(a), '[<Circular>]');

    var o = {};
    o.o = o;
    assert.strictEqual(R.toStringN(o), '{"o": <Circular>}');

    var b = ['bee'];
    var c = ['see'];
    b[1] = c;
    c[1] = b;
    assert.strictEqual(R.toStringN(b), '["bee", ["see", <Circular>]]');
    assert.strictEqual(R.toStringN(c), '["see", ["bee", <Circular>]]');

    var p = {};
    var q = {};
    p.q = q;
    q.p = p;
    assert.strictEqual(R.toStringN(p), '{"q": {"p": <Circular>}}');
    assert.strictEqual(R.toStringN(q), '{"p": {"q": <Circular>}}');

    var x = [];
    var y = {};
    x[0] = y;
    y.x = x;
    assert.strictEqual(R.toStringN(x), '[{"x": <Circular>}]');
    assert.strictEqual(R.toStringN(y), '{"x": [<Circular>]}');
  });

});
