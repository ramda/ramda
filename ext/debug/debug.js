var R = require('./ramda');

// Internal function to set the source attributes on a curried functions
// useful for debugging purposes
function setSource(curried, source) {
  curried.toString = function() {
    return source.toString();
  };
  curried.source = source;
  return curried;
}

var NO_ARGS_EXCEPTION = new TypeError('Function called with no arguments');

R.curry = function (fn, fnArity) {
  fnArity = typeof fnArity === "number" ? fnArity : fn.length;
  function recurry(args) {
    return setSource(R.arity(Math.max(fnArity - (args && args.length || 0), 0), function () {
      if (arguments.length === 0) { throw NO_ARGS_EXCEPTION; }
      var newArgs = concat(args, arguments);
      if (newArgs.length >= fnArity) {
        return fn.apply(this, newArgs);
      }
      else {
        return recurry(newArgs);
      }
    }), fn);
  }
  return recurry([]);
};

function curry2(fn) {
  return setSource(function(a, b) {
    switch (arguments.length) {
      case 0: throw NO_ARGS_EXCEPTION;
      case 1: return setSource(function(b) {
        return fn(a, b);
      }, fn);
    }
    return fn(a, b);
  }, fn);
}

function curry3(fn) {
  return setSource(function(a, b, c) {
    switch (arguments.length) {
      case 0: throw NO_ARGS_EXCEPTION;
      case 1: return curry2(function(b, c) {
        return fn(a, b, c);
      });
      case 2: return setSource(function(c) {
        return fn(a, b, c);
      });
    }
    return fn(a, b, c);
  }, fn);
}
