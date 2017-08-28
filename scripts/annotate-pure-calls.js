'use strict';
var PURE_ANNOTATION = '#__PURE__';

var callExpressionVisitor = function(path) {
  var parentPath = path.findParent(function(p) {
    return p.isStatement();
  });

  if (!parentPath.parentPath.isProgram()) {
    return;
  }

  path.addComment('leading', PURE_ANNOTATION);
};

module.exports = function() {
  return {
    visitor: {
      CallExpression: callExpressionVisitor
    }
  };
};
