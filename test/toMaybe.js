var R = require('..');
var eq = require('./shared/eq');


describe('toMaybe', function() {
  var isDefined = function(x) { return x !== void 0; }
  var safeHead = R.toMaybe(isDefined, R.head);
  var safeFind = R.toMaybe(isDefined, R.find);

  it('returns a function', function() {
    eq(typeof safeHead, 'function');
    eq(typeof safeFind, 'function');
  });

  it('returns a function with the same arity as the function it is wrapping', function() {
    eq(safeHead.length, 1);
    eq(safeFind.length, 2);
  });

  it('returns a function that returns a Just when the predicate is satisfied', function() {
    eq(safeHead([1, 2, 3]).isJust, true);
    eq(safeHead([1, 2, 3]), R.toMaybe.Just(1));
    eq(safeFind(R.equals(2), [1, 2, 3]).isJust, true);
    eq(safeFind(R.equals(2), [1, 2, 3]), R.toMaybe.Just(2));
  });

  it('returns a function that returns a Nothing when the predicate is not satisfied', function() {
    eq(safeHead([]).isNothing, true);
    eq(safeFind(R.equals(2), []).isNothing, true);
  });

  it('is curried', function() {
    eq(typeof R.toMaybe(isDefined), 'function');
    eq(typeof R.toMaybe(isDefined)(R.head), 'function');
    eq(R.toMaybe(isDefined)(R.head)([]).isNothing, true);
  });
});
