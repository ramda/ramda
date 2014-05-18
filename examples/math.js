// A number of mathematical helper functions that have nothing to do with eweda itself, but might be used in
// conjunction with some eweda exapmles.

// Simple, tail-recursive version of Fibonacci. Should run in nearly O(n).
var fibonacci = (function() {
    var fib = function(curr, next, n) {
        return  (n === 0) ? curr : fib(next, curr + next, n - 1);
    };
    return function(n) {
        return fib(0, 1, n);
    }
}());

// Sieve of Eratosthenes to find primes up to `max`.
var primeSieve = function(max) {
    var D = [], primes = [];
    for (var q = 2; q < max; q++) {
        if (D[q]) {
            for (var i = 0; i < D[q].length; i++) {
                 var p = D[q][i];
                 if (D[p + q]) {
                     D[p + q].push(p);
                 } else {
                     D[p + q] = [p];
                 }
            }
            delete D[q];
        } else {
            primes.push(q);
            if (q * q < max) D[q * q] = [q];
        }
    }
    return primes;
};

// Variation of Sieve of Eratosthenes to find nth prime
var nthPrime = function(n) {
    var D = [];
    var q = 2, count = 0;
    while (count < n) {
        if (D[q]) {
            for (var i = 0; i < D[q].length; i++) {
                 var p = D[q][i];
                 if (D[p + q]) D[p + q].push(p);
                 else D[p + q] = [p];
            }
            delete D[q];
        } else {
            count++;
            D[q * q] = [q];
        }
        q++;
    }
    return q - 1;
};


// Another variation to list the prime factors of all numbers up to `max`.
var allPrimeFactors = function(max) {
    var D = {0: [], 1: []};
    for (var q = 2; q < max; q++) {
        if (D[q]) {
            for (var i = 0; i < D[q].length; i++) {
                 var p = D[q][i];
                 if (D[p + q]) {
                     D[p + q].push(p);
                 } else {
                     D[p + q] = [p];
                 }
            }
        } else {
            D[q] = [q];
            if (2 * q < max) D[2 * q] = [q];
        }
    }
    return D;
};



// Another variation, which repeatedly iterates through the (memoized) primes, with `next`, and `reset`
var primes =  (function () {
    var cache = [];
    var ctr = 0;
    var nthPrime = function(n) {
        var D = [];
        var q = 2, count = 0;
        while (count < n) {
            if (D[q]) {
                for (var i = 0; i < D[q].length; i++) {
                     var p = D[q][i];
                     if (D[p + q]) D[p + q].push(p);
                     else D[p + q] = [p];
                }
                delete D[q];
            } else {
                count++;
                D[q * q] = [q];
            }
            q++;
        }
        return q - 1;
    };

    return {
        next: function() {
            while (cache.length <= ctr) {
                cache[cache.length] = nthPrime(cache.length + 1);
            }
            return cache[ctr++];
        },
        reset: function() {ctr = 0;}
    }
}());

var isPrime = (function() {
    var maxIndex = 1, maxPrime = nthPrime(maxIndex), cache = {};
    cache[maxPrime] = true;
    return function(n) {
        while (maxPrime < n) {
            maxPrime = nthPrime(++maxIndex);
            cache[maxPrime] = true;
        }
        return !!cache[n];
    }
}());

// brain-dead implementation of BigInteger, just like you did in grade school.
// BigInteger represents, e.g. 152, as ['2', '5', '1'], a reversed list of String digits.  If a String representation is
// needed, call `bigInt.join('').reverse()`.

var bigint = function(n) {return ('' + n).split('').reverse();};
var bi2s = function(bi) {return bi.join(",").split(",").reverse().join('');}; // need a better clone than .join(",").split(","), but I'm tired...

// brain-dead BigInteger implementation of add function.
//var add = function(a, b) {
//    while (a.length < b.length) a[a.length] = 0;
//    while (a.length > b.length) b[b.length] = 0;
//    var carry = 0, total = [];
//    for (var i = 0; i < a.length; i++) {
//        var sum = a[i] + b[i] + carry;
//        if (sum >= 10) {
//            sum = sum - 10;
//            carry = 1;
//        } else {
//            carry = 0;
//        }
//        total[total.length] = sum;
//    }
//    if (carry) {
//        total[total.length] = carry;
//    }
//    return total;
//};

// brain-dead BigInteger implementation of add function.
//var mult = function(a, b) {
//    var total = [0];
//    for (var i = 0; i < a.length; i++) {
//        for (var j = 0; j < b.length; j++) {
//            var digit = a[i] * b[j];
//            digit = (digit > 9) ? [digit % 10, (digit - (digit % 10)) / 10] : [digit];
//            total = add(total, Array(i + 1).join("0").split("").map(Number).concat(Array(j + 1).join("0").split("").map(Number)).concat(digit));
//        }
//    }
//    return total;
//};

// Greatest Common Divisor
var gcd = function (m, n) {
    return m === 0 ? n : gcd(n % m, m);
};

// Least Common Multiple
var lcm = function (m, n) {
    return m * n / gcd(m , n);
};

//  / n \  n choose k
//  \ k /  i.e. ways to choose k elements (without replacement) from a set of n elements.
var choose = (function() {
    var _choose = function(n, k, i, acc) {
        return (i == k) ? (acc * (n - k + 1)) / k : _choose(n, k, i + 1, (acc * (n - i + 1)) / i);
    };
    return function(n, k) {
        return n < 0 || k < 0 || n < k ? 0 : _choose(n, k, 1, 1);
    };
}());

// Horribly inefficient, even if clean
//   var choose = memoize(function choose(n, r) {
//       return result = n < r ? 0 : (r == 0 || r == n) ? 1 : choose(n - 1, r - 1) + choose(n -1, r);
//   });

// Returns an array containing all the factors of n;
var divisors = function(n) {
    var factors = [];
    for (var i = 1; i <= Math.sqrt(n); i++) {
        if (!(n % i)) {
            factors.push(i);
            if (i * i < n) factors.push(n / i);
        }
    }
    factors.sort(function(a, b) {return a - b;});
    return factors;
};

// Returns an array containing all the proper factors of n;
var properDivisors = function(n) {
    var factors = [1];
    for (var i = 2; i <= Math.sqrt(n); i++) {
        if (!(n % i)) {
            factors.push(i);
            if (i * i < n) factors.push(n / i);
        }
    }
    factors.sort(function(a, b) {return a - b;});
    return factors;
};

var factorial = memoize(function fact(n) {
    return n < 2 ? 1: n * fact(n - 1);
});


var max = foldl(Math.max, Number.NEGATIVE_INFINITY);
var maxOver = function(fn, list) {return foldl1(fn, list); };

var min = foldl(Math.max, Number.POSITIVE_INFINITY);
var minOver = function(fn, list) {return foldl1(fn, list); };

var split = curry(function(chr, str) {
   return str.split(chr);
});

var digits = function(number) {
	return ('' + number).split('');
};

var eq = curry(function(a, b) {
	return a === b;
});