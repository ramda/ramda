var R = require('..');
var eq = require('./shared/eq');


describe('scan', function() {
  var add = function(a, b) {return a + b;};
  var mult = function(a, b) {return a * b;};

  it('scans simple functions over arrays with the supplied accumulator', function() {
    eq(R.scan(add, 0, [1, 2, 3, 4]), [0, 1, 3, 6, 10]);
    eq(R.scan(mult, 1, [1, 2, 3, 4]), [1, 1, 2, 6, 24]);
  });

  it('returns the accumulator for an empty array', function() {
    eq(R.scan(add, 0, []), [0]);
    eq(R.scan(mult, 1, []), [1]);
  });

  it('is curried', function() {
    var addOrConcat = R.scan(add);
    var sum = addOrConcat(0);
    var cat = addOrConcat('');
    eq(sum([1, 2, 3, 4]), [0, 1, 3, 6, 10]);
    eq(cat(['1', '2', '3', '4']), ['', '1', '12', '123', '1234']);
  });

  it('correctly reports the arity of curried versions', function() {
    var sum = R.scan(add, 0);
    eq(sum.length, 1);
  });

  it('dispatches to objects that implement `scan`', function() {
    var obj = {x: 100, scan: function(f, acc) { return f(acc, this.x); }};
    eq(R.scan(add, 1, obj), 101);
  });

  it('composes with other transformers', function() {
    var add1 = function(a) {return a + 1;};
    var trans = R.compose(
      R.scan(add, 1),
      R.map(add1)
    );
    eq(trans([1]), [3]);
    eq(R.transduce(trans, R.flip(R.append), [], [1]), [3]);
  });

});
