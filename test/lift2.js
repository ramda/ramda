var R = require('..');

var eq = require('./shared/eq');


describe('lift2', function() {

  it('lifts a binary function', function() {
    eq(R.lift2(R.concat, ['A', 'B', 'C'], ['a', 'b', 'c']), ['Aa', 'Ab', 'Ac', 'Ba', 'Bb', 'Bc', 'Ca', 'Cb', 'Cc']);
  });

});
