var Either = require('sanctuary-either');
var Maybe = require('sanctuary-maybe');

var R = require('..');
var eq = require('./shared/eq');


describe('traverse', function() {

  it('operates on a list of lists', function() {
    eq(R.traverse(Array, R.map(R.add(10)), []), [[]]);
    eq(R.traverse(Array, R.map(R.add(10)), [[], [1, 2, 3, 4]]), []);
    eq(R.traverse(Array, R.map(R.add(10)), [[1], [2, 3, 4]]), [[11, 12], [11, 13], [11, 14]]);
    eq(R.traverse(Array, R.map(R.add(10)), [[1, 2], [3, 4]]), [[11, 13], [11, 14], [12, 13], [12, 14]]);
    eq(R.traverse(Array, R.map(R.add(10)), [[1, 2, 3], [4]]), [[11, 14], [12, 14], [13, 14]]);
    eq(R.traverse(Array, R.map(R.add(10)), [[1, 2, 3, 4], []]), []);
  });

  it('operates on a list of applicatives', function() {
    eq(R.traverse(Maybe, R.map(R.add(10)), [Maybe.Just(3), Maybe.Just(4), Maybe.Just(5)]), Maybe.Just([13, 14, 15]));
    eq(R.traverse(Maybe, R.map(R.add(10)), [Maybe.Just(3), Maybe.Nothing, Maybe.Just(5)]), Maybe.Nothing);
  });

  it('traverses left to right', function() {
    eq(R.traverse(Either, R.identity, [Either.Right(1), Either.Right(2)]), Either.Right([1, 2]));
    eq(R.traverse(Either, R.identity, [Either.Right(1), Either.Left('XXX')]), Either.Left('XXX'));
    eq(R.traverse(Either, R.identity, [Either.Left('XXX'), Either.Right(1)]), Either.Left('XXX'));
    eq(R.traverse(Either, R.identity, [Either.Left('XXX'), Either.Left('YYY')]), Either.Left('XXX'));
  });

});
