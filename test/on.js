var R = require('../source');
var eq = require('./shared/eq');


describe('on', function() {
  it('transforms and combines two values', function() {
    const containsInsensitive = R.on(R.includes, R.toLower);
    eq(containsInsensitive('o', 'FOO'), true);
  });
});
