var R = require('../source');
var eq = require('./shared/eq');


describe('dropLastWhile', function() {
  it('skips elements while the function reports `true`', function() {
    eq(R.dropLastWhile(function(x) {return x >= 5;}, [1, 3, 5, 7, 9]), [1, 3]);
  });

  it('returns an empty list for an empty list', function() {
    eq(R.dropLastWhile(function() { return false; }, []), []);
    eq(R.dropLastWhile(function() { return true; }, []), []);
  });

  it('starts at the right arg and acknowledges undefined', function() {
    var sublist = R.dropLastWhile(function(x) {return x !== void 0;}, [1, 3, void 0, 5, 7]);
    eq(sublist.length, 3);
    eq(sublist[0], 1);
    eq(sublist[1], 3);
    eq(sublist[2], void 0);
  });

  it('can operate on strings', function() {
    eq(R.dropLastWhile(function(x) { return x !== 'd'; }, 'Ramda'), 'Ramd');
  });

  it('can act as a transducer', function() {
    var dropLt7 = R.dropLastWhile(function(x) {return x < 7;});
    eq(R.into([], dropLt7, [1, 3, 5, 7, 9, 1, 2]), [1, 3, 5, 7, 9]);
    eq(R.into([], dropLt7, [1, 3, 5]), []);
  });

});
