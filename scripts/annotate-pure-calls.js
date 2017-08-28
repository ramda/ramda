'use strict';
var t = require('babel-types');

var PURE_ANNOTATION = '#__PURE__';

var variableDeclaratorVisitor = function(path) {
  var parentPath = path.findParent(function(p) {
    return p.isVariableDeclaration();
  });

  if (!parentPath.parentPath.isProgram()) {
    return;
  }

  path.addComment('leading', PURE_ANNOTATION);
};

var assignmentExpressionVisitor = function(path) {
  var parentPath = path.findParent(function(p) {
    return p.isStatement();
  });

  if (!parentPath.parentPath.isProgram()) {
    return;
  }

  path.addComment('leading', PURE_ANNOTATION);
};

var callExpressionVisitor = function(path) {
  var parentPath = path.findParent(function(p) {
    return p.isStatement();
  });

  if (!parentPath.parentPath.isProgram()) {
    return;
  }

  path.addComment('leading', PURE_ANNOTATION);

  // var parentPath = path.parentPath;

  // if (parentPath.isVariableDeclarator()) {
  //   variableDeclaratorVisitor(path);
  //   return;
  // }

  // if (parentPath.isAssignmentExpression()) {
  //   assignmentExpressionVisitor(path);
  //   return;
  // }
};

module.exports = function() {
  return {
    visitor: {
      CallExpression: callExpressionVisitor
    }
  };
};
