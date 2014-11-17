var assert = require('assert');
var fs = require('fs');
var R = require('..');
var dox = require('dox');

// simple object to hold info about our examples
function ExampleTest(dox_info, original_source, alias_of) {
    this.func_name = this.getFunctionName(dox_info.code);
    this.line_number = dox_info.line;
    this.original_source = original_source;
    this.alias_of = alias_of;
    this.testable_source = this.getTestableSource();
}

ExampleTest.prototype.getFunctionName = function(code) {
    var func_lines = code.split('\n').slice(0, 2);
    if (func_lines.length === 0) {
        return false;
    }
    var matches, func_line = (func_lines[0].indexOf('TODO') !== -1 && func_lines.length > 1) ? func_lines[1] : func_lines[0];
    if ((matches = func_line.match(/^function (\w+)/)) !== null) {
        return matches[1];
    } else if ((matches = func_line.match(/([\w\.]+\s*=\s*)+/)) !== null) {
        var names = R.reject(R.isEmpty, R.map(R.invokerN(0, 'trim'), matches[0].split('=')));
        var ramda_func = R.find(R.match(/^R\./), names);
        return (names.length === 0) ? false : ((R.isEmpty(ramda_func)) ? names[0] : ramda_func);
    } else {
        return false;
    }
};

// make some minor adjustments to our example source so we can test output
ExampleTest.prototype.getTestableSource = function() {
    if (!this.original_source) {
        return false;
    }
    // convert multiline command + output to single line for testing
    var testable_source = this.original_source.replace(/^(.*?;.*)$\s*?(\/\/=>.*)$/mg, '$1 $2');

    // convert lines of the form
    // var x = myFunc('something'); //=> 'output'
    // to two test_lines so we can test output
    testable_source = testable_source.replace(/^\s*(var (\w+).*?;).*?(\/\/=>\s*.*)$/mg, '$1\n$2; $3\n');

    // get rid of console.log so we're not printing stuff while running tests
    testable_source = testable_source.replace(/console\.log\(.*\);/mg, ';');

    var test_lines = R.map(this.getTestLine.bind(this), testable_source.split('\n'));
    return test_lines.join('\n');
};

// check line for sample output, add to our _tests array
ExampleTest.prototype.getTestLine = function(line) {
    line = line.trim();
    var matches = line.match(/^(.*);\s*\/\/=>\s*(.+?)(\/\/.+$|$)/);
    if (matches) {
        var expression = matches[1],
          expected = matches[2],
          test_info_str = '';

        // special case for NaN (NaN === NaN => false)
        if (expected === 'NaN') {
            expression = 'String(' + expression + ')';
            expected = 'String(NaN)';
        }
        test_info_str += '_tests.push({';
        test_info_str += 'expression:'   + expression + ',';
        test_info_str += 'expected:'     + expected + ',';
        test_info_str += 'description:"(' + expression.replace(/"/g, '\\"') + ' => "+' + expression + '+")"';
        test_info_str += '});';
        return test_info_str;
    } else {
        return line;
    }
};

function splitAt(str, target) {
    if (!R.is(String, str)) {
        str = String(str);
    }
    var idx = str.indexOf(target);
    if (idx < 0) {
        return false;
    }
    return [str.substr(0, idx), str.substr(idx)];
}

function assertPairEqual(test_info) {
    var msg = test_info.description + ' === ' + test_info.expected;
    return assert.deepEqual(test_info.expression, test_info.expected, msg);
}

function requireFromStr(src, filename) {
    var m = new module.constructor();
    m.paths = module.paths;
    m._compile(src, filename);
    return m.exports;
}

function processExample(e, idx, all_examples) {
    // dox ends up with a few local functions and extra
    // functions from comments we don't need to worry about
    if (e.func_name === false) {
        return;
    }
    if (e.testable_source) {
        // we have testable source, run example
        var run_func_name = 'runExample_' + e.func_name.replace(/\W/g, '_') + '_' + e.line_number;
        runExample[run_func_name] = function(etmp) { runExample(etmp); };
        runExample[run_func_name](e);
    } else {
        // see if e is alias for function with example
        checkForAliasExample(e, all_examples);
    }
}

function runExample(e) {
    var Rtest = requireFromStr(ramda_wrap(example_wrap(e.testable_source)), 'example_tester');
    var test_data = Rtest.example_test();
    it('compile and test ' + e.func_name + ' examples (' + test_data.length + ')', function() {
        R.map(assertPairEqual, test_data);
    });
}

function checkForAliasExample(e) {
    it(e.func_name + ' has example or is an alias for function that has example', function() {
        // TODO: uncomment to enforce this
      //   if (R.isEmpty(e.alias_of)) {
      //       fail('undefined', 'example source', 'function has no example and no alias');
      //   } else {
      //       var alias_example = R.find(R.propEq('func_name', e.alias_of), examples);
      //       assert(!R.isEmpty(alias_example), 'was able to find original function for alias');
      //       assert(!R.isEmpty(alias_example.testable_source), 'original has a testable example');
      //   }
    });
}

// wrap a string
var wrap = R.curry(function(pre, post, s) {
    return pre + s + post;
});

// get the tags we need as a map
function tagListToMap(targets, list) {
    var map = {};
    R.forEach(function(x) {
        var val_key = targets[x.type];
        map[x.type] = x[val_key];
    }, list);
    return map;
}

var propIn = R.curry(function(prop_name, prop_vals, object) {
    return R.some(R.I, R.ap(R.map(R.propEq(prop_name), prop_vals), [object]));
});

// create our example objects from dox
function getExampleFromDox(dox_info) {
    var tags = R.filter(propIn('type', ['example', 'see', 'namespace']), dox_info.tags);
    var tag_map = tagListToMap({example: 'string', namespace: 'string', see: 'local'}, tags);
    if (tag_map.namespace) {
        // ignore namespaces
        return false;
    } else {
        return new ExampleTest(dox_info, tag_map.example, tag_map.see);
    }
}

// get ramda source
var ramda_source = String(fs.readFileSync('./ramda.js'));

// build dox
var ramda_dox = dox.parseComments(ramda_source);

// get our examples
var examples = R.filter(R.not(R.eq(false)), R.map.idx(getExampleFromDox, ramda_dox));

// prepare our source code to inject examples
var source_for_compliation = splitAt(ramda_source, '// All the functional goodness, wrapped in a nice little package, just for you!');
var ramda_wrap = wrap(source_for_compliation[0], source_for_compliation[1]);
var example_wrap = wrap('R.example_test = function(){\nvar _tests = [];\n', '\nreturn _tests;\n};\n');

// process examples
describe('example tests', function() {
    R.forEach.idx(processExample, examples);
});
