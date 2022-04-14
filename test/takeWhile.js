var assert = require('assert');

var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('takeWhile', function() {
  it('continues taking elements while the function reports `true`', function() {
    eq(R.takeWhile(function(x) {return x !== 5;}, [1, 3, 5, 7, 9]), [1, 3]);
  });

  it('starts at the right arg and acknowledges undefined', function() {
    eq(R.takeWhile(function() { assert(false); }, []), []);
    eq(R.takeWhile(function(x) {return x !== void 0;}, [1, 3, void 0, 5, 7]), [1, 3]);
  });

  it('can operate on strings', function() {
    eq(R.takeWhile(function(x) { return x !== 'd'; }, 'Ramda'), 'Ram');
  });

  it('can act as a transducer', function() {
    var isNotFour = x => x !== 4;
    var input = [1, 2, 3, 4, 3, 2, 1];
    var expected = [1, 2, 3];
    eq(R.into([], R.takeWhile(isNotFour), input), expected);
    eq(R.transduce(R.takeWhile(isNotFour), R.flip(R.append), [], input), expected);
  });

});
