const { Right, Left, Either, Just, Nothing, Maybe } = require('sanctuary');
var Id = require('sanctuary-identity');

var R = require('../source/index.js');
var eq = require('./shared/eq.js');

var ofArray = R.of(Array);
var ofEither = R.of(Either);
var ofMaybe = R.of(Maybe);

describe('sequence', function() {

  it('operates on a list of lists', function() {
    eq(R.sequence(ofArray, []), [[]]);
    eq(R.sequence(ofArray, [[], [1, 2, 3, 4]]), []);
    eq(R.sequence(ofArray, [[1], [2, 3, 4]]), [[1, 2], [1, 3], [1, 4]]);
    eq(R.sequence(ofArray, [[1, 2], [3, 4]]), [[1, 3], [1, 4], [2, 3], [2, 4]]);
    eq(R.sequence(ofArray, [[1, 2, 3], [4]]), [[1, 4], [2, 4], [3, 4]]);
    eq(R.sequence(ofArray, [[1, 2, 3, 4], []]), []);
  });

  it('operates on a list of applicatives', function() {
    eq(R.sequence(ofMaybe, [Just(3), Just(4), Just(5)]), Just([3, 4, 5]));
    eq(R.sequence(ofMaybe, [Just(3), Nothing, Just(5)]), Nothing);
  });

  it('traverses left to right', function() {
    eq(R.sequence(ofEither, [Right(1), Right(2)]), Right([1, 2]));
    eq(R.sequence(ofEither, [Right(1), Left('XXX')]), Left('XXX'));
    eq(R.sequence(ofEither, [Left('XXX'), Right(1)]), Left('XXX'));
    eq(R.sequence(ofEither, [Left('XXX'), Left('YYY')]), Left('XXX'));
  });

  it('dispatches to `traverse` method', function() {
    eq(R.sequence(Id, [Id(1), Id(2), Id(3)]), Id([1, 2, 3]));
    eq(R.sequence(ofArray, Id([1, 2, 3])), [Id(1), Id(2), Id(3)]);
  });

  it('swaps types in a Maybe of Either', function() {
    eq(R.sequence(Either, Just(Right('foo'))), Right(Just('foo')));
    eq(R.sequence(Either, Just(Left('X'))), Left('X'));
    eq(R.sequence(Either, Nothing), Right(Nothing));
  });
});
