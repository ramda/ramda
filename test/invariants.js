var R = require('..');
var eq = require('./shared/eq');


describe('invariants', function() {

  //  toTest :: [String]
  var toTest = R.without(['match', 'test'], R.keys(R.filter(R.is(Function), R)));

  it('-- applying function f with length n (where n > 0) to no arguments gives function with length n', function() {
    toTest.forEach(function(name) {
      if (R[name].length > 0) {
        var result = R[name]();
        eq(typeof result, 'function');
        eq(result.length, R[name].length);
      }
    });
  });

  it('-- applying function f with length n (where n > 0) to R.__ gives function with length n', function() {
    toTest.forEach(function(name) {
      if (R[name].length > 0) {
        var result = R[name](R.__);
        eq(typeof result, 'function');
        eq(result.length, R[name].length);
      }
    });
  });

  it('-- applying function f with length n (where n > 1) to any value other than R.__ gives function with length n - 1', function() {
    var testPartialApplication = function testPartialApplication(fn, name) {
      if (fn.length > 1) {
        var result = fn(null);
        eq(typeof result, 'function');
        eq(result.length, fn.length - 1);
        testPartialApplication(result, name + "'");
      }
    };

    toTest.forEach(function(name) {
      testPartialApplication(R[name], name);
    });
  });

});
