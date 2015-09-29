var R = require('..');
var eq = require('./shared/eq');


describe('evolve', function() {
  it('creates a new object by evolving the `object` according to the `transformation` functions', function() {
    var transf   = {elapsed: R.add(1), remaining: R.add(-1)};
    var object   = {name: 'Tomato', elapsed: 100, remaining: 1400};
    var expected = {name: 'Tomato', elapsed: 101, remaining: 1399};
    eq(R.evolve(transf, object), expected);
  });

  it('does not invoke function if object does not contain the key', function() {
    var transf   = {n: R.add(1), m: R.add(1)};
    var object   = {m: 3};
    var expected = {m: 4};
    eq(R.evolve(transf, object), expected);
  });

  it('is not destructive', function() {
    var transf   = {elapsed: R.add(1), remaining: R.add(-1)};
    var object   = {name: 'Tomato', elapsed: 100, remaining: 1400};
    var expected = {name: 'Tomato', elapsed: 100, remaining: 1400};
    R.evolve(transf, object);
    eq(object, expected);
  });

  it('is recursive', function() {
    var transf   = {nested: {second: R.add(-1), third: R.add(1)}};
    var object   = {first: 1, nested: {second: 2, third: 3}};
    var expected = {first: 1, nested: {second: 1, third: 4}};
    eq(R.evolve(transf, object), expected);
  });

  it('is curried', function() {
    var tick = R.evolve({elapsed: R.add(1), remaining: R.add(-1)});
    var object   = {name: 'Tomato', elapsed: 100, remaining: 1400};
    var expected = {name: 'Tomato', elapsed: 101, remaining: 1399};
    eq(tick(object), expected);
  });
});
