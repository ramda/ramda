module.exports = function _forEach(fn, list) {
    var idx = -1, len = list.length;
    while (++idx < len) {
        fn(list[idx]);
    }
    // i can't bear not to return *something*
    return list;
};
