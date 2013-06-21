(function (root, factory) {if (typeof exports === 'object') {module.exports = factory(root, require('../../eweda'));} else if (typeof define === 'function' && define.amd) {define(['global', 'eweda'], factory);} else {root.model = factory(root, root.eweda);}}(this, function (global, eweda) {
    eweda.inContext(global);
    var omitName = omit(['name']);
    var namedObj = foldl(function(o1, o2) {o1[o2.name] = omitName(o2); return o1;}, {});
    return (function() {
        return {
            getPaddockOverview: function(farm) {
                var joined = filter(function(x) {return x[0].name === x[1].paddock;}, xprod(farm.paddocks, farm.horses));
                var combine = function(x){return foldl1(function(paddock, horse) {
                    (paddock.horses || (paddock.horses = [])).push(horse.name); return paddock;}, x);
                };
                return namedObj(map(pick(['capacity', 'fence', 'name', 'horses']), map(combine, joined)));
            }
        };
    }());
}));