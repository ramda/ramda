var assert = require('assert');

var R = require('..');


describe('filterObjIndexed', function() {
  var even = function(x) { return x % 2 === 0; };
  var proceed = function(x) { return x.proceed; };
  var isUpperCase = function(val, key) { return key.toUpperCase() === key; };

  it('reduces an object with equal to filterObj', function() {
    assert.deepEqual(R.filterObjIndexed(even, {a:1, b:2, c:3, d:4, e:5}),
      {b:2, d:4});
  });

  it('reduces an object with object keys and values matching a filter', function() {
    assert.deepEqual(R.filterObjIndexed(isUpperCase, {a: 1, B: 2, c: -1, D: 0, e: 5}),
      {B: 2, D: 0});
  });

  it('reduces an object with null and undefined values to those matching a filter', function() {
    assert.deepEqual(R.filterObjIndexed(proceed,
      {1: {proceed: null}, 2: {proceed: void 0}, 3: {proceed: false}, 4: {proceed: true}}),
      {4: {proceed: true}});
  });

  it('returns an empty object if no item matches', function() {
    assert.deepEqual(R.filterObjIndexed(function(v, k) { return v > 100 && R.contains(k, ['d', 'e']); },
    {a:1, b:9, c:99}), {});
  });

  it('third argument is correct object', function() {
    assert.deepEqual(R.filterObjIndexed(function(v, k, obj) { return obj[k] === v; },
      {a:1, b:2}),
      {a:1, b:2});
  });

  it('returns an empty object if asked to filter all', function() {
    assert.deepEqual(R.filterObjIndexed(function(v, k, obj) { return obj[k] !== v; },
      {a:1, b:2}),
      {});
  });

  it('is curried', function() {
    var onlyEven = R.filterObjIndexed(even);
    assert.deepEqual(onlyEven({a:1, b:2, c:3, d:4, e:5}), {b:2, d:4});
  });
});
