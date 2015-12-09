var R = require('..');
var eq = require('./shared/eq');


describe('reverse', function() {

  it('reverses arrays', function() {
    eq(R.reverse([]), []);
    eq(R.reverse([1]), [1]);
    eq(R.reverse([1, 2]), [2, 1]);
    eq(R.reverse([1, 2, 3]), [3, 2, 1]);
  });

  it('reverses strings', function() {
    eq(R.reverse(''), '');
    eq(R.reverse('a'), 'a');
    eq(R.reverse('ab'), 'ba');
    eq(R.reverse('abc'), 'cba');
  });

  it('can reverse generator based list', function() {
    const nums = R.xrange(1, 1, 5);
    eq(R.take(Infinity, R.reverse(nums)), [4, 3, 2, 1]);
  });

});
