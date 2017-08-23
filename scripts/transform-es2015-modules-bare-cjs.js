'use strict';
var t = require('babel-types');

var isRelativePath = function(path) {
  return path[0] === '.';
};

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

var buildExportsAssignment = function(node) {
  return t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(
        t.identifier('module'),
        t.identifier('exports')
      ),
      node
    )
  );
};

module.exports = function() {
  return {
    visitor: {
      Program: {
        exit: function(program) {
          // rename these commonjs variables if they're declared in the file
          program.scope.rename('module');
          program.scope.rename('exports');
          program.scope.rename('require');

          var body = program.get('body');
          var reexports = [];

          for (var i = 0; i < body.length; i += 1) {
            var path = body[i];

            if (path.isImportDeclaration()) {
              var importSpecifiers = path.get('specifiers');

              if (importSpecifiers.length !== 1) {
                throw path.buildCodeFrameError('Only default imports are allowed');
              }

              var defaultSpecifier = importSpecifiers[0];
              defaultSpecifier.assertImportDefaultSpecifier();

              var importSource = path.node.source.value;

              if (!isRelativePath(importSource)) {
                throw path.buildCodeFrameError('Only local imports are allowed - no external dependencies');
              }

              path.replaceWith(
                buildImportAssignment(
                  defaultSpecifier.get('local').get('name').node,
                  importSource
                )
              );
            } else if (path.isExportDefaultDeclaration()) {
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
            } else if (path.isExportNamedDeclaration()) {
              var exportSpecifiers = path.get('specifiers');

              if (exportSpecifiers.length !== 1) {
                throw path.buildCodeFrameError('Only named exports allowed are reexports in index.js');
              }

              var local = exportSpecifiers[0].get('local').get('name').node;

              if (local !== 'default') {
                throw path.buildCodeFrameError('Only named exports allowed are reexports in index.js');
              }

              var exported = exportSpecifiers[0].get('exported').get('name').node;

              reexports.push([
                exported,
                path.node.source.value
              ]);

              path.remove();

            } else if (path.isExportAllDeclaration()) {
              throw path.buildCodeFrameError('Only default export allowed');
            }
          }

          if (reexports.length !== 0) {
            var exportedProperties = reexports.map(function(reexport) {
              return t.objectProperty(
                t.identifier(reexport[0]),
                t.callExpression(
                  t.identifier('require'),
                  [t.stringLiteral(reexport[1])]
                )
              );
            });

            program.pushContainer(
              'body',
              buildExportsAssignment(
                t.objectExpression(exportedProperties)
              )
            );
          }
        }
      }
    }
  };
};
