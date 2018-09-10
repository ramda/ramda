var R = require('../source');
var eq = require('./shared/eq');


describe('reduced', function() {
  it('wraps a value', function() {
    // white box test.
    var v = {};
    eq(R.reduced(v)['@@transducer/value'], v);
  });

  it('flags value as reduced', function() {
    // white box test.
    eq(R.reduced({})['@@transducer/reduced'], true);
  });

  it('short-circuits reduce', function() {
    // black box test.
    eq(
      R.reduce(
        function(acc, v) {
          var result = acc + v;
          if (result >= 10) {result = R.reduced(result);}
          return result;
        },
        0,
        [1, 2, 3, 4, 5]),
      10);
  });

});
