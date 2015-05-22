var assert = require('assert');

var R = require('..');


describe('cond', function() {
  it('returns a function', function() {
    assert.strictEqual(typeof R.cond(), 'function');
  });

  it('returns a conditional function', function() {
    var fn = R.cond(
      [R.equals(0),   R.always('water freezes at 0°C')],
      [R.equals(100), R.always('water boils at 100°C')],
      [R.T,           function(temp) { return 'nothing special happens at ' + temp + '°C'; }]
    );
    assert.strictEqual(fn(0), 'water freezes at 0°C');
    assert.strictEqual(fn(50), 'nothing special happens at 50°C');
    assert.strictEqual(fn(100), 'water boils at 100°C');
  });

  it('returns a function which returns undefined if none of the predicates matches', function() {
    var fn = R.cond(
      [R.equals('foo'), R.always(1)],
      [R.equals('bar'), R.always(2)]
    );
    assert.strictEqual(fn('quux'), undefined);
  });

  it('predicates are tested in order', function() {
    var fn = R.cond(
      [R.T, R.always('foo')],
      [R.T, R.always('bar')],
      [R.T, R.always('baz')]
    );
    assert.strictEqual(fn(), 'foo');
  });

  it('forwards all arguments to predicates and to transformers', function() {
    var fn = R.cond(
      [function(_, x) { return x === 42; }, function() { return arguments.length; }]
    );
    assert.strictEqual(fn(21, 42, 84), 3);
  });
});
