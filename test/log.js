var R = require('..');
var eq = require('./shared/eq');


describe('log', function() {
  it('doesn\'t affect the return value', function() {
    eq(R.pipe(R.toUpper, R.log('value after toUpper'))('abc'), 'ABC');
  });

  it('doesn\'t affect the return value in more complex cases', function() {
    eq(R.pipe(R.log('Initial value'), R.toUpper, R.log('value after toUpper'), R.toLower, R.log('value after toLower'))('abc'), 'abc');
  });
});
