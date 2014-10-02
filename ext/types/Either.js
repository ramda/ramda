// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function() {


    // -- Aliases ----------------------------------------------------------
    var clone         = Object.create;
    var unimplemented = function(){ throw new Error('Not implemented.'); };
    var noop          = function(){ return this;                         };


    // -- Implementation ---------------------------------------------------

    /**
     * The `Either(a, b)` structure represents the logical disjunction between `a`
     * and `b`. In other words, `Either` may contain either a value of type `a` or
     * a value of type `b`, at any given time. This particular implementation is
     * biased on the right value (`b`), thus projections will take the right value
     * over the left one.
     *
     * This class models two different cases: `Left a` and `Right b`, and can hold
     * one of the cases at any given time. The projections are, none the less,
     * biased for the `Right` case, thus a common use case for this structure is to
     * hold the results of computations that may fail, when you want to store
     * additional information on the failure (instead of throwing an exception).
     *
     * Furthermore, the values of `Either(a, b)` can be combined and manipulated by
     * using the expressive monadic operations. This allows safely sequencing
     * operations that may fail, and safely composing values that you don't know
     * whether they're present or not, failing early (returning a `Left a`) if any
     * of the operations fail.
     *
     * While this class can certainly model input validations, the [Validation][]
     * structure lends itself better to that use case, since it can naturally
     * aggregate failures — monads shortcut on the first failure.
     *
     * @class
     * @sig
     * Either[a, b] <: Applicative[b]
     *               , Functor[b]
     *               , Chain[b]
     *               , Show
     *               , Eq
     */

    /**
     * Constructs a new `Either[a, b]` structure holding a `Left` if the
     * `Right` value is null or undefined, and a `Right` value otherwise.
     * The Either constructor is curried.
     * @example
     *
     *  R.compose(
     *      R.map(R.toUpperCase),
     *      R.map(R.prop('textContent')),
     *      R.Either('no such element'),
     *      R.bind(document.getElementById, document)
     *  );
     *
     * @sig a -> Either[a, b]
     */
    function Either(left, right) {
        if (arguments.length === 0) {
            throw new TypeError('Either called with no arguments');
        } else if (arguments.length === 1) {
            return function(right) {
                return Either(left, right);
            };
        } else {
            return right == null ? new Left(left) : new Right(right);
        }
    }

    Left.prototype = clone(Either.prototype);
    function Left(a) {
        this.value = a;
    }

    Right.prototype = clone(Either.prototype);
    function Right(a) {
        this.value = a;
    }


    /**
     * Constructs a new `Either[a, b]` structure holding a `Left` value. This
     * usually represents a failure due to the right-bias of this structure.
     *
     * @sig a -> Either[a, b]
     */
    Either.Left = function(a) {
        return new Left(a);
    };
    Either.prototype.Left = Either.Left;

    /**
     * Constructs a new `Either[a, b]` structure holding a `Right` value. This
     * usually represents a successful value due to the right bias of this
     * structure.
     *
     * @sig b -> Either[a, b]
     */
    Either.Right = function(a) {
        return new Right(a);
    };
    Either.prototype.Right = Either.Right;

    /**
     * True if the `Either[a, b]` contains a `Left` value.
     *
     * @sig Boolean
     */
    Either.prototype.isLeft = false;
    Left.prototype.isLeft   = true;

    /**
     * True if the `Either[a, b]` contains a `Right` value.
     *
     * @sig Boolean
     */
    Either.prototype.isRight = false;
    Right.prototype.isRight  = true;


    /**
     * Applicative type. Creates a new `Either[a, b]` instance holding the `Right` value `b`.
     *
     * `b` can be any value, including `null`, `undefined` or another
     * `Either[a, b]` structure.
     *
     * @sig b -> Either[a, b]
     */
    Either.of = function(a) {
        return this.Right(a);
    };
    Either.prototype.of = Either.of;


    /**
     * Apply type. Applies the function inside the `Right` case of the `Either[a, b]`
     * structure to another applicative type.
     *
     * The `Either[a, b]` should contain a function value, otherwise a `TypeError`
     * is thrown.
     *
     * @method
     * @sig (@Either[a, b -> c], f:Applicative[_]) => f[b] -> f[c]
     */
    Either.prototype.ap = unimplemented;

    Left.prototype.ap = function(b) {
        return b;
    };

    Right.prototype.ap = function(b) {
        return b.map(this.value);
    };


    /**
     * Functor type. Transforms the `Right` value of the `Either[a, b]` structure using a regular
     * unary function.
     *
     * @method
     * @sig (@Either[a, b]) => (b -> c) -> Either[a, c]
     */
    Either.prototype.map = unimplemented;
    Left.prototype.map   = noop;

    Right.prototype.map = function(f) {
        return this.of(f(this.value));
    };


    /**
     * Chain type. Transforms the `Right` value of the `Either[a, b]` structure using an unary
     * function to monads.
     *
     * @method
     * @sig (@Either[a, b], m:Monad[_]) => (b -> m[c]) -> m[c]
     */
    Either.prototype.chain = unimplemented;
    Left.prototype.chain   = noop;

    Right.prototype.chain = function(f) {
        return f(this.value);
    };


    /**
     * Returns a textual representation of the `Either[a, b]` structure.
     *
     * @method
     * @sig (@Either[a, b]) => Void -> String
     */
    Either.prototype.toString = unimplemented;

    Left.prototype.toString = function() {
        return 'Either.Left(' + this.value + ')';
    };

    Right.prototype.toString = function() {
        return 'Either.Right(' + this.value + ')';
    };


    /**
     * Tests if an `Either[a, b]` structure is equal to another `Either[a, b]`
     * structure.
     *
     * @method
     * @sig (@Either[a, b]) => Either[a, b] -> Boolean
     */
    Either.prototype.equals = unimplemented;

    Left.prototype.equals = function(a) {
        return a.isLeft && (a.value === this.value);
    };

    Right.prototype.equals = function(a) {
        return a.isRight && (a.value === this.value);
    };


    /**
     * Extracts the `Left` or `Right` value out of the `Either[a, b]` structure.
     *
     * @method
     * @sig (@Either[a, b]) => Void → b         :: partial, throws
     * @see {@link module:lib/either~Either#getOrElse} — A getter that can handle failures.
     * @see {@link module:lib/either~Either#merge} — The convergence of both values.
     * @throws {TypeError} if the structure has no `Right` value.
     */
    Either.prototype.get = unimplemented;

    Left.prototype.get = function() {
        return this.value;
    };

    Right.prototype.get = function() {
        return this.value;
    };


    /**
     * Extracts the `Right` value out of the `Either[a, b]` structure. If the
     * structure doesn't have a `Right` value, returns the given default.
     *
     * @method
     * @sig (@Either[a, b]) => b → b
     */
    Either.prototype.getOrElse = unimplemented;

    Left.prototype.getOrElse = function(a) {
        return a;
    };

    Right.prototype.getOrElse = function(_) {
        return this.value;
    };


    /**
     * Transforms a `Left` value into a new `Either[a, b]` structure. Does nothing
     * if the structure contain a `Right` value.
     *
     * @method
     * @sig (@Either[a, b]) => (a -> Either[c, b]) -> Either[c, b]
     */
    Either.prototype.orElse = unimplemented;
    Right.prototype.orElse  = noop;

    Left.prototype.orElse = function(f) {
        return f(this.value);
    };


    /**
     * Returns the value of whichever side of the disjunction that is present.
     *
     * @sig (@Either[a, a]) => Void -> a
     */
    Either.prototype.merge = function() {
        return this.value;
    };


    // -- Folds and Extended Transformations -------------------------------

    /**
     * Applies a function to each case in this data structure.
     *
     * @method
     * @sig (@Either[a, b]) => (a → c), (b → c) → c
     */
    Either.prototype.fold = unimplemented;

    Left.prototype.fold = function(f, _) {
        return f(this.value);
    };

    Right.prototype.fold = function(_, g) {
        return g(this.value);
    };

    /**
     * Catamorphism.
     *
     * @method
     * @sig (@Either[a, b]) => { Left: a → c, Right: b → c } → c
     */
    Either.prototype.cata = unimplemented;

    Left.prototype.cata = function(pattern) {
        return pattern.Left(this.value);
    };

    Right.prototype.cata = function(pattern) {
        return pattern.Right(this.value);
    };


    /**
     * Swaps the disjunction values.
     *
     * @method
     * @sig (@Either[a, b]) => Void → Either[b, a]
     */
    Either.prototype.swap = unimplemented;

    Left.prototype.swap = function() {
        return this.Right(this.value);
    };

    Right.prototype.swap = function() {
        return this.Left(this.value);
    };


    /**
     * Maps both sides of the disjunction.
     *
     * @method
     * @sig (@Either[a, b]) => (a → c), (b → d) → Either[c, d]
     */
    Either.prototype.bimap = unimplemented;

    Left.prototype.bimap = function(f, _) {
        return this.Left(f(this.value));
    };

    Right.prototype.bimap = function(_, g) {
        return this.Right(g(this.value));
    };


    /**
     * Maps the left side of the disjunction.
     *
     * @method
     * @sig (@Either[a, b]) => (a → c) → Either[c, b]
     */
    Either.prototype.leftMap = unimplemented;
    Right.prototype.leftMap  = noop;

    Left.prototype.leftMap = function(f) {
        return this.Left(f(this.value));
    };

    return Either;
}));

