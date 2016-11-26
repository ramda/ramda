var R = require('..');
var eq = require('./shared/eq');


describe('reduceRight', function() {
  var avg = function(a, b) {return (a + b) / 2;};

  it('folds lists in the right order', function() {
    eq(R.reduceRight(function(a, b) {return a + b;}, '', ['a', 'b', 'c', 'd']), 'abcd');
  });

  it('folds subtract over arrays in the right order', function() {
    eq(R.reduceRight(function(a, b) {return a - b;}, 0, [1, 2, 3, 4]), -2);
  });

  it('folds simple functions over arrays with the supplied accumulator', function() {
    eq(R.reduceRight(avg, 54, [12, 4, 10, 6]), 12);
  });

  it('returns the accumulator for an empty array', function() {
    eq(R.reduceRight(avg, 0, []), 0);
  });

  it('is curried', function() {
    var something = R.reduceRight(avg, 54);
    var rcat = R.reduceRight(R.concat, '');
    eq(something([12, 4, 10, 6]), 12);
    eq(rcat(['1', '2', '3', '4']), '1234');
  });

  it('correctly reports the arity of curried versions', function() {
    var something = R.reduceRight(avg, 0);
    eq(something.length, 1);
  });

});
