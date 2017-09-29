var R = require('..');
var eq = require('./shared/eq.js');

describe('through', function() {
  var stubProp = function(n) {
    return function(o) {
      return o[n];
    };
  };

  it('returns null if no getters are specified', function() {
    eq(R.through([], {}), undefined);
  });

  it('returns null if no getters return', function() {
    eq(R.through([stubProp('foo'), stubProp('bar')], {}), undefined);
  });

  it('returns the value from the first getter that succeeds', function() {
    eq(R.through([stubProp('foo'),
                  stubProp('bar'),
                  stubProp('baz')], {bar: 1, baz: 2}), 1);
  });

  it('is curried', function() {
    var t = R.through([stubProp('foo')]);
    eq(t({foo: 1}), 1);
  });
});
