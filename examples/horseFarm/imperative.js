(function (root, factory) {if (typeof exports === 'object') {module.exports = factory(root);} else if (typeof define === 'function' && define.amd) {define(factory);} else {root.model = factory(root);}}(this, function (global) {
    return (function() {
        return {
            getPaddockOverview: function(farm) {
                var result = {}, horses = farm.horses, horse, paddocks = farm.paddocks,
                    paddock, horseList, newPaddock, i, len;
                for (i = 0, len = paddocks.length; i < len; i++) {
                    paddock = paddocks[i];
                    horseList = [];
                    newPaddock = {capacity: paddock.capacity, fence: paddock.fence, horses: horseList};
                    result[paddock.name] = newPaddock;
                }
                for (i = 0, len = horses.length; i < len; i++) {
                    horse = horses[i];
                    paddock = result[horse.paddock];
                    paddock.horses.push(horse);
                }
                return result;
            }
        }
    }());
}));
