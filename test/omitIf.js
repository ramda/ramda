var R = require('..');
var eq = require('./shared/eq');


describe('omitIf', function() {
  var obj = {a: 1, b: 2, c: 3, d: 4, e: 5};

  it('copies an object omitting the listed properties fulfilling a test', function() {
    eq(R.omitIf(R.lt(2), ['a', 'c', 'e'], obj), {a: 1, b: 2, d: 4});
  });

  it('is curried', function() {
    var skipGt2 = R.omitIf(R.lt(2));
    var skipACE = skipGt2(['a', 'c', 'e']);
    eq(skipACE(obj), {a: 1, b: 2, d: 4});
  });

});
