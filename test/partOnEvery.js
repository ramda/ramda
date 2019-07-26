var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('partOnEvery', function() {

  it('Partitions a collection into slices on every occurrence of a value', function() {
    eq(R.partOnEvery(2, [1, 2, 3 ,2, 4, 5, 2, 6, 7],true), [[1],[3],[4,5],[6,7]]);
    eq(R.partOnEvery(2, [1, 2, 3 ,2, 4, 5, 2, 6, 7]), [[1],[2,3],[2,4,5],[2,6,7]]);
    // eq(R.partOnEvery(2, [1, 2, 3, 4]), [[1, 2], [3, 4]]);
    // eq(R.partOnEvery(3, [1, 2, 3, 4]), [[1, 2, 3], [4]]);
    // eq(R.partOnEvery(4, [1, 2, 3, 4]), [[1, 2, 3, 4]]);
    // eq(R.partOnEvery(5, [1, 2, 3, 4]), [[1, 2, 3, 4]]);
    // eq(R.partOnEvery(3, []), []);
  });

//   it('throws if first argument is not positive', function() {
//     var test = function(err) {
//       return err.constructor === Error &&
//              err.message === 'First argument to partOnEvery must be a positive integer';
//     };
//     assert.throws(function() { R.partOnEvery(0, []); }, test);
//     assert.throws(function() { R.partOnEvery(0, ''); }, test);
//     assert.throws(function() { R.partOnEvery(-1, []); }, test);
//     assert.throws(function() { R.partOnEvery(-1, ''); }, test);
//   });

});
