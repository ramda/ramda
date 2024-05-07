var R = require('../source/index.js');
var eq = require('./shared/eq.js');

describe('descendNatural', function() {
  it('builds a descending natural comparator function out of the identity function', function() {
    eq(['3', '1', '10', 'Ørjan', 'Bob', 'Älva'].sort(R.descendNatural('en', R.identity)),
      ['Ørjan', 'Bob', 'Älva', '10', '3', '1']
    );
    eq(['3', '1', '10', 'Ørjan', 'Bob', 'Älva'].sort(R.descendNatural('fr', R.identity)),
      ['Ørjan', 'Bob', 'Älva', '10', '3', '1']
    );
    eq(['3', '1', '10', 'Ørjan', 'Bob', 'Älva'].sort(R.descendNatural('de', R.identity)),
      ['Ørjan', 'Bob', 'Älva', '10', '3', '1']
    );
    eq(['3', '1', '10', 'Ørjan', 'Bob', 'Älva'].sort(R.descendNatural('sv', R.identity)),
      ['Ørjan', 'Älva', 'Bob', '10', '3', '1']
    );
  });
});
