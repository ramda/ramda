var {all, compose , difference , equals , head , identity , is , isEmpty , length , uniq , unnest , collectBy} = require('../source');
var fc = require('fast-check');
var {spy} = require('sinon');

describe('collectBy', function() {

  it('returns a list of lists', function() {
    fc.assert(fc.property(fc.array(fc.nat()), function(xs) {
      var check = all(is(Array));
      var ys = collectBy(identity)(xs);
      return check(ys);
    }));
  });

  it('groups items but neither adds new ones nor removes any', function() {
    fc.assert(fc.property(fc.array(fc.nat()), function(xs) {
      var check = compose(isEmpty, difference(xs), unnest);
      var ys = collectBy(identity)(xs);
      return check(ys);
    }));
  });

  it('groups related items together', function() {
    fc.assert(fc.property(fc.array(fc.boolean()), function(xs) {
      var ys = collectBy(identity)(xs);
      var check = all(compose(equals(1), length, uniq));
      return check(ys);
    }));
  });

  it('invokes the tag function for each item in the list', function() {
    fc.assert(fc.property(fc.array(fc.nat()), function(xs) {
      var id = spy(x => 42);
      collectBy(id)(xs);
      var check = compose(isEmpty, difference(xs));
      return check(id.getCalls().map(call => call.args[0]));
    }));
  });

  it('groups items according to the tag value', function() {
    fc.assert(fc.property(fc.array(fc.nat()), function(xs) {
      var ys = collectBy(x => 42)(xs);
      var check = compose(isEmpty, difference(xs), head);
      return isEmpty(xs) && isEmpty(ys) ? true : check(ys);
    }));
  });
});
