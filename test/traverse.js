var S = require('sanctuary');

var R = require('../source');
var Id = require('./shared/Id');
var eq = require('./shared/eq');


describe('traverse', function() {

  it('operates on a list of lists', function() {
    eq(R.traverse(R.of, R.map(R.add(10)), []), [[]]);
    eq(R.traverse(R.of, R.map(R.add(10)), [[], [1, 2, 3, 4]]), []);
    eq(R.traverse(R.of, R.map(R.add(10)), [[1], [2, 3, 4]]), [[11, 12], [11, 13], [11, 14]]);
    eq(R.traverse(R.of, R.map(R.add(10)), [[1, 2], [3, 4]]), [[11, 13], [11, 14], [12, 13], [12, 14]]);
    eq(R.traverse(R.of, R.map(R.add(10)), [[1, 2, 3], [4]]), [[11, 14], [12, 14], [13, 14]]);
    eq(R.traverse(R.of, R.map(R.add(10)), [[1, 2, 3, 4], []]), []);
  });

  it('operates on a list of applicatives', function() {
    eq(R.traverse(S.Maybe.of, R.map(R.add(10)), [S.Just(3), S.Just(4), S.Just(5)]), S.Just([13, 14, 15]));
    eq(R.traverse(S.Maybe.of, R.map(R.add(10)), [S.Just(3), S.Nothing(), S.Just(5)]), S.Nothing());
  });

  it('traverses left to right', function() {
    eq(R.traverse(S.Either.of, R.identity, [S.Right(1), S.Right(2)]), S.Right([1, 2]));
    eq(R.traverse(S.Either.of, R.identity, [S.Right(1), S.Left('XXX')]), S.Left('XXX'));
    eq(R.traverse(S.Either.of, R.identity, [S.Left('XXX'), S.Right(1)]), S.Left('XXX'));
    eq(R.traverse(S.Either.of, R.identity, [S.Left('XXX'), S.Left('YYY')]), S.Left('XXX'));
  });

  it('dispatches to `sequence` method', function() {
    eq(R.traverse(Id, R.map(R.negate), [Id(1), Id(2), Id(3)]), Id([-1, -2, -3]));
    eq(R.traverse(R.of, R.map(R.negate), Id([1, 2, 3])), [Id(-1), Id(-2), Id(-3)]);
  });

});
