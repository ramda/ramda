var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var listXf = require('./helpers/listXf.js');


describe('findIndex', function() {
  var obj1 = {x: 100};
  var obj2 = {x: 200};
  var a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0];
  var even = function(x) { return x % 2 === 0; };
  var gt100 = function(x) { return x > 100; };
  var isStr = function(x) { return typeof x === 'string'; };
  var xGt100 = function(o) { return o && o.x > 100; };

  it('returns the index of the first element that satisfies the predicate', function() {
    eq(R.findIndex(even, a), 1);
    eq(R.findIndex(gt100, a), 8);
    eq(R.findIndex(isStr, a), 3);
    eq(R.findIndex(xGt100, a), 10);
  });

  it('returns -1 when no element satisfies the predicate', function() {
    eq(R.findIndex(even, ['zing']), -1);
    eq(R.findIndex(even, []), -1);
  });

  it('dispatches to transformer objects', function() {
    eq(R.findIndex(R.identity, listXf), {
      f: R.identity,
      found: false,
      idx: -1,
      xf: listXf
    });
  });

  it('can act as a transducer', function() {
    eq(R.into([], R.findIndex(even), a), [1]);
    eq(R.transduce(R.findIndex(even), R.flip(R.append), [], a), [1]);
  });

});
