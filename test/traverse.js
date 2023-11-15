const { Right, Left, Either, Maybe, Just, Nothing } = require('sanctuary');
var Id = require('sanctuary-identity');

var R = require('../source/index.js');
var eq = require('./shared/eq.js');

var ofArray = R.of(Array);
var ofEither = R.of(Either);
var ofMaybe = R.of(Maybe);


describe('traverse', function() {

  it('operates on a list of lists', function() {
    eq(R.traverse(ofArray, R.map(R.add(10)), []), [[]]);
    eq(R.traverse(ofArray, R.map(R.add(10)), [[], [1, 2, 3, 4]]), []);
    eq(R.traverse(ofArray, R.map(R.add(10)), [[1], [2, 3, 4]]), [[11, 12], [11, 13], [11, 14]]);
    eq(R.traverse(ofArray, R.map(R.add(10)), [[1, 2], [3, 4]]), [[11, 13], [11, 14], [12, 13], [12, 14]]);
    eq(R.traverse(ofArray, R.map(R.add(10)), [[1, 2, 3], [4]]), [[11, 14], [12, 14], [13, 14]]);
    eq(R.traverse(ofArray, R.map(R.add(10)), [[1, 2, 3, 4], []]), []);
  });

  it('operates on a list of applicatives', function() {
    eq(R.traverse(ofMaybe, R.map(R.add(10)), [Just(3), Just(4), Just(5)]), Just([13, 14, 15]));
    eq(R.traverse(ofMaybe, R.map(R.add(10)), [Just(3), Nothing, Just(5)]), Nothing);
  });

  it('operates on a list of FL-applicatives', function() {
    eq(R.traverse(Maybe, R.map(R.add(10)), [Just(3), Just(4), Just(5)]), Just([13, 14, 15]));
    eq(R.traverse(Maybe, R.map(R.add(10)), [Just(3), Nothing, Just(5)]), Nothing);
    eq(R.traverse(Id, R.map(R.add(10)), [Id(3), Id(4), Id(5)]), Id([13, 14, 15]));
  });

  it('traverses left to right', function() {
    eq(R.traverse(ofEither, R.identity, [Right(1), Right(2)]), Right([1, 2]));
    eq(R.traverse(ofEither, R.identity, [Right(1), Left('XXX')]), Left('XXX'));
    eq(R.traverse(ofEither, R.identity, [Left('XXX'), Right(1)]), Left('XXX'));
    eq(R.traverse(ofEither, R.identity, [Left('XXX'), Left('YYY')]), Left('XXX'));
  });

  it('dispatches to `traverse` method', function() {
    const mockTraversable = { traverse(_1, _2) { return 'traverse called'; } };

    eq(R.traverse(Id, R.identity, mockTraversable), 'traverse called');
  });

  it('dispatches to `fantasy-land/traverse` method', function() {
    const mockTraversable2 = {
      ['fantasy-land/traverse'](_1, _2) { return 'fantasy-land/traverse called'; }
    };
    eq(R.traverse(Id, R.identity, mockTraversable2), 'fantasy-land/traverse called');
  });

  it('dispatches to `fantasy-land/traverse` method when it and `traverse` exist', function() {
    const mockTraversable3 = {
      traverse(_1, _2) { return 'traverse called'; },
      ['fantasy-land/traverse'](_1, _2) { return 'fantasy-land/traverse called'; }
    };
    eq(R.traverse(Id, R.identity, mockTraversable3), 'fantasy-land/traverse called');
  });

  it('dispatches to `traverse` when it exists and `fantasy-land/traverse` is not a function', function() {
    const mockTraversable4 = {
      traverse(_1, _2) { return 'traverse called'; },
      'fantasy-land/traverse': new Error()
    };
    eq(R.traverse(Id, R.identity, mockTraversable4), 'traverse called');
  });

  it('operates on a FL-compliant Maybe of Either', function() {
    const safeToUpper = s => typeof s === 'string'
      ? Right(s.toUpperCase())
      : Left('no string given');

    eq(R.traverse(Either, safeToUpper, Just('foo')), Right(Just('FOO')));
    eq(R.traverse(Either, safeToUpper, Just(8)), Left('no string given'));
    eq(R.traverse(Either, safeToUpper, Nothing), Right(Nothing));
  });

  it('works for the example in the docs', function() {
    const safeDiv = n => d => d === 0 ? Nothing : Just(n / d);

    eq(R.traverse(Maybe, safeDiv(10), Right(4)), Just(Right(2.5)));
    eq(R.traverse(Maybe, safeDiv(10), Right(0)), Nothing);
    eq(R.traverse(Maybe, safeDiv(10), Left('X')), Just(Left('X')));
  });

});
