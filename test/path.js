var R = require('../source');
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

  it('takes a path that contains indices into arrays', function() {
    var obj = {
      a: [[{}], [{x: 'first'}, {x: 'second'}, {x: 'third'}, {x: 'last'}]]
    };
    eq(R.path(['a', 0, 0], obj), {});
    eq(R.path(['a', 0, 1], obj), undefined);
    eq(R.path(['a', 1, 0, 'x'], obj), 'first');
    eq(R.path(['a', 1, 1, 'x'], obj), 'second');
    eq(R.path([0], ['A']), 'A');
  });

  it('takes a path that contains negative indices into arrays', function() {
    eq(R.path(['x', -2], {x: ['a', 'b', 'c', 'd']}), 'c');
    eq(R.path([-1, 'y'], [{x: 1, y: 99}, {x: 2, y: 98}, {x: 3, y: 97}]), 97);
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
