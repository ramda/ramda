var _executePipe = require('./_executePipe');

module.exports = function _pipeWrapper(fns) {
    return function _innerPipeWrapper() {
        return _executePipe.call(this, fns, arguments);
        _log('compose', 'pipe wrap execute');
        return _executeComposition(fns, arguments, 0, fns.length, 1);
    };
};
