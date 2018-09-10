var S = require('sanctuary');

var R = require('../source');
var Id = require('./shared/Id');
var eq = require('./shared/eq');


describe('sequence', function() {

  it('operates on a list of lists', function() {
    eq(R.sequence(R.of, []), [[]]);
    eq(R.sequence(R.of, [[], [1, 2, 3, 4]]), []);
    eq(R.sequence(R.of, [[1], [2, 3, 4]]), [[1, 2], [1, 3], [1, 4]]);
    eq(R.sequence(R.of, [[1, 2], [3, 4]]), [[1, 3], [1, 4], [2, 3], [2, 4]]);
    eq(R.sequence(R.of, [[1, 2, 3], [4]]), [[1, 4], [2, 4], [3, 4]]);
    eq(R.sequence(R.of, [[1, 2, 3, 4], []]), []);
  });

  it('operates on a list of applicatives', function() {
    eq(R.sequence(S.Maybe.of, [S.Just(3), S.Just(4), S.Just(5)]), S.Just([3, 4, 5]));
    eq(R.sequence(S.Maybe.of, [S.Just(3), S.Nothing(), S.Just(5)]), S.Nothing());
  });

  it('traverses left to right', function() {
    eq(R.sequence(S.Either.of, [S.Right(1), S.Right(2)]), S.Right([1, 2]));
    eq(R.sequence(S.Either.of, [S.Right(1), S.Left('XXX')]), S.Left('XXX'));
    eq(R.sequence(S.Either.of, [S.Left('XXX'), S.Right(1)]), S.Left('XXX'));
    eq(R.sequence(S.Either.of, [S.Left('XXX'), S.Left('YYY')]), S.Left('XXX'));
  });

  it('dispatches to `sequence` method', function() {
    eq(R.sequence(Id, [Id(1), Id(2), Id(3)]), Id([1, 2, 3]));
    eq(R.sequence(R.of, Id([1, 2, 3])), [Id(1), Id(2), Id(3)]);
  });

});
