(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['ramda'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../..'));
    } else {
        this.Random = factory(this.R);
    }
}(function(R) {

    // Random
    // ----------
    //
    // TODO: (possibly?)
    //     var random = new Random(seeds); // then...
    //     random.nextInt(below): () -> random int, where 0 <= int < < below
    //     random.intBetween(start, upTo): () -> random int, where start <= int < upTo
    //     random.boolean(): () -> random boolean
    //     random.fromChars(characters): int -> random String consisting of `int` chars drawn from `characters`.

    // From http://baagoe.com/en/RandomMusings/javascript/
    // mirrored at https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
    // Johannes Baagøe <baagoe@baagoe.com>, 2010
    var Mash = function Mash() {
        var n = 0xefc8249d;

        var mash = function(data) {
            data = data.toString();
            var len = data.length;
            var idx = -1;
            while (++idx < len) {
                n += data.charCodeAt(idx);
                var h = 0.02519603282416938 * n;
                n = h >>> 0;
                h -= n;
                h *= n;
                n = h >>> 0;
                h -= n;
                n += h * 0x100000000; // 2^32
            }
            return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
        };

        mash.version = 'Mash 0.9';
        return mash;
    };

    // From http://baagoe.com/en/RandomMusings/javascript/
    // mirrored at https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
    // Johannes Baagøe <baagoe@baagoe.com>, 2010
    var Random = function Random() {
        return (function(args) {
            var s0 = 0;
            var s1 = 0;
            var s2 = 0;
            var c = 1;

            if (args.length === 0) {
                args = [+new Date()];
            }
            var mash = Mash();
            s0 = mash(' ');
            s1 = mash(' ');
            s2 = mash(' ');

            var len = args.length;
            var idx = -1;
            while (++idx < len) {
                s0 -= mash(args[idx]);
                if (s0 < 0) {
                    s0 += 1;
                }
                s1 -= mash(args[idx]);
                if (s1 < 0) {
                    s1 += 1;
                }
                s2 -= mash(args[idx]);
                if (s2 < 0) {
                    s2 += 1;
                }
            }
            mash = null;

            var random = function() {
                var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
                s0 = s1;
                s1 = s2;
                s2 = t - (c = t | 0);
                return s2;
            };
            random.uint32 = function() {
                return random() * 0x100000000; // 2^32
            };
            random.fract53 = function() {
                return random() +
                    (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
            };
            random.version = 'Alea 0.9';
            random.args = args;
            return random;

        }(Array.prototype.slice.call(arguments)));
    };

    // Returns a shuffled version of a list, using the
    // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
    R.shuffle = function(random, list) {
        var idx = -1;
        var len = list.length;
        var position;
        var result = [];
        while (++idx < len) {
            position = Math.floor((idx + 1) * random());
            result[idx] = result[position];
            result[position] = list[idx];
        }
        return result;
    };

    R.Random = Random;

    return Random;
}));
