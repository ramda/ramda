var R = require('../source');
var eq = require('./shared/eq');


describe('splitWhenever', function() {
  it('Splits an array into slices on every occurrence of a value', function() {
    eq(R.splitWhenever(2,[1, 2, 3 ,2, 4, 5, 2, 6, 7]), [[1],[3],[4,5],[6,7]]);
    eq(R.splitWhenever(2,[1, 2, 1]), [[1], [1]]);
    eq(R.splitWhenever(1,[1, 2, 1]), [[2]]);
  });
});
describe('splitWhenever', function() {
  it('Splits an array into slices on every occurrence of a value,includes delimeter', function() {
    eq(R.splitWhenever(2,[1, 2, 3 ,2, 4, 5, 2, 6, 7],true), [[1],[2,3],[2,4,5],[2,6,7]]);
  });
});
