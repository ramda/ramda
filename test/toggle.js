var R = require('..');
var eq = require('./shared/eq');

describe('toggle', function() {
  it('toggles a value to the other of two values', function() {
    eq(R.toggle("on", ["on", "off"]), "off");
    eq(R.toggle("inactive", ["active", "inactive"]), "active");
    eq(R.toggle(10, [10, 100]), 100);
  });
});
