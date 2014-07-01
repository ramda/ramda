var util = require('./util'),
    isNil = util.isNil,
    returnThis = util.returnThis;
/**
 * @constructor
 * @param {*} x
 * @returns {Maybe}
 */
function Maybe (x) {
    return isNil (x) ? new Nothing() : new Just (x);
}
/**
 * @class
 * @extends Maybe
 * @property {*} value
 * @param {*} x
 */
function Just (x) {
    this.value = x;
}
/**
 * @class
 * @extends Maybe
 */
function Nothing () {

}
// applicative
/**
 * @param x
 * @returns {Maybe}
 */
Nothing.prototype.of = Just.prototype.of = function of (x) {
    return Maybe (x);
};

// functor
/**
 * @param {Function} f
 * @returns {Just}
 */
Just.prototype.map = function map (f) {
    return new Just (f (this.value));
};

/**
 * @param f
 * @returns {Nothing}
 */
Nothing.prototype.map = returnThis;

// apply
// takes a Maybe that wraps a function (`app`) and applies its `map`
// method to this Maybe's value, which must be a function.
/**
 * @param {Just} m
 * @returns {Just}
 */
Just.prototype.ap = function ap (m) {
    if (typeof this.value !== 'function') {
        throw new TypeError("Calling ap on a Maybe requires that the Maybe is wrapping a function");
    }
    return m.map (this.value);
};

/**
 * @param {Just} m
 * @returns {Nothing}
 */
Nothing.prototype.ap = returnThis;

// chain
//  f must be a function which returns a value
//  f must return a value of the same Chain
//  chain must return a value of the same Chain
//
/**
 * @param f {Function}
 * @returns {Just}
 */
Just.prototype.chain = function chain (f) {
    return f (this.value);
};
/**
 * @param f {Function}
 * @returns {Nothing}
 */
Nothing.prototype.chain = returnThis;

// monad
// A value that implements the Monad specification must also implement the Applicative and Chain specifications.
// see above.

// equality method to enable testing
/**
 * @param {Maybe} m
 * @returns {bool}
 */
Just.prototype.equals = Nothing.prototype.equals = function (m) {
    return this.value === m.value;
};
/**
 * @type {boolean}
 */
Nothing.prototype.isNothing = true;
/**
 * @type {boolean}
 */
Just.prototype.isNothing = false;

/**
 * @returns {string}
 */
Just.prototype.toString = function toString () {
    return 'Just ' + this.value;
};
/**
 * @returns {string}
 */
Nothing.prototype.toString = function toString () {
    return 'Nothing';
};

module.exports = Maybe;