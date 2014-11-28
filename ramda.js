//     ramda.js
//     https://github.com/ramda/ramda
//     (c) 2013-2014 Scott Sauyet and Michael Hurley
//     Ramda may be freely distributed under the MIT license.

// Ramda
// -----
// A practical functional library for Javascript programmers.  Ramda is a collection of tools to make it easier to
// use Javascript as a functional programming language.  (The name is just a silly play on `lambda`.)

// Basic Setup
// -----------
// Uses a technique from the [Universal Module Definition][umd] to wrap this up for use in Node.js or in the browser,
// with or without an AMD-style loader.
//
//  [umd]: https://github.com/umdjs/umd/blob/master/returnExports.js

(function(factory) {
    if (typeof exports === 'object') {
        module.exports = factory(this);
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        this.R = factory(this);
    }
}(function() {
    'use strict';
    var R = {
        add: require('./lib/add'),
        allPredicates: require('./lib/allPredicates'),
        always: require('./lib/always'),
        alwaysFalse: require('./lib/alwaysFalse'),
        alwaysTrue: require('./lib/alwaysTrue'),
        and: require('./lib/and'),
        anyPredicates: require('./lib/anyPredicates'),
        ap: require('./lib/ap'),
        append: require('./lib/appendTo'),
        appendTo: require('./lib/appendTo'),
        apply: require('./lib/apply'),
        argN: require('./lib/argN'),
        arity: require('./lib/arity'),
        assoc: require('./lib/assoc'),
        assocPath: require('./lib/assocPath'),
        binary: require('./lib/binary'),
        bind: require('./lib/bind'),
        call: require('./lib/call'),
        chain: require('./lib/chain'),
        charAt: require('./lib/charAt'),
        charCodeAt: require('./lib/charCodeAt'),
        clone: require('./lib/clone'),
        cloneDeep: require('./lib/cloneDeep'),
        cloneObj: require('./lib/cloneObj'),
        commute: require('./lib/commute'),
        commuteMap: require('./lib/commuteMap'),
        comparator: require('./lib/comparator'),
        compose: require('./lib/compose'),
        concat: require('./lib/concat'),
        cond: require('./lib/cond'),
        construct: require('./lib/construct'),
        constructN: require('./lib/constructN'),
        contains: require('./lib/contains'),
        containsWith: require('./lib/containsWith'),
        converge: require('./lib/converge'),
        countBy: require('./lib/countBy'),
        createMapEntry: require('./lib/createMapEntry'),
        curry: require('./lib/curry'),
        curryN: require('./lib/curryN'),
        difference: require('./lib/difference'),
        differenceWith: require('./lib/differenceWith'),
        divide: require('./lib/divide'),
        empty: require('./lib/empty'),
        eq: require('./lib/eq'),
        eqProps: require('./lib/eqProps'),
        every: require('./lib/every'),
        filter: (function() {
            var filter = require('./lib/filter');
            filter.idx = require('./lib/filter.idx');
            return filter;
        }()),
        find: require('./lib/find'),
        findIndex: require('./lib/findIndex'),
        findLastIndex: require('./lib/findLastIndex'),
        flatten: require('./lib/flatten'),
        flip: require('./lib/flip'),
        foldl: require('./lib/foldl'),
        foldr: require('./lib/foldr'),
        forEach: (function() {
            var forEach = require('./lib/forEach');
            forEach.idx = require('./lib/forEach.idx');
            return forEach;
        }()),
        fromPairs: require('./lib/fromPairs'),
        func: require('./lib/func'),
        functions: require('./lib/functions'),
        functionsIn: require('./lib/functionsIn'),
        get: require('./lib/get'),
        groupBy: require('./lib/groupBy'),
        gt: require('./lib/gt'),
        gte: require('./lib/gte'),
        has: require('./lib/has'),
        hasIn: require('./lib/hasIn'),
        head: require('./lib/head'),
        identity: require('./lib/identity'),
        ifElse: require('./lib/ifElse'),
        indexOf: (function() {
            var indexOf = require('./lib/indexOf');
            indexOf.from = require('./lib/indexOf.from');
            return indexOf;
        }()),
        insert: (function() {
            var insert = require('./lib/insert');
            insert.all = require('./lib/insert.all');
            return insert;
        }()),
        installTo: function installTo(obj) {
            return R._extend(obj, R);
        },
        intersection: require('./lib/intersection'),
        intersectionWith: require('./lib/intersectionWith'),
        invokerN: require('./lib/invokerN'),
        is: require('./lib/is'),
        isArrayLike: require('./lib/isArrayLike'),
        isEmpty: require('./lib/isEmpty'),
        isSet: require('./lib/isSet'),
        join: require('./lib/join'),
        keys: require('./lib/keys'),
        keysIn: require('./lib/keysIn'),
        lPartial: require('./lib/lPartial'),
        last: require('./lib/last'),
        lastIndexOf: (function() {
            var lastIndexOf = require('./lib/lastIndexOf');
            lastIndexOf.from = require('./lib/lastIndexOf.from');
            return lastIndexOf;
        }()),
        length: require('./lib/length'),
        lens: require('./lib/lens'),
        lift: require('./lib/lift'),
        liftN: require('./lib/liftN'),
        lt: require('./lib/lt'),
        lte: require('./lib/lte'),
        map: (function() {
            var map = require('./lib/map');
            map.idx = require('./lib/map.idx');
            return map;
        }()),
        mapObj: (function() {
            var mapObj = require('./lib/mapObj');
            mapObj.idx = require('./lib/mapObj.idx');
            return mapObj;
        }()),
        match: require('./lib/match'),
        mathMod: require('./lib/mathMod'),
        max: require('./lib/max'),
        maxBy: require('./lib/maxBy'),
        memoize: require('./lib/memoize'),
        min: require('./lib/min'),
        minBy: require('./lib/minBy'),
        mixin: require('./lib/mixin'),
        modulo: require('./lib/modulo'),
        multiply: require('./lib/multiply'),
        nAry: require('./lib/nAry'),
        not: require('./lib/not'),
        nth: require('./lib/nth'),
        of: require('./lib/of'),
        omit: require('./lib/omit'),
        once: require('./lib/once'),
        op: require('./lib/op'),
        or: require('./lib/or'),
        pCompose: require('./lib/pCompose'),
        pPipe: require('./lib/pPipe'),
        partition: require('./lib/partition'),
        path: require('./lib/path'),
        pathEq: require('./lib/pathEq'),
        pathOn: require('./lib/pathOn'),
        pick: require('./lib/pick'),
        pickAll: require('./lib/pickAll'),
        pickBy: require('./lib/pickBy'),
        pipe: require('./lib/pipe'),
        pluck: require('./lib/pluck'),
        prepend: require('./lib/prepend'),
        prependTo: require('./lib/prependTo'),
        product: require('./lib/product'),
        project: require('./lib/project'),
        prop: require('./lib/prop'),
        propEq: require('./lib/propEq'),
        propOf: require('./lib/propOf'),
        propOr: require('./lib/propOr'),
        props: require('./lib/props'),
        rPartial: require('./lib/rPartial'),
        range: require('./lib/range'),
        reduce: (function() {
            var reduce = require('./lib/reduce');
            reduce.idx = require('./lib/reduce.idx');
            return reduce;
        }()),
        reduceRight: (function() {
            var reduceRight = require('./lib/reduceRight');
            reduceRight.idx = require('./lib/reduceRight.idx');
            return reduceRight;
        }()),
        reject: (function() {
            var reject = require('./lib/reject');
            reject.idx = require('./lib/reject.idx');
            return reject;
        }()),
        remove: require('./lib/remove'),
        repeatN: require('./lib/repeatN'),
        replace: require('./lib/replace'),
        reverse: require('./lib/reverse'),
        scanl: require('./lib/scanl'),
        skip: require('./lib/skip'),
        skipUntil: require('./lib/skipUntil'),
        slice: require('./lib/slice'),
        some: require('./lib/some'),
        sort: require('./lib/sort'),
        sortBy: require('./lib/sortBy'),
        split: require('./lib/split'),
        strIndexOf: require('./lib/strIndexOf'),
        strLastIndexOf: require('./lib/strLastIndexOf'),
        substring: require('./lib/substring'),
        substringFrom: require('./lib/substringFrom'),
        substringTo: require('./lib/substringTo'),
        subtract: require('./lib/subtract'),
        sum: require('./lib/sum'),
        tail: require('./lib/tail'),
        take: require('./lib/take'),
        takeWhile: require('./lib/takeWhile'),
        tap: require('./lib/tap'),
        times: require('./lib/times'),
        toLowerCase: require('./lib/toLowerCase'),
        toPairs: require('./lib/toPairs'),
        toPairsIn: require('./lib/toPairsIn'),
        toUpperCase: require('./lib/toUpperCase'),
        trim: require('./lib/trim'),
        type: require('./lib/type'),
        unapply: require('./lib/unapply'),
        unary: require('./lib/unary'),
        unfoldr: require('./lib/unfoldr'),
        union: require('./lib/union'),
        unionWith: require('./lib/unionWith'),
        uniq: require('./lib/uniq'),
        unnest: require('./lib/unnest'),
        useWith: require('./lib/useWith'),
        values: require('./lib/values'),
        valuesIn: require('./lib/valuesIn'),
        version: require('./lib/version'),
        where: require('./lib/where'),
        wrap: require('./lib/wrap'),
        xprod: require('./lib/xprod'),
        zip: require('./lib/zip'),
        zipObj: require('./lib/zipObj'),
        zipWith: require('./lib/zipWith')
    };
    return R;
}));
