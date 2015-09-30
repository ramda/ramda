var R = require('..');
var eq = require('./shared/eq');


var they = it;


var alice = {
  name: 'Alice Jones',
  address: ['22 Walnut St', 'San Francisco', 'CA']
};

var nameLens = R.lens(R.prop('name'), R.assoc('name'));
var addressLens = R.lensProp('address');
var headLens = R.lensIndex(0);


describe('view, over, and set', function() {

  they('may be applied to a lens created by `lensProp`', function() {
    eq(R.view(nameLens, alice), 'Alice Jones');

    eq(R.over(nameLens, R.toUpper, alice),
       {name: 'ALICE JONES',
        address: ['22 Walnut St', 'San Francisco', 'CA']});

    eq(R.set(nameLens, 'Alice Smith', alice),
       {name: 'Alice Smith',
        address: ['22 Walnut St', 'San Francisco', 'CA']});
  });

  they('may be applied to a lens created by `lensIndex`', function() {
    eq(R.view(headLens, alice.address), '22 Walnut St');

    eq(R.over(headLens, R.toUpper, alice.address),
       ['22 WALNUT ST', 'San Francisco', 'CA']);

    eq(R.set(headLens, '52 Crane Ave', alice.address),
       ['52 Crane Ave', 'San Francisco', 'CA']);
  });

  they('may be applied to composed lenses', function() {
    var streetLens = R.compose(addressLens, headLens);

    eq(R.view(streetLens, alice), '22 Walnut St');

    eq(R.over(streetLens, R.toUpper, alice),
       {name: 'Alice Jones',
        address: ['22 WALNUT ST', 'San Francisco', 'CA']});

    eq(R.set(streetLens, '52 Crane Ave', alice),
       {name: 'Alice Jones',
        address: ['52 Crane Ave', 'San Francisco', 'CA']});
  });

});
