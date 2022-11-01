var assert = require('assert');

var R = require('../source/index.js');

describe('coerceString', function() {

  it('returns empty string when null', function() {
    assert.strictEqual(R.coerceString(null), '');
  });

  it('returns empty string when undefined', function() {
    assert.strictEqual(R.coerceString(undefined), '');
  });

  it('returns the string representation of a Boolean primitive', function() {
    assert.strictEqual(R.coerceString(true), 'true');
    assert.strictEqual(R.coerceString(false), 'false');
  });

  it('returns the string representation of a number primitive', function() {
    assert.strictEqual(R.coerceString(0), '0');
    assert.strictEqual(R.coerceString(-0), '-0');
    assert.strictEqual(R.coerceString(1.23), '1.23');
    assert.strictEqual(R.coerceString(-1.23), '-1.23');
    assert.strictEqual(R.coerceString(1e+23), '1e+23');
    assert.strictEqual(R.coerceString(-1e+23), '-1e+23');
    assert.strictEqual(R.coerceString(1e-23), '1e-23');
    assert.strictEqual(R.coerceString(-1e-23), '-1e-23');
    assert.strictEqual(R.coerceString(Infinity), 'Infinity');
    assert.strictEqual(R.coerceString(-Infinity), '-Infinity');
    assert.strictEqual(R.coerceString(NaN), 'NaN');
  });

  it('returns the string representation of a string primitive', function() {
    assert.strictEqual(R.coerceString('abc'), 'abc');
    assert.strictEqual(R.coerceString('x "y" z'), 'x "y" z');
    assert.strictEqual(R.coerceString("' '"), '\' \'');
    assert.strictEqual(R.coerceString('" "'), '\" \"');
    assert.strictEqual(R.coerceString('\b \b'), '\b \b');
    assert.strictEqual(R.coerceString('\f \f'), '\f \f');
    assert.strictEqual(R.coerceString('\n \n'), '\n \n');
    assert.strictEqual(R.coerceString('\r \r'), '\r \r');
    assert.strictEqual(R.coerceString('\t \t'), '\t \t');
    assert.strictEqual(R.coerceString('\v \v'), '\v \v');
    assert.strictEqual(R.coerceString('\0 \0'), '\0 \0');
    assert.strictEqual(R.coerceString('\\ \\'), '\\ \\');
  });

  it('returns the string value of a Boolean', function() {
    assert.strictEqual(R.coerceString(true), 'true');
    assert.strictEqual(R.coerceString(false), 'false');
  });


  it('returns the string value of a Number', function() {
    assert.strictEqual(R.coerceString(0), '0');
    assert.strictEqual(R.coerceString(-0), '-0');
  });

  it('returns the string representation of a object', function() {
    assert.strictEqual(R.coerceString({ foo: 1, bar: 2, baz: 3 }), '{"foo":1,"bar":2,"baz":3}');
  });


  it('returns the date string of a Date and empty string when Date is Invalid', function() {
    assert.strictEqual(R.coerceString(new Date('2001-02-03T04:05:06.000Z')), 'Fri Feb 02 2001');
    assert.strictEqual(R.coerceString(new Date('XXX')), '');
  });

  it('returns the string representation of a RegExp object', function() {
    assert.strictEqual(R.coerceString(/(?:)/), '/(?:)/');
    assert.strictEqual(R.coerceString(/\//g), '/\\//g');
  });

  it('returns the string representation of a function', function() {
    var add = function add(a, b) { return a + b; };
    assert.strictEqual(R.coerceString(add), add.toString());
  });

  it('returns the string value of an array', function() {
    assert.strictEqual(R.coerceString([]), '');
    assert.strictEqual(R.coerceString([1, 2, 3]), '1,2,3');
    assert.strictEqual(R.coerceString([1, [2, [3]]]), '1,2,3');
    assert.strictEqual(R.coerceString(['x', 'y']), 'x,y');
  });


  it('returns the string representation of a plain object', function() {
    assert.strictEqual(R.coerceString({}), '{}');
    assert.strictEqual(R.coerceString({foo: 1, bar: 2, baz: 3}), '{"foo":1,"bar":2,"baz":3}');
    assert.strictEqual(R.coerceString({'"quoted"': true}), '{"\\"quoted\\"":true}');
    assert.strictEqual(R.coerceString({a: {b: {c: {}}}}), '{"a":{"b":{"c":{}}}}');
  });
});
