var R = require('..');
var eq = require('./shared/eq');


describe('path', function() {
  var deepObject = {a: {b: {c: 'c'}}, falseVal: false, nullVal: null, undefinedVal: undefined, arrayVal: ['arr']};
  it('takes a path and an object and returns the value at the path or undefined', function() {
    var obj = {
      a: {
        b: {
          c: 100,
          d: 200
        },
        e: {
          f: [100, 101, 102],
          g: 'G'
        },
        h: 'H'
      },
      i: 'I',
      j: ['J']
    };
    eq(R.path(['a', 'b', 'c'], obj), 100);
    eq(R.path([], obj), obj);
    eq(R.path(['a', 'e', 'f', 1], obj), 101);
    eq(R.path(['j', 0], obj), 'J');
    eq(R.path(['j', 1], obj), undefined);
  });

  it("gets a deep property's value from objects", function() {
    eq(R.path(['a', 'b', 'c'], deepObject), 'c');
    eq(R.path(['a'], deepObject), deepObject.a);
  });

  it('returns undefined for items not found', function() {
    eq(R.path(['a', 'b', 'foo'], deepObject), undefined);
    eq(R.path(['bar'], deepObject), undefined);
    eq(R.path(['a', 'b'], {a: null}), undefined);
  });

  it('works with falsy items', function() {
    eq(R.path(['toString'], false), Boolean.prototype.toString);
  });

});
