var _deprecationWarning = require('./internal/_deprecationWarning');
var merge = require('./merge');

module.exports = _deprecationWarning({
    oldName: 'mixin',
    newName: 'merge',
    fn: merge,
    optionalMessage: 'R.mixin will be removed in v1.0.0'
});
