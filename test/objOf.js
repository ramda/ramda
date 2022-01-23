var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('objOf', function() {

  it('creates an object containing a single key:value pair', function() {
    eq(R.objOf('foo', 42), {foo: 42});
    eq(R.objOf('foo')(42), {foo: 42});
  });

});
