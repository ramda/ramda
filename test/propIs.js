var R = require('../source');
var eq = require('./shared/eq');


describe('propIs', function() {

  it('returns true if the specified object property is of the given type', function() {
    eq(R.propIs(Number, 'value', {value: 1}), true);
  });

  it('returns false otherwise', function() {
    eq(R.propIs(String, 'value', {value: 1}), false);
    eq(R.propIs(String, 'value', {}), false);
  });

  it('handles number as property', function() {
    var deities = ['Cthulhu', 'Dagon', 'Yog-Sothoth'];
    eq(R.propIs(String, 0, deities), true);
    eq(R.propIs(String, 1, deities), true);
    eq(R.propIs(String, 2, deities), true);
    eq(R.propIs(String, -1, deities), true);
    eq(R.propIs(String, 3, deities), false);
  });

});
