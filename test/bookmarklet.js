var assert = require('assert');
var childProcess = require('child_process');
var fs = require('fs');
var os = require('os');
var path = require('path');
var vm = require('vm');


describe('bookmarklet generator', function() {
  // The generator runs in Node, not in the browser test bundle.
  if (!process.versions || !process.versions.node) {
    return;
  }

  var root;
  var scriptNames = ['bookmarklet', 'bookmarklet.tmpl.js', 'BOOKMARKLET.tmpl.md'];

  beforeEach(function() {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'ramda-bookmarklet-'));
    fs.mkdirSync(path.join(root, 'scripts'));
    fs.mkdirSync(path.join(root, 'dist'));
    scriptNames.forEach(function(name) {
      fs.copyFileSync(path.join(__dirname, '../scripts', name), path.join(root, 'scripts', name));
    });
    fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({version: '1.2.3'}));
    fs.writeFileSync(path.join(root, 'BOOKMARKLET.md'), 'previous output');
  });

  afterEach(function() {
    scriptNames.forEach(function(name) {
      fs.unlinkSync(path.join(root, 'scripts', name));
    });
    fs.unlinkSync(path.join(root, 'dist/ramda.js'));
    fs.unlinkSync(path.join(root, 'package.json'));
    fs.unlinkSync(path.join(root, 'BOOKMARKLET.md'));
    fs.rmdirSync(path.join(root, 'scripts'));
    fs.rmdirSync(path.join(root, 'dist'));
    fs.rmdirSync(root);
  });

  function generate(bundle) {
    fs.writeFileSync(path.join(root, 'dist/ramda.js'), bundle);
    return childProcess.spawnSync(process.execPath, [path.join(root, 'scripts/bookmarklet')], {
      encoding: 'utf8',
      env: Object.assign({}, process.env, {NODE_PATH: path.join(__dirname, '../node_modules')})
    });
  }

  it('generates executable code and preserves an existing Ramda instance', function() {
    var result = generate('window.R = {value: 42};');
    assert.strictEqual(result.status, 0, result.stderr);
    var markdown = fs.readFileSync(path.join(root, 'BOOKMARKLET.md'), 'utf8');
    var script = markdown.match(/javascript:([^\n]+)/)[1];
    var messages = [];
    var context = {
      document: {
        createElement: function() { return {style: {}}; },
        body: {
          appendChild: function(toast) { messages.push(toast.innerHTML); },
          removeChild: function() {}
        }
      },
      setTimeout: function() {}
    };
    context.window = context;
    // A javascript: URL must not return a string that replaces the document.
    assert.notStrictEqual(typeof vm.runInNewContext(script, context), 'string');
    assert.strictEqual(context.R.value, 42);
    assert.deepStrictEqual(messages, ['Ramda v1.2.3 loaded']);

    var existing = context.R;
    assert.notStrictEqual(typeof vm.runInNewContext(script, context), 'string');
    assert.strictEqual(context.R, existing);
    assert.deepStrictEqual(messages, ['Ramda v1.2.3 loaded', 'This page already using ramda']);
  });

  it('reports a minification error without overwriting the previous output', function() {
    var result = generate('function (');
    assert.notStrictEqual(result.status, 0);
    assert.ok(result.stderr.length > 0);
    assert.strictEqual(fs.readFileSync(path.join(root, 'BOOKMARKLET.md'), 'utf8'), 'previous output');
  });
});
