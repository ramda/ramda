var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var isOdd = function(n) {return n % 2 == 1;};

describe('rebuild', function() {
  it('changes keys and values', function() {
    eq(
      R.rebuild(
        function(k, v) {return [[k.toUpperCase(), v * v]];},
        {a: 1, b: 2, c: 3}
      ),
      {A: 1, B: 4, C: 9}
    );
  });

  it('can skip particular entries', function() {
    eq(
      R.rebuild(
        function(k, v) {return isOdd(v) ? [[k.toUpperCase(), v * v]] : [];},
        {a: 1, b: 2, c: 3}
      ),
      {A: 1, C: 9}
    );
  });

  it('can include multiple entries for a single input', function() {
    eq(
      R.rebuild(
        function(k, v) {return isOdd(v) ? [[k.toUpperCase(), v * v]] : [[k + '1', v * v], [k + '2', v * v]];},
        {a: 1, b: 2, c: 3}
      ),
      {A: 1, b1: 4, b2: 4, C: 9}
    );
  });

});
