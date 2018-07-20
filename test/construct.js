var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('construct', function() {
  var Rectangle = function(w, h) {this.width = w; this.height = h;};
  Rectangle.prototype.area = function() {return this.width * this.height;};

  it('turns a constructor function into one that can be called without `new`', function() {
    var rect = R.construct(Rectangle);
    var r1 = rect(3, 4);
    eq(r1.constructor, Rectangle);
    eq(r1.width, 3);
    eq(r1.area(), 12);

    var regex = R.construct(RegExp);
    var word = regex('word', 'gi');
    eq(word.constructor, RegExp);
    eq(word.source, 'word');
    eq(word.global, true);
  });

  it('can be used to create Date object', function() {
    var date = R.construct(Date)(1984, 3, 26, 0, 0, 0, 0);
    eq(date.constructor, Date);
    eq(date.getFullYear(), 1984);
  });

  it('supports constructors with no arguments', function() {
    function Foo() {}
    var foo = R.construct(Foo)();
    eq(foo.constructor, Foo);
  });

  it('does not support constructor with greater than ten arguments', function() {
    assert.throws(function() {
      function Foo($0, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) {
        this.eleventh = $10;
      }
      R.construct(Foo);
    }, function(err) {
      return (err instanceof Error &&
              err.message === 'Constructor with greater than ten arguments');
    });
  });

  it('returns a curried function', function() {
    var rect = R.construct(Rectangle);
    var rect3 = rect(3);
    var r1 = rect3(4);
    eq(r1.constructor, Rectangle);
    eq(r1.width, 3);
    eq(r1.height, 4);
    eq(r1.area(), 12);

    var regex = R.construct(RegExp);
    var word = regex('word');
    var complete = word('gi');
    eq(complete.constructor, RegExp);
    eq(complete.source, 'word');
    eq(complete.global, true);
  });

});
