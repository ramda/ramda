var R = require('..');
var eq = require('./shared/eq');


describe('dissoc', function() {
  it('copies an object omitting the specified property', function() {
    eq(R.dissoc('b', {a: 1, b: 2, c: 3}), {a: 1, c: 3});
    eq(R.dissoc('d', {a: 1, b: 2, c: 3}), {a: 1, b: 2, c: 3});
  });

  it('includes prototype properties', function() {
    function Rectangle(width, height) {
      this.width = width;
      this.height = height;
    }
    var area = Rectangle.prototype.area = function() {
      return this.width * this.height;
    };
    var rect = new Rectangle(7, 6);

    eq(R.dissoc('area', rect), {width: 7, height: 6});
    eq(R.dissoc('width', rect), {height: 6, area: area});
    eq(R.dissoc('depth', rect), {width: 7, height: 6, area: area});
  });

  it('is curried', function() {
    eq(R.dissoc('b')({a: 1, b: 2, c: 3}), {a: 1, c: 3});
  });
});
