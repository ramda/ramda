var R = require('../source/index.js');
var eq = require('./shared/eq.js');

describe('invert', function() {

  it('takes a list or object and returns an object of lists', function() {
    eq(typeof R.invert([]), 'object');
    eq(typeof R.invert({}), 'object');

    var inverted = R.invert([0]);
    var keys = R.keys(inverted);
    eq(R.is(Array, inverted[keys.pop()]), true);
  });

  it('returns an empty object when applied to a primitive', function() {
    eq(R.invert(42), {});
    eq(R.invert('abc'), {});
  });

  it('returns an empty object when applied to null/undefined', function() {
    eq(R.invert(null), {});
    eq(R.invert(undefined), {});
  });

  it('returns the input\'s values as keys, and keys as values of an array', function() {
    eq(R.invert(['a', 'b', 'c']),       {a:['0'], b:['1'], c:['2']});
    eq(R.invert({x:'a', y:'b', z:'c'}), {a:['x'], b:['y'], c:['z']});
  });

  it('puts keys that have the same value into the appropriate an array', function() {
    eq(R.invert(['a', 'b', 'a']), {a:['0', '2'], b:['1']});

    var inverted = R.invert({x:'a', y:'b', z:'a', _id:'a'});
    eq(R.indexOf('x', inverted.a) >= 0, true);
    eq(R.indexOf('z', inverted.a) >= 0, true);
    eq(R.indexOf('_id', inverted.a) >= 0, true);
    eq(inverted.b, ['y']);
  });

  // this one is more of a sanity check
  it('is not destructive', function() {
    var input = {x:'a', y:'b', z:'a', _id:'a'};
    R.invert(input);
    eq(input, {x:'a', y:'b', z:'a', _id:'a'});
  });

  it('ignores inherited properties', function() {
    eq(R.invert({x: 'hasOwnProperty'}), {
      hasOwnProperty: ['x']
    });
  });

  it('preserves __proto__ as an own key and collects duplicates', function() {
    var input = {first: '__proto__', second: '__proto__'};
    var inverted = R.invert(input);
    eq(Object.prototype.hasOwnProperty.call(inverted, '__proto__'), true);
    eq(Object.getPrototypeOf(inverted), Object.prototype);
    eq(Object.getOwnPropertyDescriptor(inverted, '__proto__').value, ['first', 'second']);
    eq(Object.keys(inverted), ['__proto__']);
    eq(input, {first: '__proto__', second: '__proto__'});
  });

});
