module.exports = function _map(fn, list) {
    var result = [];
    for (var idx = 0, len = list.length; idx < len; idx += 1) {
        result.push(fn(list[idx]));
    }
    return result;
};
