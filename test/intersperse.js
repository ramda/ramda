var R = require('../source');
var eq = require('./shared/eq');


describe('intersperse', function() {
  it('interposes a separator between list items', function() {
    eq(R.intersperse('n', ['ba', 'a', 'a']), ['ba', 'n', 'a', 'n', 'a']);
    eq(R.intersperse('bar', ['foo']), ['foo']);
    eq(R.intersperse('bar', []), []);
  });

  it('dispatches', function() {
    var obj = {intersperse: function(x) { return 'override ' + x; }};
    eq(R.intersperse('x', obj), 'override x');
  });

});
