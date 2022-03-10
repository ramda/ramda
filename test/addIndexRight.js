var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('addIndexRight', function() {
  describe('unary functions like `map`', function() {
    var times2 = function(x) {return x * 2;};
    var addIndexParam = function(x, idx) {return x + idx;};
    var squareEnds = function(x, idx, list) {
      return (idx === 0 || idx === list.length - 1) ? x * x : x;
    };
    var revmap = function(fn, ary) { return R.map(fn, R.reverse(ary)); };
    var revmapIndexed = R.addIndexRight(revmap);

    it('works just like a normal (reversed) map', function() {
      eq(revmapIndexed(times2, [1, 2, 3, 4]), [8, 6, 4, 2]);
    });

    it('passes the index as a second parameter to the callback', function() {
      eq(revmapIndexed(addIndexParam, [8, 6, 7, 5, 3, 0, 9]), [15, 5, 7, 8, 9, 7, 8]); // [9 + 6, 0 + 5...]
    });

    it('passes the entire list as a third parameter to the callback', function() {
      eq(revmapIndexed(squareEnds, [8, 6, 7, 5, 3, 0, 9]), [81, 0, 3, 5, 7, 6, 64]);
    });

    it('acts as a curried function', function() {
      var makeSquareEnds = revmapIndexed(squareEnds);
      eq(makeSquareEnds([8, 6, 7, 5, 3, 0, 9]), [81, 0, 3, 5, 7, 6, 64]);
    });

  });

  describe('binary functions like `reduce`', function() {
    var reduceRightIndexed = R.addIndexRight(R.reduceRight);
    var timesIndexed = function(num, tot, idx) { return tot + (num * idx);};
    var objectify = function(elem, acc, idx) { acc[elem] = idx; return acc;};

    it('passes the index as a third parameter to the predicate', function() {
      eq(reduceRightIndexed(timesIndexed, 0, [1, 2, 3, 4, 5]), 40);
      eq(reduceRightIndexed(objectify, {}, ['a', 'b', 'c', 'd', 'e']), {a: 0, b: 1, c: 2, d: 3, e: 4});
    });

    it('passes the entire list as a fourth parameter to the predicate', function() {
      var list = [1, 2, 3];
      reduceRightIndexed(function(acc, x, idx, ls) {
        eq(ls, list);
        return acc;
      }, 0, list);
    });

  });

  describe('works with functions like `all` that do not typically have index applied', function() {
    var allIndexed = R.addIndexRight(R.all);
    var superDiagonal = allIndexed(R.gt);
    it('passes the index as a second parameter', function() {
      eq(superDiagonal([8, 6, 5, 4, 9]), true); // 8 > 0, 6 > 1, 5 > 2, 4 > 3, 9 > 5
      eq(superDiagonal([8, 6, 1, 3, 9]), false); //  1 !> 2, 3 !> 3
    });

  });

  describe('works with arbitrary user-defined functions', function() {
    var revmapFilter = function(m, f, list) {
      return R.filter(R.compose(f, m), R.reverse(list));
    };
    var revmapFilterIndexed = R.addIndexRight(revmapFilter);
    it('passes the index as an additional parameter', function() {
      eq(revmapFilterIndexed(
        R.multiply,
        R.gt(R.__, 13),
        [8, 6, 7, 5, 3, 0, 9]
      ), [9, 5, 7]); // 6 * 9 > 13, 3 * 5 > 13, 2 * 7 > 13
    });

  });

});
