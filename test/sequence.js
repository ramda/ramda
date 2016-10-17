var Either = require('sanctuary-either');
var Maybe = require('sanctuary-maybe');

var R = require('..');
var eq = require('./shared/eq');


describe('sequence', function() {

  it('operates on a list of lists', function() {
    eq(R.sequence(Array, []), [[]]);
    eq(R.sequence(Array, [[], [1, 2, 3, 4]]), []);
    eq(R.sequence(Array, [[1], [2, 3, 4]]), [[1, 2], [1, 3], [1, 4]]);
    eq(R.sequence(Array, [[1, 2], [3, 4]]), [[1, 3], [1, 4], [2, 3], [2, 4]]);
    eq(R.sequence(Array, [[1, 2, 3], [4]]), [[1, 4], [2, 4], [3, 4]]);
    eq(R.sequence(Array, [[1, 2, 3, 4], []]), []);
  });

  it('operates on a list of applicatives', function() {
    eq(R.sequence(Maybe, [Maybe.Just(3), Maybe.Just(4), Maybe.Just(5)]), Maybe.Just([3, 4, 5]));
    eq(R.sequence(Maybe, [Maybe.Just(3), Maybe.Nothing, Maybe.Just(5)]), Maybe.Nothing);
  });

  it('traverses left to right', function() {
    eq(R.sequence(Either, [Either.Right(1), Either.Right(2)]), Either.Right([1, 2]));
    eq(R.sequence(Either, [Either.Right(1), Either.Left('XXX')]), Either.Left('XXX'));
    eq(R.sequence(Either, [Either.Left('XXX'), Either.Right(1)]), Either.Left('XXX'));
    eq(R.sequence(Either, [Either.Left('XXX'), Either.Left('YYY')]), Either.Left('XXX'));
  });

});
