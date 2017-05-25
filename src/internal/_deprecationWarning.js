var append = require('../append');
var contains = require('../contains');
var join = require('../join');

module.exports = (function() {

    var alreadyLogged = [];

    function _addLogged(name) {
        alreadyLogged = append(name, alreadyLogged);
    }

    function _isLogged(name) {
        return contains(name, alreadyLogged);
    }

    function logMessage(opts) {
        var message;
        if (console) {
            message = join('', ['R.', opts.oldName, ' has been deprecated. Please use R.', opts.newName, ' instead.']);
            if (opts.optionalMessage) {
                message = join(' ', [message, opts.optionalMessage]);
            }
            console.warn(message);
            _addLogged(opts.oldName);
        }
    }

    return function _deprecationWarning(opts) {
        if (!_isLogged(opts.oldName)) {
            logMessage(opts);
        }
        return opts.fn;
    };
}());
