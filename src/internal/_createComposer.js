/*
 * Returns a function that makes a multi-argument version of compose from
 * either _compose or _composeP.
 */
module.exports = function _createComposer(composeFunction) {
    return function() {
        var idx = arguments.length - 1;
        var fn = arguments[idx];
        while (idx--) {
            fn = composeFunction(arguments[idx], fn);
        }
        return fn;
    };
};
