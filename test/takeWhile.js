var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


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

});
