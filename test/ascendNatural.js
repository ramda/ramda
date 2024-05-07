var R = require('../source/index.js');
var eq = require('./shared/eq.js');

describe('ascendNatural', function() {
  it('builds an ascending natural comparator function out of the identity function', function() {
    eq(['3', '1', '10', 'Ørjan', 'Bob', 'Älva'].sort(R.ascendNatural('en', R.identity)),
      ['1', '3', '10', 'Älva', 'Bob', 'Ørjan']
    );
    eq(['3', '1', '10', 'Ørjan', 'Bob', 'Älva'].sort(R.ascendNatural('fr', R.identity)),
      ['1', '3', '10', 'Älva', 'Bob', 'Ørjan']
    );
    eq(['3', '1', '10', 'Ørjan', 'Bob', 'Älva'].sort(R.ascendNatural('de', R.identity)),
      ['1', '3', '10', 'Älva', 'Bob', 'Ørjan']
    );
    eq(['3', '1', '10', 'Ørjan', 'Bob', 'Älva'].sort(R.ascendNatural('sv', R.identity)),
      ['1', '3', '10', 'Bob', 'Älva', 'Ørjan']
    );
  });
});
