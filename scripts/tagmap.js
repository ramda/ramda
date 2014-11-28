var R = require('../ramda');
var doctrine = require('doctrine');

var commentBegin = R.findIndex(function(line) { return line.match(/\/\*\*/); });

function commentEnd(lines) {
    var idx = R.findIndex(function(line) { return line.match(/\*\//); }, lines);
    return idx > -1 ? idx + 1 : idx;
};

function getComments(str) {
    var lines = R.split('\n', str);
    return R.slice(commentBegin(lines), commentEnd(lines), lines).join('\n');
};  

module.exports = function tagmap(str) {
    return doctrine.parse(getComments(str), {unwrap: true});
};
