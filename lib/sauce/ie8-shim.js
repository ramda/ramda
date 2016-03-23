/* eslint-env browser */

// redefine `require` since old IE is too dumb to handle shadowing the `R` variable in the required modules.
window.ramda = window.R;

window.require = function require(path) {
  switch (path.substr(path.lastIndexOf('/') + 1)) {
    case 'assert':
      return window.assert;
    case '..':
      return this.ramda;
    default:
      throw new Error('Unexpected require path "' + path + '"');
  }
};

if (typeof document.getElementsByClassName !== 'function') {
  document.getElementsByClassName = function(className, nodeName) {
    var result = [];
    var tag = nodeName || '*';
    var node, seek, i;
    if (document.evaluate) {
      seek = '//' + tag + '[@class="' + className + '"]';
      seek = document.evaluate(seek, document, null, 0, null);
      while ((node = seek.iterateNext())) {
        result.push(node);
      }
    } else {
      var rightClass = new RegExp('(^| )' + className + '( |$)');
      seek = document.getElementsByTagName(tag);
      for (i = 0; i < seek.length; i += 1) {
        if (rightClass.test((node = seek[i]).className)) {
          result.push(seek[i]);
        }
      }
    }
    return result;
  };
}
