var R = require('../source');
var eq = require('./shared/eq');
var assert = require('assert');


describe('identical', function() {
  var a = [];
  var b = a;
  it('has Object.is semantics', function() {
    eq(R.identical(100, 100), true);
    eq(R.identical(100, '100'), false);
    eq(R.identical('string', 'string'), true);
    eq(R.identical([], []), false);
    eq(R.identical(a, b), true);
    eq(R.identical(undefined, undefined), true);
    eq(R.identical(null, undefined), false);

    eq(R.identical(-0, 0), false);
    eq(R.identical(0, -0), false);
    eq(R.identical(NaN, NaN), true);

    eq(R.identical(NaN, 42), false);
    eq(R.identical(42, NaN), false);

    eq(R.identical(0, new Number(0)), false);
    eq(R.identical(new Number(0), 0), false);
    eq(R.identical(new Number(0), new Number(0)), false);
  });
  
  it('is auto-curried', function() {
    assert.strictEqual(R.identical.length, 2);
    var unaryFn = R.identical("foo");
    assert.strictEqual(unaryFn.length, 1);
    eq(unaryFn("bar"), false);
    eq(unaryFn("foo"), true);
    
    eq(R.identical()("foo")()("foo"), true);
  });
  
  it("does not access the placeholder property of it's arguments which is forbidden for cross-origin browser windows", function() {
    var forbiddenPropertyAccessObject = {};
    Object.defineProperty(
      forbiddenPropertyAccessObject, 
      '@@functional/placeholder', 
      { get: function(){ throw new Error("Not allowed!"); } }
    );
    
    assert.doesNotThrow(
      () => R.identical(forbiddenPropertyAccessObject, {}),
      Error
    );
    
    assert.doesNotThrow(
      () => R.identical({}, forbiddenPropertyAccessObject),
      Error
    );
    
    eq(R.identical(forbiddenPropertyAccessObject, forbiddenPropertyAccessObject), true);
    eq(R.identical(forbiddenPropertyAccessObject, {}), false);
  });

});
