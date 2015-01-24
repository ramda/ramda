var eq = require('../eq');
var has = require('../has');
var keys = require('../keys');
var type = require('../type');

// The algorithm used to handle cyclic structures is
// inspired by underscore's isEqual
module.exports = function _eqDeep(a, b, stackA, stackB) {
    var typeA = type(a);
    if (typeA !== type(b)) {
        return false;
    }

    if (eq(a, b)) {
        return true;
    }

    if (typeA == 'RegExp') {
        // RegExp equality algorithm: http://stackoverflow.com/a/10776635
        return (a.source === b.source) &&
               (a.global === b.global) &&
               (a.ignoreCase === b.ignoreCase) &&
               (a.multiline === b.multiline) &&
               (a.sticky === b.sticky) &&
               (a.unicode === b.unicode);
    }

    if (Object(a) === a) {
        if (typeA === 'Date' && a.getTime() != b.getTime()) {
            return false;
        }

        var keysA = keys(a);
        if (keysA.length !== keys(b).length) {
            return false;
        }

        var idx = stackA.length;
        while (idx--) {
            if (stackA[idx] === a) {
                return stackB[idx] === b;
            }
        }

        stackA.push(a);
        stackB.push(b);
        idx = keysA.length;
        while (idx--) {
            var key = keysA[idx];
            if (!has(key, b) || !_eqDeep(b[key], a[key], stackA, stackB)) {
                return false;
            }
        }
        stackA.pop();
        stackB.pop();
        return true;
    }
    return false;
};
