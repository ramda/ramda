var _noArgsException = require('./_noArgsException');
var arity = require('../arity');


/*
 * Returns a function that makes a multi-argument version of compose from
 * either _compose or _pCompose.
 */
module.exports = function _createComposer(composeFunction) {
    return function() {
        switch (arguments.length) {
            case 0: throw _noArgsException();
            case 1: return arguments[0];
            default:
                var idx = arguments.length - 1, fn = arguments[idx], length = fn.length;
                while (idx--) {
                    fn = composeFunction(arguments[idx], fn);
                }
                return arity(length, fn);
        }
    };
};
