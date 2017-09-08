'use strict';

var t = require('babel-types');

var buildIIFEClass = function(constructorPath, methodPaths) {
  var className = constructorPath.get('id.name').node;

  var methods = methodPaths.map(function(methodPath) {
    return methodPath.node;
  });

  var body = t.blockStatement(
    [constructorPath.node]
    .concat(methods)
    .concat(t.returnStatement(
      t.identifier(className)
    ))
  );

  return t.variableDeclaration(
    'var',
    [
      t.variableDeclarator(
        t.identifier(className),
        t.callExpression(
          t.functionExpression(
            null,
            [],
            body
          ),
          []
        )
      )
    ]
  );
};

/*
  before
  function _Set() {}
  _Set.prototype.add = function(item) { ... };
  _Set.prototype.has = function(item) { ... };

  after
  var _Set = (function(){
    function _Set() {}
    _Set.prototype.add = function(item) { ... };
    _Set.prototype.has = function(item) { ... };
    return _Set;
  }())
*/
var functionDeclarationVisitor = function(path) {
  if (!path.getStatementParent().parentPath.isProgram()) {
    return;
  }

  var maybeClassName = path.get('id.name').node;

  var methodPaths = path.getAllNextSiblings().filter(function(sibling) {
    if (!sibling.isExpressionStatement()) {
      return false;
    }

    var expression = sibling.get('expression');

    if (!expression.isAssignmentExpression()) {
      return false;
    }

    var left = expression.get('left');

    if (!left.isMemberExpression()) {
      return false;
    }

    var leftObject = left.get('object');

    if (!leftObject.isMemberExpression()) {
      return false;
    }

    return leftObject.get('object').isIdentifier({ name: maybeClassName })
        && leftObject.get('property').isIdentifier({ name: 'prototype' });
  });

  if (methodPaths.length === 0) {
    return;
  }

  path.replaceWith(buildIIFEClass(path, methodPaths));
  methodPaths.forEach(function(methodPath) {
    methodPath.remove();
  });
};

module.exports = function() {
  return {
    visitor: {
      FunctionDeclaration: functionDeclarationVisitor
    }
  };
};
