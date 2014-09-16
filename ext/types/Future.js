// `f` is a function that takes two function arguments: `reject` (failure) and `resolve` (success)
function Future(f) {
    if (!(this instanceof Future)) {
        return new Future(f);
    }
    this.fork = f;
}

// functor
Future.prototype.map = function(f) {
    return this.chain(function(a) { return Future.of(f(a)); });
};

// apply
Future.prototype.ap = function(m) {
    return this.chain(function(f) { return m.map(f); });
};

// applicative
Future.of = function(x) {
    // should include a default rejection?
    return new Future(function(_, resolve) { return resolve(x); });
};

Future.prototype.of = Future.of;

// chain
//  f must be a function which returns a value
//  f must return a value of the same Chain
//  chain must return a value of the same Chain
Future.prototype.chain = function(f) {  // Sorella's:
    return new Future(function(reject, resolve) {
        return this.fork(function(a) { return reject(a); },
                         function(b) { return f(b).fork(reject, resolve); });
    }.bind(this));
};

// monad
// A value that implements the Monad specification must also implement the Applicative and Chain specifications.
// see above.

// equality method to enable testing
Future.prototype.equals = function(that) {
    void that;
    // TODO: how do you define equality for two Futures?
    return true;
};

module.exports = Future;
