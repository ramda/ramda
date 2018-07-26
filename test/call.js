var R = require('../source');
var eq = require('./shared/eq');


describe('call', function() {
  it('returns the result of calling its first argument with the remaining arguments', function() {
    eq(R.call(Math.max, 1, 2, 3, -99, 42, 6, 7), 42);
  });

  it('accepts one or more arguments', function() {
    var fn = function() { return arguments.length; };
    eq(R.call(fn), 0);
    eq(R.call(fn, 'x'), 1);
    eq(R.call(fn, 'x', 'y'), 2);
    eq(R.call(fn, 'x', 'y', 'z'), 3);
  });

  it('provides no way to specify context', function() {
    var obj = {method: function() { return this === obj; }};
    eq(R.call(obj.method), false);
    eq(R.call(R.bind(obj.method, obj)), true);
  });

});
