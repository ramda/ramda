var R = require('../source/index.js');
var eq = require('./shared/eq.js');

describe('ascendNatural', function() {
  it('builds an ascending natural comparator function out of the identity function', function() {
    eq(['3', '10', '1', '2', 'z', '5', 'a', '4'].sort(R.ascendNatural(R.identity)), ['1', '2', '3', '4', '5', '10', 'a', 'z']);
  });
});
