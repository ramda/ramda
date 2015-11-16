var R = require('..');
var eq = require('./shared/eq');

var they = it;


var alice = {
  name: 'Alice Jones',
  address: ['22 Walnut St', 'San Francisco', 'CA']
};

var headLens = R.lensIndex(0);


describe('view, over, and set', function() {

  they('may be applied to a lens created by `lensIndex`', function() {
    eq(R.view(headLens, alice.address), '22 Walnut St');

    eq(R.over(headLens, R.toUpper, alice.address),
       ['22 WALNUT ST', 'San Francisco', 'CA']);

    eq(R.set(headLens, '52 Crane Ave', alice.address),
       ['52 Crane Ave', 'San Francisco', 'CA']);
  });

});
