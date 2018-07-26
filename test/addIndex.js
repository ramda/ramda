var R = require('../source');
var eq = require('./shared/eq');


describe('addIndex', function() {
  describe('unary functions like `map`', function() {
    var times2 = function(x) {return x * 2;};
    var addIndexParam = function(x, idx) {return x + idx;};
    var squareEnds = function(x, idx, list) {
      return (idx === 0 || idx === list.length - 1) ? x * x : x;
    };
    var mapIndexed = R.addIndex(R.map);

    it('works just like a normal map', function() {
      eq(mapIndexed(times2, [1, 2, 3, 4]), [2, 4, 6, 8]);
    });

    it('passes the index as a second parameter to the callback', function() {
      eq(mapIndexed(addIndexParam, [8, 6, 7, 5, 3, 0, 9]), [8, 7, 9, 8, 7, 5, 15]); // [8 + 0, 6 + 1...]
    });

    it('passes the entire list as a third parameter to the callback', function() {
      eq(mapIndexed(squareEnds, [8, 6, 7, 5, 3, 0, 9]), [64, 6, 7, 5, 3, 0, 81]);
    });

    it('acts as a curried function', function() {
      var makeSquareEnds = mapIndexed(squareEnds);
      eq(makeSquareEnds([8, 6, 7, 5, 3, 0, 9]), [64, 6, 7, 5, 3, 0, 81]);
    });

  });

  describe('binary functions like `reduce`', function() {
    var reduceIndexed = R.addIndex(R.reduce);
    var timesIndexed = function(tot, num, idx) {return tot + (num * idx);};
    var objectify = function(acc, elem, idx) { acc[elem] = idx; return acc;};

    it('passes the index as a third parameter to the predicate', function() {
      eq(reduceIndexed(timesIndexed, 0, [1, 2, 3, 4, 5]), 40);
      eq(reduceIndexed(objectify, {}, ['a', 'b', 'c', 'd', 'e']), {a: 0, b: 1, c: 2, d: 3, e: 4});
    });

    it('passes the entire list as a fourth parameter to the predicate', function() {
      var list = [1, 2, 3];
      reduceIndexed(function(acc, x, idx, ls) {
        eq(ls, list);
        return acc;
      }, 0, list);
    });

  });

  describe('works with functions like `all` that do not typically have index applied', function() {
    var allIndexed = R.addIndex(R.all);
    var superDiagonal = allIndexed(R.gt);
    it('passes the index as a second parameter', function() {
      eq(superDiagonal([8, 6, 5, 4, 9]), true); // 8 > 0, 6 > 1, 5 > 2, 4 > 3, 9 > 5
      eq(superDiagonal([8, 6, 1, 3, 9]), false); //  1 !> 2, 3 !> 3
    });

  });

  describe('works with arbitrary user-defined functions', function() {
    var mapFilter = function(m, f, list) {
      return R.filter(R.compose(f, m), list);
    };
    var mapFilterIndexed = R.addIndex(mapFilter);
    it('passes the index as an additional parameter', function() {
      eq(mapFilterIndexed(
        R.multiply,
        R.gt(R.__, 13),
        [8, 6, 7, 5, 3, 0, 9]
      ), [7, 5, 9]); // 2 * 7 > 13, 3 * 5 > 13, 6 * 9 > 13
    });

  });

});
