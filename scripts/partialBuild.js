var path = require('path');
var rollup = require('rollup');
var rollupConfig = require('../rollup.config.js');

var partialBuildPlugin = partialBuild({
  input: rollupConfig.input,
  modules: [].slice.call(process.argv, 2)
});

rollupConfig.plugins.push(partialBuildPlugin);

rollup.rollup(rollupConfig).then(function(bundle) {
  return bundle.generate(rollupConfig.output);
}).then(function(result) {
  process.stdout.write(result.code);
});

function partialBuild(options) {
  const absoluteInput = path.join(__dirname, '..', options.input);
  return {
    name: 'ramda-partial-build',
    transform: function(code, id) {
      if (id !== absoluteInput) {
        return;
      }

      return {
        code: options.modules.map(function(module) {
          return 'export { default as ' + module + " } from './" + module + "';";
        }).join('\n')
      };
    }
  };
}
