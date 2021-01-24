var R = require('../source');
var eq = require('./shared/eq');


describe('modify', function() {
  it('creates a new object by applying the `transformation` function to the given `property` of the `object`', function() {
    var object   = {name: 'Tomato', elapsed: 100, remaining: 1400};
    var expected = {name: 'Tomato', elapsed: 101, remaining: 1400};
    eq(R.modify('elapsed', R.add(1), object), expected);
  });

  it('returns the original object if object does not contain the property', function() {
    var object   = {name: 'Tomato', elapsed: 100, remaining: 1400};
    eq(R.modify('nonexistent', R.add(1), object), object);
  });

  it('is not destructive', function() {
    var object   = {name: 'Tomato', elapsed: 100, remaining: 1400};
    var expected = {name: 'Tomato', elapsed: 100, remaining: 1400};
    R.modify('elapsed', R.add(1), object);
    eq(object, expected);
  });

  it('ignores primitive value transformations', function() {
    var object   = {n: 0, m: 1};
    var expected = {n: 0, m: 1};
    eq(R.modify('elapsed', 2, object), expected);
  });

  it('ignores null transformations', function() {
    var object   = {n: 0};
    var expected = {n: 0};
    eq(R.modify('elapsed', null, object), expected);
  });

  it('adjust if `array` at the given key with the `transformation` function', function() {
    var object   = [100, 1400];
    var expected = [100, 1401];
    eq(R.modify(1, R.add(1), object), expected);
  });

  it('ignores transformations if the input value is not Array and Object', function() {
    eq(R.modify('a', R.add(1), 42), 42);
    eq(R.modify('a', R.add(1), undefined), undefined);
    eq(R.modify('a', R.add(1), null), null);
    eq(R.modify('a', R.add(1), ''), '');
  });

  // TODO: check reference equality?
});
