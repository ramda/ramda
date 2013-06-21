/*
  purge an array of objects of its duplicates
*/
function dedupe(arr) {
    var i,
        len=arr.length,
        out=[],
        obj={};

    for (i=0;i<len;i++) {
        obj[arr[i]]=0;
    }
    for (i in obj) {
        if (obj.hasOwnProperty(i)) {
            out.push(i);
        }
    }
    return out;
}
var deduped = dedupe(someArray);
/*
Sure, that works ok.
Here it is eweda style:
*/
dedupe = foldl(function(acc, curr) {
    if (!contains(curr, acc)) {
        acc = append(curr, acc);
    }
    return acc;
}, EMPTY);
var deduped = dedupe(someArray);

/*
we made the code tighter and more readable. But this is a naive deduper.
What if we have an array of complex objects? We can't use those as object indices.
We don't want to test for object identity, we want to purge objects that have some
properties in common.

The iterative dedupe function is only useful for primitive objects. To make it handle
arrays of arbitrary complex objects could start turning nasty.
*/

/*
We can do better--here is a generic dedupe function that takes
a function and an array and returns a deduped array.It doesn't care
what the array contains, doesn't check for types. It leaves the responsibility for knowing
the structure of the passed in array to the caller.  All the caller has to do is supply
 a predicate that describes object equality, and dedupeF does the rest.
*/
function dedupeF(pred, list) {
    function reducer(acc, curr) {
        if (!some(function(accElem) { return pred(accElem, curr); }, acc)) {
            acc = append(curr, acc);
        }
        return acc;
    }
    return foldl(reducer, [], list);
}
deduped = dedupeF(function(a, b) { return a === b; }, someArray);

/*  This is adapted from actual code i saw in production. yikes!
 For demonstration, let's say that if the x and z.a properties are the same, we
 want to purge that object from the array.
*/




var objs = [
    {x: 1, y: 2, z: {a: 100, b: 200}},
    {x: 2, y: 4, z: {a: 200, b: 400}},
    {x: 1, y: 2, z: {a: 111, b: 200}},
    {x: 2, y: 4, z: {a: 200, b: 400}},
    {x: 1, y: 2, z: {a: 100, b: 200}},
    {x: 3, y: 6, z: {a: 300, b: 900}},
    {x: 1, y: 2, z: {a: 111, b: 200}},
    {x: 4, y: 0, z: {a: 3, b: 9}},
    {x: 3, y: 6, z: {a: 300, b: 900}},
    {x: 2, y: 4, z: {a: 222, b: 400}}
];

 /* iterative style. */
function dedupe(arr) {
    var i,
        len=arr.length,
        out=[],
        obj={};
    for (i = 0; i < len; i++) {
        obj[arr[i].x + ":" + arr[i].z.a] = arr[i]; // getting nasty..... and what if a.x or a.z.a doesn't toString as expected?
    }
    for (i in obj) {
        if (obj.hasOwnProperty(i)) {
            out.push(obj[i]);
        }
    }
    return out;
}
var deduped = dedupe(objs);

/* eweda (functional) style */
var deduped = dedupeF(function(a, b) { return a.x === b.x && a.z.a === b.z.a; }, objs);

/* gangnam style */
console.log("heeeeeeeeeeeey, sexy lady");
