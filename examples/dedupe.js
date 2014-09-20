var R = require('..');

/*
Why Ramda? Why Functional Programming?

Functional programming can make complex code more abstract, simpler, and less
verbose.

For example, consider the not uncommon problem of purging an array of objects of
its duplicates.

Consider the function `imperativeDedupe1`, written in imperative style.
`imperativeDedupe1` takes an array, pushes its elements into an object indexed by
the object value, then pushes back to an array, thereby eliminating duplicates.
*/
var imperativeDedupe1 = function(list) {
    var idx,
        len = list.length,
        out = [],
        cache = {},
        item;

    for (idx = 0; idx < len; idx++) {
        item = list[idx];
        if (!(item in cache)) {
            out.push(cache[item] = item);
        }
    }
    return out;
};

/*
Here's a possible implementation of that in functional style, `fpDedupe1`.
`fpDedupe1` works a little differently. It takes the head of the list,
then looks to see if that object exists in the tail of the list. If not,
then push the head of the list onto the accumulator, and recur on the tail of
the list.
*/
var fpDedupe1 = R.foldl(function(acc, curr) {
    if (!R.contains(curr, acc)) {
        acc = R.append(curr, acc);
    }
    return acc;
}, []);

/*
The functional code is a bit tighter and more readable, at the cost of some
calls to external functions (`contains` and `append`).
*/

imperativeDedupe1([1, 2, 3, 4, 2, 3, 4, 1, 2, 3]); // [1, 2, 3, 4]

/*
The functional version works too:
*/

fpDedupe1([1, 2, 3, 4, 2, 3, 4, 1, 2, 3]); // [1, 2, 3, 4]

/*
But the big problem for _both_ imperative and functional versions is
that this deduping algorithm is naive and inflexible. The functions will fail on
complex objects: In the imperative case, we can't use an object as an object
property; and in the functional case, `contains` is testing on strict equality (===).

Suppose we have an array of objects like this:
*/
var objs = [
    {a: 0, b: 0},
    {a: 0, b: 1},
    {a: 1, b: 0},
    {a: 1, b: 1},
    {a: 1, b: 0},
    {a: 1, b: 1}
];

/*
We want our deduper function to return this:

 [
    {a: 0, b: 0},
    {a: 0, b: 1},
    {a: 1, b: 0},
    {a: 1, b: 1}
 ]

... but neither of the above functions will do that for us.
*/

imperativeDedupe1(objs); // ["[object Object]"]  (ouch)
fpDedupe1(objs); // returns a shallow copy of the original array

/*
We can do better: Consider this generic dedupe function `fpDedupe2` that takes
a function and an array and returns a deduped array. It doesn't care what the
array contains, doesn't check for types. It leaves the responsibility for
knowing the structure of the passed-in array to the caller.  All the caller has
to do is supply a predicate that describes object equality, and `fpDedupe2` does
the rest.
*/
var fpDedupe2 = function(pred, list) {
    function reducer(acc, curr) {
        if (!R.some(function(accElem) { return pred(accElem, curr); }, acc)) {
            acc = R.append(curr, acc);
        }
        return acc;
    }
    return R.foldl(reducer, [], list);
};

/*
To purge the array `objs`, we want to remove any objects from the array where
objX.a === objY.a and objX.b === objY.b. That is a simple function to write:

function(x, y) { return x.a === y.a && x.b === y.b; }

So we pass that function as our predicate to `fpDedupe2` and we should get the
results we want:
*/
fpDedupe2(function(x, y) { return x.a === y.a && x.b === y.b; }, objs); // success--try it

/*
I find that code to be clear and concise: We will apply the passed-in predicate
to our list (`objs`). The predicate describes how we will determine object
equality.

The imperative code might look as nasty as this:
*/
var imperativeDedupe2 = function(list) {
    var idx,
        len = list.length,
        out = [list[0]],
        matched = true;

    for (idx = 0; idx < len; idx++) {
        for (var j = 0; j < out.length; j++) {
            if (list[idx].a === out[j].a && list[idx].b === out[j].b) {
                matched = true;
            }
        }
        if (!matched) {
            out.push(list[idx]);
        }
        matched = false;
    }
    return out;
};
void imperativeDedupe2;

/*
This works, but is still inflexible; the function `imperativeDedupe2` depends
on knowing the structure of the objects in the array.

Let's try a more complex example to compare imperative and FP approaches. In
the next example, if the x and z.a properties are the same, we want to purge
that object from the array.
*/

var objs2 = [
    {x: 1, y: 2, z: {a: 100, b: 200}},
    {x: 2, y: 4, z: {a: 200, b: 400}},
    {x: 1, y: 2, z: {a: 111, b: 200}},
    {x: 2, y: 4, z: {a: 200, b: 400}},
    {x: 1, y: 2, z: {a: 100, b: 200}},
    {x: 3, y: 6, z: {a: 300, b: 900}},
    {x: 1, y: 2, z: {a: 111, b: 200}},
    {x: 4, y: 0, z: {a:   3, b:   9}},
    {x: 3, y: 6, z: {a: 300, b: 900}},
    {x: 2, y: 4, z: {a: 222, b: 400}}
];

/*
imperativeDedupe3 is a possible approach to this problem using imperative style:
*/
var imperativeDedupe3 = function(list) {
    var idx,
        len = list.length,
        out = [],
        obj = {};
    for (idx = 0; idx < len; idx++) {
        obj[list[idx].x + ':' + list[idx].z.a] = list[idx];
    }
    for (idx in obj) {
        if (obj.hasOwnProperty(idx)) {
            out.push(obj[idx]);
        }
    }
    return out;
};

imperativeDedupe3(objs2);
/*
Once again, the function `imperativeDedupe3` depends on knowledge of the
internals of the objects in the passed-in array. it also relies on toString
behaving consistently.

On the other hand, with FP, we don't need to write a new function; we can
reuse `fpDedupe2`. `fpDedupe2` does not have any knowledge about the array of
objects passed into it; all the relevant knowledge is also passed in via the
predicate:
*/
fpDedupe2(function(a, b) { return a.x === b.x && a.z.a === b.z.a; }, objs2);

/*
See???
*/
