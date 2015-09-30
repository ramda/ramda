var R = require('..');
var eq = require('./shared/eq');


describe('mapAccum', function() {
  var add = function(a, b) {return [a + b, a + b];};
  var mult = function(a, b) {return [a * b, a * b];};
  var concat = function(a, b) {return [a.concat(b), a.concat(b)];};

  it('map and accumulate simple functions over arrays with the supplied accumulator', function() {
    eq(R.mapAccum(add, 0, [1, 2, 3, 4]), [10, [1, 3, 6, 10]]);
    eq(R.mapAccum(mult, 1, [1, 2, 3, 4]), [24, [1, 2, 6, 24]]);
  });

  it('returns the list and accumulator for an empty array', function() {
    eq(R.mapAccum(add, 0, []), [0, []]);
    eq(R.mapAccum(mult, 1, []), [1, []]);
    eq(R.mapAccum(concat, [], []), [[], []]);
  });

  it('is curried', function() {
    var addOrConcat = R.mapAccum(add);
    var sum = addOrConcat(0);
    var cat = addOrConcat('');
    eq(sum([1, 2, 3, 4]), [10, [1, 3, 6, 10]]);
    eq(cat(['1', '2', '3', '4']), ['1234', ['1', '12', '123', '1234']]);
  });

  it('correctly reports the arity of curried versions', function() {
    var sum = R.mapAccum(add, 0);
    eq(sum.length, 1);
  });
});
