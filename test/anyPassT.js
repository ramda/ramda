var R = require('..');
var eq = require('./shared/eq');
var Task = require('data.task');

describe('anyPassT', function() {

  var successResult = { score: 1200 };
  var failureResult = { score: 500 };
  var highScore = function(result) { return result.score >= 1000; };

  it('executes until successful result', function() {

    var doSomethingA = function(_) {
      return new Task(function(reject, resolve) { resolve(failureResult); });
    };

    var doSomethingB = function(_) {
      return new Task(function(reject, resolve) { resolve(successResult); });
    };

    R.anyPassT([doSomethingA, doSomethingB], highScore, 'test')
      .fork(function(error) {
        throw error;
      }, function(result) {
        eq(result, successResult);
      });
  });

  it('executes only up to first successful result', function() {

    var doSomethingA = function(_) {
      return new Task(function(reject, resolve) { resolve(successResult); });
    };

    var doSomethingB = function(_) {
      throw new Error('It shouldnt get here!');
    };

    R.anyPassT([doSomethingA, doSomethingB], highScore, 'test')
      .fork(function(error) {
        throw error;
      }, function(result) {
        eq(result, successResult);
      });
  });

  it('returns Task.of(false) when unable to find successful resolution', function() {

    var doSomethingA = function(_) {
      return new Task(function(reject, resolve) { resolve(failureResult); });
    };

    var doSomethingB = function(_) {
      return new Task(function(reject, resolve) { resolve(failureResult); });
    };

    R.anyPassT([doSomethingA, doSomethingB], highScore, 'test')
      .fork(function(error) {
        throw error;
      }, function(result) {
        eq(result, false);
      });
  });

});
