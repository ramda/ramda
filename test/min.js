var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('min', function() {

  it('returns the smaller of its two arguments', function() {
    eq(R.min(-7, 7), -7);
    eq(R.min(7, -7), -7);
  });

  it('works for any orderable type', function() {
    var d1 = new Date('2001-01-01');
    var d2 = new Date('2002-02-02');

    eq(R.min(d1, d2), d1);
    eq(R.min(d2, d1), d1);
    eq(R.min('a', 'b'), 'a');
    eq(R.min('b', 'a'), 'a');
  });

  it('returns the first argument if both arguments are equal according to the native JS strict equals operator', function() {
    eq(R.min(7, 7), 7);
    eq(R.min(undefined, undefined), undefined);
  });

  it('returns the alphabetically earlier type if neither argument is smaller than the other', function() {
    eq(R.min('a', 7), 7);
    eq(R.min('a', undefined), 'a');
  });

  it('returns the alphabetically earlier string coersion if no argument or type is smaller than the other', function() {
    const obj1 = { a: 1 };
    const obj2 = { b: 1 };

    eq(R.min(obj1, obj2), obj1);
    eq(R.min(obj1, null), null);
  });

  it('returns the first argument if no other comparison attempts produce a result', function() {
    const obj1 = { a: 1 };

    eq(R.min(obj1, obj1), obj1);
    eq(R.min(NaN, NaN), NaN);
  });
});
