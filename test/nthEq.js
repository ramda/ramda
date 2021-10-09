var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('nthEq', function() {
  var list1 = ['apple', 'oranges', 'pears'];
  var list2 = ['books', 'pens', 'rulers'];

  it('determines whether a particular offset matches a given value for a specific list', function() {
    eq(R.nthEq(0, 'apples', list1), true);
    eq(R.nthEq(1, 'oranges', list1), true);
    eq(R.nthEq(1, 'paper', list2), false);
  });

  // it('has R.equals semantics', function() {
  //   function Just(x) { this.value = x; }
  //   Just.prototype.equals = function(x) {
  //     return x instanceof Just && R.equals(x.value, this.value);
  //   };

  //   eq(R.propEq('value', 0, {value: -0}), false);
  //   eq(R.propEq('value', -0, {value: 0}), false);
  //   eq(R.propEq('value', NaN, {value: NaN}), true);
  //   eq(R.propEq('value', new Just([42]), {value: new Just([42])}), true);
  // });

  it('it has the same behavior as nth for null or undefined', function() {
    assert.throws(function() { R.nthEq(0, '', null); }, TypeError);
    assert.throws(function() { R.nthEq(0, '', undefined); }, TypeError);
  });

});
