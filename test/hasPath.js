var R = require('../source');
var eq = require('./shared/eq');


describe('hasPath', function() {
  var obj = {
    objVal: {b: {c: 'c'}},
    falseVal: false,
    nullVal: null,
    undefinedVal: undefined,
    arrayVal: ['arr']
  };

  it('returns true for existing path', function() {
    eq(R.hasPath(['objVal'], obj), true);
    eq(R.hasPath(['objVal', 'b'], obj), true);
    eq(R.hasPath(['objVal', 'b', 'c'], obj), true);
    eq(R.hasPath(['arrayVal'], obj), true);
  });

  it('returns true for existing path to falsy values', function() {
    eq(R.hasPath(['falseVal'], obj), true);
    eq(R.hasPath(['nullVal'], obj), true);
    eq(R.hasPath(['undefinedVal'], obj), true);
  });

  it('return false for a test for a child to a non-object', function() {
    eq(R.hasPath(['undefinedVal', 'child', 'grandchild'], obj), false);
    eq(R.hasPath(['falseVal', 'child', 'grandchild'], obj), false);
    eq(R.hasPath(['nullVal', 'child', 'grandchild'], obj), false);
    eq(R.hasPath(['arrayVal', 0, 'child', 'grandchild'], obj), false);
  });

  it('returns true for existing path with indexes', function() {
    eq(R.hasPath(['arrayVal', 0], obj), true);
  });

  it('returns false for non-existing path with indexes', function() {
    eq(R.hasPath(['arrayVal', 1], obj), false);
  });

  it('tests for paths in arrays', function() {
    eq(R.hasPath([0], [1, 2]), true);
    eq(R.hasPath([2], [1, 2]), false);

    eq(R.hasPath(['0'], [1, 2]), true);
    eq(R.hasPath(['2'], [1, 2]), false);
  });


  it('returns false for non-existent path', function() {
    eq(R.hasPath(['Unknown'], obj), false);
    eq(R.hasPath(['objVal', 'Unknown'], obj), false);
  });

  it('does not check properties from the prototype chain', function() {
    var Person = function() {};
    Person.prototype.age = {x: 1};
    var bob = new Person();

    eq(R.hasPath(['age'], bob), false);
    eq(R.hasPath(['age', 'x'], bob), false);
    eq(R.hasPath(['toString'], bob), false);
  });

  it('returns false for non-objects', function() {
    eq(R.hasPath([], obj), false);
  });

  it('tests paths on non-objects', function() {
    eq(R.hasPath(['a', 'b'], undefined), false);
    eq(R.hasPath(['a', 'b'], null), false);
    eq(R.hasPath('a', true), false);
    eq(R.hasPath('a', ''), false);
    eq(R.hasPath('a', /a/), false);
  });

  it('tests currying', function() {
    eq(R.hasPath(['a', 'b'])({ a: { b: 1 } }), true);
  });
});
