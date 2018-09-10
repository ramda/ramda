var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('constructN', function() {
  var Circle = function(r) {
    this.r = r;
    this.colors = Array.prototype.slice.call(arguments, 1);
  };
  Circle.prototype.area = function() {return Math.PI * Math.pow(this.r, 2);};

  it('turns a constructor function into a function with n arguments', function() {
    var circle = R.constructN(2, Circle);
    var c1 = circle(1, 'red');
    eq(c1.constructor, Circle);
    eq(c1.r, 1);
    eq(c1.area(), Math.PI);
    eq(c1.colors, ['red']);

    var regex = R.constructN(1, RegExp);
    var pattern = regex('[a-z]');
    eq(pattern.constructor, RegExp);
    eq(pattern.source, '[a-z]');
  });

  it('can be used to create Date object', function() {
    var date = R.constructN(3, Date)(1984, 3, 26);
    eq(date.constructor, Date);
    eq(date.getFullYear(), 1984);
  });

  it('supports constructors with no arguments', function() {
    function Foo() {}
    var foo = R.constructN(0, Foo)();
    eq(foo.constructor, Foo);
  });

  it('does not support constructor with greater than ten arguments', function() {
    assert.throws(function() {
      function Foo($0, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) {
        this.eleventh = $10;
      }
      R.constructN(11, Foo);
    }, function(err) {
      return (err instanceof Error &&
              err.message === 'Constructor with greater than ten arguments');
    });
  });

});
