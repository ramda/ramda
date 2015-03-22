var assert = require('assert');
var Maybe = require('./shared/Maybe');

var R = require('..');


var as = [[1], [3, 4]];
var bs = [[1, 2], [3]];
var cs = [[1, 2], [3, 4]];


describe('commuteMap', function() {
  var plus10map = R.map(function(x) { return x + 10; });
  it('"pivots" a list (list of functors => functor of a list) and applies a transformation', function() {
    assert.deepEqual(R.commuteMap(plus10map, R.of, as), [[11, 13], [11, 14]]);
    assert.deepEqual(R.commuteMap(plus10map, R.of, bs), [[11, 13], [12, 13]]);
    assert.deepEqual(R.commuteMap(plus10map, R.of, cs), [[11, 13], [12, 13], [11, 14], [12, 14]]);
  });

  it('works on Algebraic Data Types such as "Maybe"', function() {
    assert.deepEqual(R.commuteMap(plus10map, Maybe, [Maybe(3), Maybe(4), Maybe(5)]), Maybe([13, 14, 15]));
  });

  it('is curried', function() {
    var cmtPlus10 = R.commuteMap(plus10map);
    assert.strictEqual(typeof cmtPlus10, 'function');

    var cmtmArr = cmtPlus10(R.of);
    assert.strictEqual(typeof cmtmArr, 'function');
    assert.deepEqual(cmtmArr(as), [[11, 13], [11, 14]]);
    assert.deepEqual(cmtmArr(bs), [[11, 13], [12, 13]]);
    assert.deepEqual(cmtmArr(cs), [[11, 13], [12, 13], [11, 14], [12, 14]]);
  });
});
