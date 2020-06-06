var {all, compose , difference , equals , head , identity , is , isEmpty , length , uniq , unnest , collectBy} = require('../source');
var {property} = require('jsverify');
var {spy} = require('sinon');

describe('collectBy', function() {

  property('returns a list of lists', '[nat]', function(xs) {
    var check = all(is(Array));
    var ys = collectBy(identity)(xs);
    return check(ys);
  });

  property('groups items but neiter adds new ones nor removes any', '[nat]', function(xs) {
    var check = compose(isEmpty, difference(xs), unnest);
    var ys = collectBy(identity)(xs);
    return check(ys);
  });

  property('groups related items together', '[bool]', function(xs) {
    var ys = collectBy(identity)(xs);
    var check = all(compose(equals(1), length, uniq));
    return check(ys);
  });

  property('invokes the tag function for each item in the list', '[nat]', function(xs) {
    var id = spy(x => 42);
    collectBy(id)(xs);
    var check = compose(isEmpty, difference(xs));
    return check(id.getCalls().map(call => call.args[0]));
  });

  property('groups items according to the tag value', '[nat]', function(xs) {
    var ys = collectBy(x => 42)(xs);
    var check = compose(isEmpty, difference(xs), head);
    return isEmpty(xs) && isEmpty(ys) ? true : check(ys);
  });
});
