var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('max', function() {

  it('returns the larger of its two arguments', function() {
    eq(R.max(-7, 7), 7);
    eq(R.max(7, -7), 7);
  });

  it('works for any orderable type', function() {
    var d1 = new Date('2001-01-01');
    var d2 = new Date('2002-02-02');

    eq(R.max(d1, d2), d2);
    eq(R.max(d2, d1), d2);
    eq(R.max('a', 'b'), 'b');
    eq(R.max('b', 'a'), 'b');
  });

  it('returns the second argument if both arguments are equal according to the native JS strict equals operator', function() {
    eq(R.max(7, 7), 7);
    eq(R.max(undefined, undefined), undefined);
  });

  it('returns the alphabetically later type if neither argument is greater than the other', function() {
    eq(R.max('a', 7), 'a');
    eq(R.max('a', undefined), undefined);
  });

  it('returns the alphabetically later string coersion if no argument or type is greater than the other', function() {
    const obj1 = { a: 1 };
    const obj2 = { b: 1 };

    eq(R.max(obj1, obj2), obj2);
    eq(R.max(obj1, null), obj1);
  });

  it('returns the first argument if no other comparison attempts produce a result', function() {
    const obj1 = { a: 1 };

    eq(R.max(obj1, obj1), obj1);
    eq(R.max(NaN, NaN), NaN);
  });
});
