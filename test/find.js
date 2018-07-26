var R = require('../source');
var eq = require('./shared/eq');
var listXf = require('./helpers/listXf');


describe('find', function() {
  var obj1 = {x: 100};
  var obj2 = {x: 200};
  var a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0];
  var even = function(x) { return x % 2 === 0; };
  var gt100 = function(x) { return x > 100; };
  var isStr = function(x) { return typeof x === 'string'; };
  var xGt100 = function(o) { return o && o.x > 100; };
  var intoArray = R.into([]);

  it('returns the first element that satisfies the predicate', function() {
    eq(R.find(even, a), 10);
    eq(R.find(gt100, a), 200);
    eq(R.find(isStr, a), 'cow');
    eq(R.find(xGt100, a), obj2);
  });

  it('transduces the first element that satisfies the predicate into an array', function() {
    eq(intoArray(R.find(even), a), [10]);
    eq(intoArray(R.find(gt100), a), [200]);
    eq(intoArray(R.find(isStr), a), ['cow']);
    eq(intoArray(R.find(xGt100), a), [obj2]);
  });

  it('returns `undefined` when no element satisfies the predicate', function() {
    eq(R.find(even, ['zing']), undefined);
  });

  it('returns `undefined` in array when no element satisfies the predicate into an array', function() {
    eq(intoArray(R.find(even), ['zing']), [undefined]);
  });

  it('returns `undefined` when given an empty list', function() {
    eq(R.find(even, []), undefined);
  });

  it('returns `undefined` into an array when given an empty list', function() {
    eq(intoArray(R.find(even), []), [undefined]);
  });

  it('dispatches to transformer objects', function() {
    eq(R.find(R.identity, listXf), {
      f: R.identity,
      found: false,
      xf: listXf
    });
  });
});
