var assert = require('assert');

var R = require('..');


describe('filterObj', function() {
  var even = function(x) { return x % 2 === 0; };
  var proceed = function(x) { return x.proceed; };

  it('reduces an object with simple values to those matching a filter', function() {
    assert.deepEqual(R.filterObj(even, {a:1, b:2, c:3, d:4, e:5}), {b:2, d:4});
  });

  it('reduces an object with object values to those matching a filter', function() {
    var obj = {1: {proceed: true}, 2: {proceed: true, name: 'solist'}, 3: {proceed: false}, 4: {proceed: true}};
    var reducedObj = R.filterObj(proceed, obj);
    assert.deepEqual(reducedObj, {1: {proceed: true}, 2: {proceed: true, name: 'solist'}, 4: {proceed: true}});
  });

  it('reduces an object with null and undefined values to those matching a filter', function() {
    assert.deepEqual(R.filterObj(proceed, {1: {proceed: null}, 2: {proceed: void 0}, 3: {proceed: false}, 4: {proceed: true}}),
      {4: {proceed: true}});
  });

  it('returns an empty object if no item matches', function() {
    assert.deepEqual(R.filterObj(function(x) { return x > 100; }, {a:1, b:9, c:99}), {});
  });

  it('returns an empty object if asked to filter an empty object', function() {
    assert.deepEqual(R.filterObj(function(x) { return x > 100; }, {}), {});
  });

  it('is curried', function() {
    var onlyEven = R.filterObj(even);
    assert.deepEqual(onlyEven({a:1, b:2, c:3, d:4, e:5}), {b:2, d:4});
  });
});
