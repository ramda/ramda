var R = require('..');

var gens = (function() {
    var trampoline = function(fn) {
        var result = fn.apply(this, R.tail(arguments));
        while (typeof result == 'function') {
            result = result();
        }
        return result;
    };

    var generator = function(seed, current, step) {
        return {
            head: current(seed),
            tail: function() {return generator(step(seed), current, step);}
        };
    };

    var genTake = function(n, gen) {
        var take = function(ctr, g, ret) {
            return (ctr === 0) ? ret : take(ctr - 1, g.tail(), R.append(g.head, ret));
        };
        return trampoline(take, n, gen, []);
    };

    var genSkip = function(n, gen) {
        return (n <= 0) ? gen : genSkip(n - 1, gen.tail());
    };

    var genMap = function(fn, gen) {
        return {
            head: fn(gen.head),
            tail: function() {return genMap(fn, gen.tail());}
        };
    };

    var genFilter = function(fn, gen) {
        var head = gen.head;
        while (!fn(head)) {
            gen = gen.tail();
            head = gen.head;
        }
        return {
            head: head,
            tail: function() {return genFilter(fn, gen.tail());}
        };
    };

    return {
        generator: generator,
        take: genTake,
        skip: genSkip,
        map: genMap,
        filter: genFilter
    };
}());

R.installTo(this);

var identity = function(x) {return x;};
var square = function(n) {return n * n;};
var even = function(n) {return n % 2 === 0;};

var ints = gens.generator(0, identity, function(n) {return n + 1;});
console.log(gens.take(10, ints));
console.log(gens.take(5, gens.skip(10, ints)));

var fibonacci = gens.generator(
    [0, 1],
    function(pair) {return pair[0];},
    function(pair) {return [pair[1], pair[0] + pair[1]];}
);
console.log(gens.take(20, fibonacci));

console.log(gens.take(10, gens.map(square, ints)));

console.log(gens.take(5, gens.filter(even, fibonacci)));
