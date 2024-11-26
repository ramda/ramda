var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('renameKeys', function() {

  it('converts found keys to new ones', function() {
    eq(
      R.renameKeys(
        {a: 'alpha', b: 'bravo', c: 'charlie'},
        {a: 1, b: 2, c: 3}
      ),
      {alpha: 1, bravo: 2, charlie: 3}
    );
  });

  it('ignores keys not found in the mapping', function() {
    eq(
      R.renameKeys(
        {a: 'alpha', b: 'bravo', c: 'charlie', d: 'delta'},
        {a: 1, b: 2, c: 3, foo: 4}
      ),
      {alpha: 1, bravo: 2, charlie: 3, foo: 4}
    );
  });

});
