var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


var they = it;


var alice = {
  name: 'Alice Jones',
  address: ['22 Walnut St', 'San Francisco', 'CA'],
  pets: {dog: 'joker', cat: 'batman'}
};

var nameLens = R.lens(R.prop('name'), R.assoc('name'));
var addressLens = R.lensProp('address');
var headLens = R.lensIndex(0);
var dogLens = R.lensPath(['pets', 'dog']);


describe('view, over, and set', function() {

  they('may be applied to a lens created by `lensPath`', function() {
    eq(R.view(dogLens, alice), 'joker');
  });

  they('may be applied to a lens created by `lensProp`', function() {
    eq(R.view(nameLens, alice), 'Alice Jones');

    eq(R.over(nameLens, R.toUpper, alice), {
      name: 'ALICE JONES',
      address: ['22 Walnut St', 'San Francisco', 'CA'],
      pets: {dog: 'joker', cat: 'batman'}
    });

    eq(R.set(nameLens, 'Alice Smith', alice), {
      name: 'Alice Smith',
      address: ['22 Walnut St', 'San Francisco', 'CA'],
      pets: {dog: 'joker', cat: 'batman'}
    });
  });

  they('may be applied to a lens created by `lensIndex`', function() {
    eq(R.view(headLens, alice.address), '22 Walnut St');

    eq(R.over(headLens, R.toUpper, alice.address),
      ['22 WALNUT ST', 'San Francisco', 'CA']
    );

    eq(R.set(headLens, '52 Crane Ave', alice.address),
      ['52 Crane Ave', 'San Francisco', 'CA']
    );
  });

  they('may be applied to composed lenses', function() {
    var streetLens = R.compose(addressLens, headLens);
    var dogLens = R.compose(R.lensPath(['pets']), R.lensPath(['dog']));

    eq(R.view(dogLens, alice), R.view(R.lensPath(['pets', 'dog']), alice));

    eq(R.view(streetLens, alice), '22 Walnut St');

    eq(R.over(streetLens, R.toUpper, alice), {
      name: 'Alice Jones',
      address: ['22 WALNUT ST', 'San Francisco', 'CA'],
      pets: {dog: 'joker', cat: 'batman'}
    });

    eq(R.set(streetLens, '52 Crane Ave', alice), {
      name: 'Alice Jones',
      address: ['52 Crane Ave', 'San Francisco', 'CA'],
      pets: {dog: 'joker', cat: 'batman'}
    });
  });

  they('keep the prototype of source object', function() {
    class X {
      constructor(a) {
        this.a = a
      }
    }
    let a  = R.lensPath(["a"])
    let x0 = new X(2)
    let x1 = R.over(a, y => y + 5, x0)
    assert.strictEqual(x1.a, 7);
    assert.strictEqual(x1.__proto__, x0.__proto__);
    let x2 = R.set(a, 5, x1)
    assert.strictEqual(x2.a, 5);
    assert.strictEqual(x2.__proto__, x1.__proto__);
  })

});
