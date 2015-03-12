module.exports = function _not(f) {
    return function() {return !f.apply(this, arguments);};
};
