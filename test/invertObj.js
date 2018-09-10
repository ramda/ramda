var R = require('../source');
var eq = require('./shared/eq');

describe('invertObj', function() {

  it('takes a list or object and returns an object', function() {
    eq(typeof R.invertObj([]), 'object');
    eq(typeof R.invertObj({}), 'object');
  });

  it('returns an empty object when applied to a primitive', function() {
    eq(R.invertObj(42), {});
    eq(R.invertObj('abc'), {});
  });

  it('returns an empty object when applied to null/undefined', function() {
    eq(R.invertObj(null), {});
    eq(R.invertObj(undefined), {});
  });

  it('returns the input\'s values as keys, and keys as values', function() {
    eq(R.invertObj(['a', 'b', 'c']),       {a:'0', b:'1', c:'2'});
    eq(R.invertObj({x:'a', y:'b', z:'c'}), {a:'x', b:'y', c:'z'});
  });

  it('prefers the last key found when handling keys with the same value', function() {
    eq(R.invertObj(['a', 'b', 'a']), {a:'2', b:'1'});
    eq(R.invertObj({x:'a', y:'b', z:'a', _id:'a'}), {a: '_id', b: 'y'});
  });

  // this one is more of a sanity check
  it('is not destructive', function() {
    var input = {x:'a', y:'b', z:'a', _id:'a'};
    R.invertObj(input);
    eq(input, {x:'a', y:'b', z:'a', _id:'a'});
  });

});
