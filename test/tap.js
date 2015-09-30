var R = require('..');
var eq = require('./shared/eq');


describe('tap', function() {
  it('returns a function that always returns its argument', function() {
    var f = R.tap(R.identity);
    eq(typeof f, 'function');
    eq(f(100), 100);
  });

  it("may take a function as the first argument that executes with tap's argument", function() {
    var sideEffect = 0;
    eq(sideEffect, 0);
    var rv = R.tap(function(x) { sideEffect = 'string ' + x; }, 200);
    eq(rv, 200);
    eq(sideEffect, 'string 200');
  });

});
