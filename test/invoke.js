var assert = require('assert');

var R = require('..');


describe('invoke', function() {
  it('returns a function that applies the appropriate function to the supplied object', function() {
    var fred = {first: 'Fred', last: 'Flintstone', getName: function() {
      return this.first + ' ' + this.last;
    }};
    var barney = {first: 'Barney', last: 'Rubble', getName: function() {
      return this.first + ' ' + this.last;
    }};
    var gName = R.invoke('getName', []);
    assert.strictEqual(typeof gName, 'function');
    assert.strictEqual(gName(fred), 'Fred Flintstone');
    assert.strictEqual(gName(barney), 'Barney Rubble');
  });

  it('passes arguments appropriately when not curried', function() {
    assert.strictEqual(R.invoke('add', [3, 6], R), 9);
  });

  it('invokes the function with no arguments when no extra params are supplied', function() {
    var obj = {f: function() { return 'called f'; }};
    assert.strictEqual(R.invoke('f', [], obj), 'called f');
  });

  it('applies additional arguments to the function', function() {
    var Point = function(x, y) {
      this.x = x;
      this.y = y;
    };
    Point.prototype.moveBy = function(dx, dy) {
      this.x += dx;
      this.y += dy;
    };
    var p1 = new Point(10, 20);


    var moveBy = R.invoke('moveBy');
    moveBy([5, 7], p1);
    assert.strictEqual(p1.x, 15);
    assert.strictEqual(p1.y, 27);
  });
});
