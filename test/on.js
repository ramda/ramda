var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('on', function() {
  it('transforms and combines two values', function() {
    const containsInsensitive = R.on(R.includes, R.toLower);
    eq(containsInsensitive('o', 'FOO'), true);
  });
});
