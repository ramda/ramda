var Maybe = require('./shared/Maybe');

var R = require('..');
var eq = require('./shared/eq');


var as = [[1], [3, 4]];
var bs = [[1, 2], [3]];
var cs = [[1, 2], [3, 4]];


describe('commute', function() {
  it('"pivots" a list (list of functors => functor of a list)', function() {
    eq(R.commute(R.of, as), [[1, 3], [1, 4]]);
    eq(R.commute(R.of, bs), [[1, 3], [2, 3]]);
    eq(R.commute(R.of, cs), [[1, 3], [2, 3], [1, 4], [2, 4]]);
  });

  it('works on Algebraic Data Types such as "Maybe"', function() {
    eq(R.commute(Maybe.of, [Maybe(3), Maybe(4), Maybe(5)]), Maybe([3, 4, 5]));
  });

  it('is curried', function() {
    var cmtArr = R.commute(R.of);
    eq(typeof cmtArr, 'function');
    eq(cmtArr(as), [[1, 3], [1, 4]]);
    eq(cmtArr(bs), [[1, 3], [2, 3]]);
    eq(cmtArr(cs), [[1, 3], [2, 3], [1, 4], [2, 4]]);

  });
});
