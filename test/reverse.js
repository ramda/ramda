var R = require('../source');
var eq = require('./shared/eq');
var fc = require('fast-check');


describe('reverse', function() {

  it('reverses arrays', function() {
    eq(R.reverse([]), []);
    eq(R.reverse([1]), [1]);
    eq(R.reverse([1, 2]), [2, 1]);
    eq(R.reverse([1, 2, 3]), [3, 2, 1]);
  });

  it('reverses twice an array should be the array itself', function() {
    fc.assert(fc.property(fc.array(fc.anything()), function(array) {
      eq(R.reverse(R.reverse(array)), array);
    }));
  });

  it('reverses strings', function() {
    eq(R.reverse(''), '');
    eq(R.reverse('a'), 'a');
    eq(R.reverse('ab'), 'ba');
    eq(R.reverse('abc'), 'cba');
  });

  it('reverses twice a string should be the string itself', function() {
    fc.assert(fc.property(fc.fullUnicodeString(), function(str) {
      eq(R.reverse(R.reverse(str)), str);
    }));
  });

});
