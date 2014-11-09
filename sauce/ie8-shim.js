/* jshint browser: true */

// redefine `require` since old IE is too dumb to handle shadowing the `R` variable in the required modules.
window.require = function require(path) {
    switch (path.substr(path.lastIndexOf('/') + 1)) {
        case 'assert':
            return window.assert;
        case '..':
            return this.R;
        case 'lazylist':
            return this.R.lazylist;
        default:
            throw new Error('Unexpected require path "' + path + '"');
    }
};

if (typeof document.getElementsByClassName !== 'function') {
    document.getElementsByClassName = function(className, nodeName) {
        var result = [], tag = nodeName || '*', node, seek, i;
        if (document.evaluate) {
            seek = '//' + tag + '[@class="' + className + '"]';
            seek = document.evaluate(seek, document, null, 0, null);
            while ((node = seek.iterateNext())) {
                result.push(node);
            }
        } else {
            var rightClass = new RegExp('(^| )' + className + '( |$)');
            seek = document.getElementsByTagName(tag);
            for (i = 0; i < seek.length; i++) {
                if (rightClass.test((node = seek[i]).className)) {
                    result.push(seek[i]);
                }
            }
        }
        return result;
    };
}
