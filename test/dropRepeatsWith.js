var assert = require('assert');

var R = require('..');


describe('dropRepeatsWith', function() {
  var objs = [
    {i: 1}, {i: 2}, {i: 3}, {i: 4}, {i: 5}, {i: 3}
  ];
  var objs2 = [
    {i: 1}, {i: 1}, {i: 1}, {i: 2}, {i: 3},
    {i: 3}, {i: 4}, {i: 4}, {i: 5}, {i: 3},
  ];
  var eqI = R.eqProps('i');

  it('removes repeated elements based on predicate', function() {
    assert.deepEqual(R.dropRepeatsWith(eqI, objs2), objs);
    assert.deepEqual(R.dropRepeatsWith(eqI, objs), objs);
  });

  it('keeps elements from the left', function() {
    assert.deepEqual(
      R.dropRepeatsWith(eqI, [{i: 1, n: 1}, {i: 1, n: 2}, {i: 1, n: 3}, {i: 4, n: 1}, {i: 4, n: 2}]),
      [{i: 1, n: 1}, {i: 4, n: 1}]
    );
  });

  it('returns an empty array for an empty array', function() {
    assert.deepEqual(R.dropRepeatsWith(eqI, []), []);
  });

  it('is curried', function() {
    assert.strictEqual(typeof R.dropRepeatsWith(eqI), 'function');
    assert.deepEqual(R.dropRepeatsWith(eqI)(objs), objs);
    assert.deepEqual(R.dropRepeatsWith(eqI)(objs2), objs);
  });

  it('can act as a transducer', function() {
    assert.deepEqual(R.into([], R.dropRepeatsWith(eqI), objs2), objs);
  });
});
