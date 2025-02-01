var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var {Just} = require('./shared/Maybe.js');


describe('filter', function() {
  var even = function(x) {return x % 2 === 0;};

  it('reduces an array to those matching a filter', function() {
    eq(R.filter(even, [1, 2, 3, 4, 5]), [2, 4]);
  });

  it('returns an empty array if no element matches', function() {
    eq(R.filter(function(x) { return x > 100; }, [1, 9, 99]), []);
  });

  it('returns an empty array if asked to filter an empty array', function() {
    eq(R.filter(function(x) { return x > 100; }, []), []);
  });

  it('filters objects', function() {
    var positive = function(x) { return x > 0; };
    eq(R.filter(positive, {}), {});
    eq(R.filter(positive, {x: 0, y: 0, z: 0}), {});
    eq(R.filter(positive, {x: 1, y: 0, z: 0}), {x: 1});
    eq(R.filter(positive, {x: 1, y: 2, z: 0}), {x: 1, y: 2});
    eq(R.filter(positive, {x: 1, y: 2, z: 3}), {x: 1, y: 2, z: 3});
  });

  it('filters ES6 maps', function() {
    var positive = function(x) { return x > 0; };
    eq(R.filter(positive, new Map()), new Map());
    eq(R.filter(positive, new Map([['x', 0], ['y', 0], ['z', 0]])), new Map());
    eq(R.filter(positive, new Map([['x', 1], ['y', 0], ['z', 0]])), new Map([['x', 1]]));
    eq(R.filter(positive, new Map([['x', 1], ['y', 2], ['z', 0]])), new Map([['x', 1], ['y', 2]]));
    eq(R.filter(positive, new Map([['x', 1], ['y', 2], ['z', 3]])), new Map([['x', 1], ['y', 2], ['z', 3]]));
  });


  it('dispatches to passed-in non-Array object with a `filter` method', function() {
    var f = {filter: function(f) { return f('called f.filter'); }};
    eq(R.filter(function(s) { return s; }, f), 'called f.filter');
  });

  it('correctly uses fantasy-land implementations', function() {
    var m1 = Just(-1);
    var m2 = R.filter(function(x) { return x > 0; } , m1);

    eq(m2.isNothing, true);
  });

  it('can act as a transducer', function() {
    var input = [1, 2, 3, 4];
    var expected = [2, 4];
    eq(R.into([], R.filter(even), input), expected);
    eq(R.transduce(R.filter(even), R.flip(R.append), [], input), expected);
  });

});
