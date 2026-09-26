var R = require('../source/index.js');
var eq = require('./shared/eq.js');


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
    var input = [1, 3, 5, 7, 9, 1, 2];
    var expected = [1, 3, 5, 7, 9];
    eq(R.into([], dropLt7, input), expected);
    eq(R.transduce(dropLt7, R.flip(R.append), [], input), expected);
  });

  it('stops when a downstream transducer finishes within the retained items', function() {
    var seen = [];
    var transducer = R.compose(
      R.dropLastWhile(function(x) { seen.push(x); return x > 2; }),
      R.take(1)
    );
    eq(R.into([], transducer, [3, 4, 1, 2]), [3]);
    eq(seen, [3, 4, 1]);
  });

  it('stops when a downstream transducer finishes on the last retained item', function() {
    var transducer = R.compose(R.dropLastWhile(function(x) { return x > 2; }), R.take(2));
    eq(R.into([], transducer, [3, 4, 1, 2]), [3, 4]);
  });

  it('preserves downstream state between retained groups', function() {
    var transducer = R.compose(R.dropLastWhile(function(x) { return x > 2; }), R.dropLast(1));
    eq(R.into([], transducer, [3, 4, 1, 5, 2, 6]), [3, 4, 1, 5]);
  });

  it('completes a downstream transformer only once', function() {
    var completions = 0;
    var transformer = {
      '@@transducer/init': function() { return []; },
      '@@transducer/step': function(acc, x) { return acc.concat([x]); },
      '@@transducer/result': function(acc) { completions += 1; return acc.join(','); }
    };
    eq(R.into(transformer, R.dropLastWhile(function(x) { return x > 2; }), [1, 3, 2, 4]), '1,3,2');
    eq(completions, 1);
  });

  it('supports a primitive accumulator when flushing retained items', function() {
    eq(R.transduce(R.dropLastWhile(function(x) { return x > 2; }), R.add, 0, [3, 4, 1, 5, 2, 6]), 15);
  });

});
