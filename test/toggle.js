var R = require('..');
var eq = require('./shared/eq');

describe('toggle', function() {
  it('toggles a value to the other of two values', function() {
    eq(R.toggle(['on', 'off'], 'on'), 'off');
    eq(R.toggle(['active', 'inactive'], 'inactive'), 'active');
    eq(R.toggle([10, 100], 10), 100);
  });

  it('returns the given value if it matches neither of the provided two options', function() {
    eq(R.toggle(['on', 'off'], 'other'), 'other');
  });

  it('returns the given value if only one option is provided', function() {
    eq(R.toggle(['something'], 'given'), 'given');
  });

  it('uses first two options if more than two are provided', function() {
    eq(R.toggle(['on', 'off', 'neither'], 'on'), 'off');
    eq(R.toggle(['on', 'off', 'neither'], 'off'), 'on');
    eq(R.toggle(['on', 'off', 'neither'], 'neither'), 'neither');

    eq(R.toggle(['active', 'inactive', 'neither'], 'inactive'), 'active');
    eq(R.toggle(['active', 'inactive', 'neither'], 'active'), 'inactive');
    eq(R.toggle(['active', 'inactive', 'neither'], 'neither'), 'neither');

    eq(R.toggle([10, 100, 50], 10), 100);
    eq(R.toggle([10, 100, 50], 100), 10);
    eq(R.toggle([10, 100, 50], 50), 50);
  });
});
