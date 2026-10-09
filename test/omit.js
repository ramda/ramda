var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('omit', function() {
  var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

  it('copies an object omitting the listed properties', function() {
    eq(R.omit(['a', 'c', 'f'], obj), {b: 2, d: 4, e: 5});
  });

  it('supports hasOwnProperty as an omitted key', function() {
    eq(R.omit(['hasOwnProperty'], {hasOwnProperty: 1, keep: 2}), {keep: 2});
    eq(R.omit(['hasOwnProperty'], {keep: 2}), {keep: 2});
  });

  it('includes prototype properties', function() {
    var F = function(param) {this.x = param;};
    F.prototype.y = 40; F.prototype.z = 50;
    var obj = new F(30);
    obj.v = 10; obj.w = 20;
    eq(R.omit(['w', 'x', 'y'], obj), {v: 10, z: 50});
  });

});
