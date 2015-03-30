var assert = require('assert');

var R = require('..');


describe('differenceWith', function() {
  var Ro = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
  var Ro2 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 1}, {a: 2}, {a: 3}, {a: 4}];
  var So = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
  var So2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}, {a: 3}, {a: 4}, {a: 5}, {a: 6}];
  var eqA = function(r, s) { return r.a === s.a; };
  var eq = function(a, b) { return a === b; };

  it('combines two lists into the set of all their elements based on the passed-in equality predicate', function() {
    assert.deepEqual(R.differenceWith(eqA, Ro, So), [{a: 1}, {a: 2}]);
  });

  it('does not allow duplicates in the output even if the input lists had duplicates', function() {
    assert.deepEqual(R.differenceWith(eqA, Ro2, So2), [{a: 1}, {a: 2}]);
  });

  it('does not return a "sparse" array', function() {
    assert.strictEqual(R.differenceWith(eq, [1, 3, 2, 1, 3, 1, 2, 3], [3]).length, 2);
  });

});
