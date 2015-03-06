module.exports = {
    init: function() { return []; },
    step: function(acc, x) { return acc.concat([x]); },
    result: function(x) { return x; }
};
