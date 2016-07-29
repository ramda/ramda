var R = require('..');
var eq = require('./shared/eq');


describe('invariants', function() {

  it('-- applying function f with length n (where n > 1) gives function with length n - 1', function() {
    var testPartialApplication = function(fn, name) {
      if (fn.length > 1) {
        var result = fn(null);
        eq(typeof result, 'function');
        eq(result.length, fn.length - 1);
        testPartialApplication(result, name + "'");
      }
    };

    for (var prop in R) {
      if (typeof R[prop] === 'function') {
        testPartialApplication(R[prop], prop);
      }
    }
  });

});
