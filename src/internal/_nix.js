module.exports = function _nix(f) {
    return function() {return !f.apply(this, arguments);};
};
