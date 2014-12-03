var R = require('..');
var fs = require('fs');
var dox = require('dox');

var pickPair = R.curry(function pickBestPartner(first, secondOptions, obj) {
    var idx = -1;
    var tmp;
    while (++idx < secondOptions.length) {
        tmp = secondOptions[idx];
        if (tmp in obj) {
            return [obj[first], obj[tmp]];
        }
    }
    // didn't find, return with first key that isn't first
    for (tmp in obj) {
        if (tmp !== first) {
            return [obj[first], obj[tmp]];
        }
    }
    // return undefined
});

var toPairs = function toPairs(o) {
    var a = [];
    var k;
    for (k in o) {
        a.push([k, o[k]]);
    }
    return a;
};

var gatherer = function() {
    var listKeys = arguments[0];
    return function gather(obj, k, v) {
        var newVal = v;
        if (k in obj) {
            if (R.contains(k, listKeys)) {
                newVal = R.append(v, obj[k]);
            }
        } else {
            if (R.contains(k, listKeys)) {
                newVal = [v];
            }
        }
        return R.mixin(obj, R.createMapEntry(k, newVal));
    };
};

var tagsToMap = function tagsToMap(a) {
    var idx = -1;
    var listKeys = arguments[1] || [];
    var obj = {};
    var gatherFn = gatherer(listKeys);
    var pair;
    while (++idx < a.length) {
        // get first key and value
        pair = toPairs(a[idx])[0];
        obj = gatherFn(obj, pair[0], pair[1]);
    }
    return obj;
};

var newMix = function newMix() {
    var idx = 0;
    var mixed = arguments[0];
    while (++idx < arguments.length) {
        mixed = R.mixin(mixed, arguments[idx]);
    }
    return mixed;
};

var doxTransformer = function doxTransformer(dox) {
    if (dox == null || dox.ctx == null) {
        return false;
    }
    var tags = R.map(
        R.compose(R.apply(R.createMapEntry), pickPair('type', ['types', 'string'])),
        dox.tags
    );
    var tagMap = tagsToMap(tags, ['param', 'category']);
    // omit code: doesn't seem to be correctly populated
    // description: full and summary seem to be the same thing, body is empty, just get summary
    return newMix(
        R.createMapEntry('name', dox.ctx.name),
        tagMap,
        R.createMapEntry('description', dox.description.summary),
        R.omit(['tags', 'ctx', 'code', 'description'], dox)
    );
};

// get ramda source
var ramdaSource = String(fs.readFileSync('./ramda.js'));

// build dox
var ramdaDox = dox.parseComments(ramdaSource);

// make more user friendly
var niceDocs = R.filter(R.I, R.map(doxTransformer, ramdaDox));

module.exports = niceDocs;
