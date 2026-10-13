var eq = require('../shared/eq.js');
var _isArrayLike = require('../../source/internal/_isArrayLike.js');


describe('isArrayLike', function() {
  it('is true for Arrays', function() {
    eq(_isArrayLike([]), true);
    eq(_isArrayLike([1, 2, 3, 4]), true);
    eq(_isArrayLike([null]), true);
  });

  it('is true for arguments', function() {
    function test() {
      return _isArrayLike(arguments);
    }
    eq(test(), true);
    eq(test(1, 2, 3), true);
    eq(test(null), true);
  });

  it('is false for Strings', function() {
    eq(_isArrayLike(''), false);
    eq(_isArrayLike('abcdefg'), false);
  });

  it('is true for arbitrary objects with numeric length, if extreme indices are defined', function() {
    var obj1 = {length: 0};
    var obj2 = {0: 'something', length: 0};
    var obj3 = {0: void 0, length: 0};
    var obj4 = {0: 'zero', 1: 'one', length: 2};
    var obj5 = {0: 'zero', length: 2};
    var obj6 = {1: 'one', length: 2};
    eq(_isArrayLike(obj1), true);
    eq(_isArrayLike(obj2), true);
    eq(_isArrayLike(obj3), true);
    eq(_isArrayLike(obj4), true);
    eq(_isArrayLike(obj5), false);
    eq(_isArrayLike(obj6), false);
  });

  it('is false for everything else', function() {
    eq(_isArrayLike(undefined), false);
    eq(_isArrayLike(1), false);
    eq(_isArrayLike({}), false);
    eq(_isArrayLike(false), false);
    eq(_isArrayLike(function() {}), false);
  });

  it('handles objects without an inherited hasOwnProperty method', function() {
    var obj = Object.create(null);
    obj[0] = 'zero';
    obj[1] = 'one';
    obj.length = 2;
    eq(_isArrayLike(obj), true);
    eq(_isArrayLike({0: 'zero', 1: 'one', length: 2, hasOwnProperty: false}), true);
  });

  it('does not trust an overridden hasOwnProperty method', function() {
    eq(_isArrayLike({length: 2, hasOwnProperty: function() { return true; }}), false);
  });

  it('requires extreme indices to be own properties', function() {
    var obj = Object.create({0: 'zero', 1: 'one'});
    obj.length = 2;
    eq(_isArrayLike(obj), false);
  });

});
