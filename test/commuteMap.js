var S = require('sanctuary');

var Maybe = require('./shared/Maybe');
var R = require('..');
var eq = require('./shared/eq');


var as = [[1], [3, 4]];
var bs = [[1, 2], [3]];
var cs = [[1, 2], [3, 4]];


describe('commuteMap', function() {
  var plus10map = R.map(function(x) { return x + 10; });
  it('"pivots" a list (list of functors => functor of a list) and applies a transformation', function() {
    eq(R.commuteMap(plus10map, R.of, as), [[11, 13], [11, 14]]);
    eq(R.commuteMap(plus10map, R.of, bs), [[11, 13], [12, 13]]);
    eq(R.commuteMap(plus10map, R.of, cs), [[11, 13], [11, 14], [12, 13], [12, 14]]);
  });

  it('works on Algebraic Data Types such as "Maybe"', function() {
    eq(R.commuteMap(plus10map, Maybe, [Maybe(3), Maybe(4), Maybe(5)]), Maybe([13, 14, 15]));
  });

  it('traverses left to right', function() {
    eq(R.commuteMap(R.identity, S.Either.of, [S.Right(1), S.Right(2)]), S.Right([1, 2]));
    eq(R.commuteMap(R.identity, S.Either.of, [S.Right(1), S.Left('XXX')]), S.Left('XXX'));
    eq(R.commuteMap(R.identity, S.Either.of, [S.Left('XXX'), S.Right(1)]), S.Left('XXX'));
    eq(R.commuteMap(R.identity, S.Either.of, [S.Left('XXX'), S.Left('YYY')]), S.Left('XXX'));
  });

  it('is curried', function() {
    var cmtPlus10 = R.commuteMap(plus10map);
    eq(typeof cmtPlus10, 'function');

    var cmtmArr = cmtPlus10(R.of);
    eq(typeof cmtmArr, 'function');
    eq(cmtmArr(as), [[11, 13], [11, 14]]);
    eq(cmtmArr(bs), [[11, 13], [12, 13]]);
    eq(cmtmArr(cs), [[11, 13], [11, 14], [12, 13], [12, 14]]);
  });
});
