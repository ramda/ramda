var R = require('../source');
var eq = require('./shared/eq');


describe('props', function() {
  var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

  it('returns empty array if no properties requested', function() {
    eq(R.props([], obj), []);
  });

  it('returns values for requested properties', function() {
    eq(R.props(['a', 'e'], obj), [1, 5]);
  });

  it('preserves order', function() {
    eq(R.props(['f', 'c', 'e'], obj), [6, 3, 5]);
  });

  it('returns undefined for nonexistent properties', function() {
    var ps = R.props(['a', 'nonexistent'], obj);
    eq(ps.length, 2);
    eq(ps[0], 1);
    eq(ps[1], void 0);
  });

});
