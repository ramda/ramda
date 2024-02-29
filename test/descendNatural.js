var R = require('../source/index.js');
var eq = require('./shared/eq.js');

describe('descendNatural', function() {
  it('builds a descending natural comparator function out of the identity function', function() {
    eq(['3', '10', '1', '2', 'z', '5', 'a', '4'].sort(R.descendNatural(R.identity)), ['z', 'a', '10', '5', '4', '3', '2', '1']);
  });
});
