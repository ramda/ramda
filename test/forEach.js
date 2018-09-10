var R = require('../source');
var eq = require('./shared/eq');


describe('forEach', function() {
  var list = [{x: 1, y: 2}, {x: 100, y: 200}, {x: 300, y: 400}, {x: 234, y: 345}];

  it('performs the passed in function on each element of the list', function() {
    var sideEffect = {};
    R.forEach(function(elem) { sideEffect[elem.x] = elem.y; }, list);
    eq(sideEffect, {1: 2, 100: 200, 300: 400, 234: 345});
  });

  it('returns the original list', function() {
    var s = '';
    eq(R.forEach(function(obj) { s += obj.x; }, list), list);
    eq('1100300234', s);
  });

  it('handles empty list', function() {
    eq(R.forEach(function(x) { return x * x; }, []), []);
  });

  it('dispatches to `forEach` method', function() {
    var dispatched = false;
    var fn = function() {};
    function DummyList() {}
    DummyList.prototype.forEach = function(callback) {
      dispatched = true;
      eq(callback, fn);
    };
    R.forEach(fn, new DummyList());
    eq(dispatched, true);
  });

});
