var R = require('../source');
var eq = require('./shared/eq');
var listXf = require('./helpers/listXf');
var _curry2 = require('../source/internal/_curry2');


describe('tap', function() {
  var pushToList = _curry2(function(lst, x) { lst.push(x); });

  it('returns a function that always returns its argument', function() {
    var f = R.tap(R.identity);
    eq(typeof f, 'function');
    eq(f(100), 100);
    eq(f(undefined), undefined);
    eq(f(null), null);
  });

  it("may take a function as the first argument that executes with tap's argument", function() {
    var sideEffect = 0;
    eq(sideEffect, 0);
    var rv = R.tap(function(x) { sideEffect = 'string ' + x; }, 200);
    eq(rv, 200);
    eq(sideEffect, 'string 200');
  });

  it('can act as a transducer', function() {
    var sideEffect = [];
    var numbers = [1,2,3,4,5];

    var xf = R.compose(R.map(R.identity), R.tap(pushToList(sideEffect)));

    eq(R.into([], xf, numbers), numbers);
    eq(sideEffect, numbers);
  });

  it('dispatches to transformer objects', function() {
    var sideEffect = [];
    var pushToSideEffect = pushToList(sideEffect);

    eq(R.tap(pushToSideEffect, listXf), {
      f: pushToSideEffect,
      xf: listXf
    });
  });
});
