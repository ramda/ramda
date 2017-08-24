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

var exportDefaultDeclarationVisitor = function(path) {
  var declaration = path.get('declaration');

  if (declaration.isFunctionDeclaration()) {
    var id = declaration.node.id;
    if (id) {
      path.replaceWithMultiple([
        declaration.node,
        buildExportsAssignment(
          t.identifier(id.name)
        )
      ]);
    } else {
      path.replaceWith(
        buildExportsAssignment(declaration)
      );
    }
  } else if (declaration.isClassDeclaration()) {
    throw path.buildCodeFrameError('Exporting ClassDeclaration is not implemented');
  } else {
    path.replaceWith(
      buildExportsAssignment(declaration.node)
    );
  }
};

var exportNamedDeclarationVisitor = function(path, state) {
  var defaultReexportSpecifier = path.get('specifiers')[0];
  var local = defaultReexportSpecifier.get('local').get('name').node;
  var exported = defaultReexportSpecifier.get('exported').get('name').node;

  if (local !== 'default') {
    throw path.buildCodeFrameError('Only named exports allowed are reexports in index.js');
  }

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
