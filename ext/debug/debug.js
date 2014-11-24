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

R.curry = function(fn, length) {
    length = typeof length === 'number' ? length : fn.length;
    function recurry(args) {
        return setSource(R.arity(Math.max(length - (args && args.length || 0), 0), function() {
            if (arguments.length === 0) { throw NO_ARGS_EXCEPTION; }
            var newArgs = R.concat(args, arguments);
            if (newArgs.length >= length) {
                return fn.apply(this, newArgs);
            } else {
                return recurry(newArgs);
            }
        }), fn);
    }
    return recurry([]);
};
