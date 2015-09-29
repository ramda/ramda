var R = require('..');
var eq = require('./shared/eq');


describe('isArrayLike', function() {
  it('is true for Arrays', function() {
    eq(R.isArrayLike([]), true);
    eq(R.isArrayLike([1, 2, 3, 4]), true);
    eq(R.isArrayLike([null]), true);
  });

  it('is true for arguments', function() {
    function test() {
      return R.isArrayLike(arguments);
    }
    eq(test(), true);
    eq(test(1, 2, 3), true);
    eq(test(null), true);
  });

  it('is false for Strings', function() {
    eq(R.isArrayLike(''), false);
    eq(R.isArrayLike('abcdefg'), false);
  });

  it('is true for arbitrary objects with numeric length, if extreme indices are defined', function() {
    var obj1 = {length: 0};
    var obj2 = {0: 'something', length: 0};
    var obj3 = {0: void 0, length: 0};
    var obj4 = {0: 'zero', 1: 'one', length: 2};
    var obj5 = {0: 'zero', length: 2};
    var obj6 = {1: 'one', length: 2};
    eq(R.isArrayLike(obj1), true);
    eq(R.isArrayLike(obj2), true);
    eq(R.isArrayLike(obj3), true);
    eq(R.isArrayLike(obj4), true);
    eq(R.isArrayLike(obj5), false);
    eq(R.isArrayLike(obj6), false);
  });

  it('is false for everything else', function() {
    eq(R.isArrayLike(undefined), false);
    eq(R.isArrayLike(1), false);
    eq(R.isArrayLike({}), false);
    eq(R.isArrayLike(false), false);
    eq(R.isArrayLike(function() {}), false);
  });
});
