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

  it('returns true for existing path with indexes', function() {
    eq(R.hasPath(['arrayVal', 0], obj), true);
  });

  it('returns false for non-existing path with indexes', function() {
    eq(R.hasPath(['arrayVal', 1], obj), false);
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

  it('returns false for empty path', function() {
    eq(R.hasPath([], obj), false);
  });
});
