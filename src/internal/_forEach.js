module.exports = function _forEach(fn, list) {
    for (var idx = 0, len = list.length; idx < len; idx += 1) {
        fn(list[idx]);
    }
    return list;
};
