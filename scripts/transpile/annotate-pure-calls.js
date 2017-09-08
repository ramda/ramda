'use strict';
var PURE_ANNOTATION = '#__PURE__';


//  before
//  var add = _curry2(function add(a, b) { ... })
//
//  after
//  var add = /*#__PURE__*/_curry2(function add(a, b) { ... })

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
