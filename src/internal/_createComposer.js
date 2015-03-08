var arity = require('../arity');


/*
 * Returns a function that makes a multi-argument version of compose from
 * either _compose or _composeP.
 */
module.exports = function _createComposer(composeFunction) {
    return function() {
        var fn = arguments[arguments.length - 1];
        var length = fn.length;
        for (var idx = arguments.length - 2; idx >= 0; idx -= 1) {
            fn = composeFunction(arguments[idx], fn);
        }
        return arity(length, fn);
    };
};
