var assert = require('assert');
var R = require('..');

describe('K', function() {

  var gimmie5 = R.K(5);
  var flippedK = R.flip(R.K);

  it('takes two arguments and returns the first', function() {
    var result = R.K('a', 'b');
    assert.equal('a', result);
  });

  it('can take the arguments seperately', function() {
    var result = gimmie5(10);
    assert.equal(5, result);
  });

  it('can be flipped', function() {
    var result = flippedK('a', 5);
    assert.equal(5, result);
  });

  it('can be flipped and used partially', function() {
    var result = flippedK('a')(5);
    assert.equal(5, result);
  });

});
