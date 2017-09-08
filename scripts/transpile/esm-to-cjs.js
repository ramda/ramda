'use strict';
var t = require('babel-types');

var buildImportAssignment = function(id, source) {
  return t.variableDeclaration(
    'var',
    [
      t.variableDeclarator(
        t.identifier(id),
        t.callExpression(
          t.identifier('require'),
          [t.stringLiteral(source)]
        )
      )
    ]
  );
};

var buildExportsAssignment = function(node, property) {
  var moduleExports = t.memberExpression(
    t.identifier('module'),
    t.identifier('exports')
  );
  var left = !property
    ? moduleExports
    : t.memberExpression(
        moduleExports,
        t.identifier(property)
      );
  return t.expressionStatement(
    t.assignmentExpression(
      '=',
      left,
      node
    )
  );
};

/*
  before
  import curryN from './curryN';

  after
  var curryN = require('./curryN');
*/
var importDeclarationVisitor = function(path) {
  var importSource = path.node.source.value;
  var defaultSpecifier = path.get('specifiers')[0];
  defaultSpecifier.assertImportDefaultSpecifier();

  path.replaceWith(
    buildImportAssignment(
      defaultSpecifier.get('local').get('name').node,
      importSource
    )
  );
};

/*
  before
  export default curryN;

  after
  module.exports = curryN;
*/
var exportDefaultDeclarationVisitor = function(path) {
  var declaration = path.get('declaration');

  if (declaration.isFunctionDeclaration()) {
    // case of export default function compose() {}
    var id = declaration.node.id;
    if (id) {
      /*
        aligning with es modules specification
        exported identifiers have file scope (top level)
        so the declaration is split into 2 lines:

        function compose() {}
        module.exports = compose;

        this makes `compose` being hoisted
        and visible in the whole file
      */
      path.replaceWithMultiple([
        declaration.node,
        buildExportsAssignment(
          t.identifier(id.name)
        )
      ]);
    } else {
      // if the function is anonymous we can just use simpler 1 line case
      path.replaceWith(
        buildExportsAssignment(declaration)
      );
    }
  } else if (declaration.isClassDeclaration()) {
    throw path.buildCodeFrameError('Exporting ClassDeclaration is not implemented');
  } else {
    // simple case of - export default curryN;
    path.replaceWith(
      buildExportsAssignment(declaration.node)
    );
  }
};

/*
  before
  export { default as curryN } from './curryN';

  after
  module.exports.curryN = require('./curryN');
*/
var exportNamedDeclarationVisitor = function(path, state) {
  var defaultReexportSpecifier = path.get('specifiers')[0];
  var local = defaultReexportSpecifier.get('local').get('name').node;
  var exported = defaultReexportSpecifier.get('exported').get('name').node;

  if (local !== 'default') {
    throw path.buildCodeFrameError('Only named exports allowed are reexports in index.js');
  }

  // used by Program's exit visitor
  state.set('reexports', true);

  path.replaceWith(
    buildExportsAssignment(
      t.callExpression(
        t.identifier('require'),
        [t.stringLiteral(path.node.source.value)]
      ),
      exported
    )
  );
};

module.exports = function() {
  return {
    visitor: {
      Program: {
        enter: function(path) {
          // rename these commonjs variables if they're declared in the file
          path.scope.rename('module');
          path.scope.rename('exports');
          path.scope.rename('require');
        },
        exit: function(path, state) {
          if (!state.get('reexports')) {
            return;
          }

          // adding module.exports = {}; at the top of the index.js file
          path.unshiftContainer(
            'body',
            buildExportsAssignment(
              t.objectExpression([])
            )
          );
        }
      },
      ImportDeclaration: importDeclarationVisitor,
      ExportDefaultDeclaration: exportDefaultDeclarationVisitor,
      ExportNamedDeclaration: exportNamedDeclarationVisitor
    }
  };
};
