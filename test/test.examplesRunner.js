var assert = require('assert');
var fs = require('fs');
var R = require('..');
var ramdaDocs = require('./../scripts/doc-parser');

var assertPairEqual = function assertPairEqual(testInfo) {
    var msg = testInfo.description + ' === ' + testInfo.expected;
    return assert.deepEqual(testInfo.expression, testInfo.expected, msg);
};

var requireFromStr = function requireFromStr(src, filename) {
    var m = new module.constructor();
    m.paths = module.paths;
    m._compile(src, filename);
    return m.exports;
};

var wrap = R.curry(function(pre, post, s) {
    return pre + s + post;
});

var mixWith = R.curry(function mixWith(keyFnPairs, obj) {
    var idx = -1;
    var newData = {};
    var pair;
    while (++idx < keyFnPairs.length) {
        pair = keyFnPairs[idx];
        newData[pair[0]] = pair[1](obj);
    }
    return R.mixin(obj, newData);
});

var processExample = function processExample(docs) {
    if (docs.testExample) {
        // we have testable source, run example
        var fnName = 'runExample_' + docs.name.replace(/\W/g, '_') + '_' + docs.line;
        var fn = getNamedExampleFunction(fnName);
        fn(docs);
    }
};

var getNamedExampleFunction = function getNamedExampleFunction(fnName) {
    var tmp = new Function('runExampleFn', 'return function ' + fnName + '(docs){ runExampleFn(docs); };');
    return tmp(runExample);
};

var runExample = function runExample(docs) {
    var RTest = requireFromStr(docs.testWrapper(docs.testExample), 'exampleTester');
    var testData = RTest.testExample();
    it('compile and test ' + docs.name + ' examples (' + testData.length + ')', function() {
        R.map(assertPairEqual, testData);
    });
};

var getTestExample = function getExampleSource(docs) {
    // convert multiline command + output to single line for testing
    var testableSource = docs.example.replace(/^(.*?;.*)$\s*?(\/\/=>.*)$/mg, '$1 $2');

    // convert lines of the form
    // var x = myFunc('something'); //=> 'output'
    // to two test_lines so we can test output
    testableSource = testableSource.replace(/^\s*(var (\w+).*?;).*?(\/\/=>\s*.*)$/mg, '$1\n$2; $3\n');

    // get rid of console.log so we're not printing stuff while running tests
    testableSource = testableSource.replace(/console\.log\(.*\);/mg, ';');

    return R.map(getTestLine, testableSource.split('\n')).join('\n');
};

var getTestLine = function getTestLine(line) {
    line = line.trim();
    // check for test output
    var matches = line.match(/^(.*);\s*\/\/=>\s*(.+?)(\/\/.+$|$)/);
    if (matches) {
        var expression = matches[1];
        var expected = matches[2];
        var testInfoStr = '';

        // special case for NaN (NaN === NaN => false)
        if (expected === 'NaN') {
            expression = 'String(' + expression + ')';
            expected = 'String(NaN)';
        }
        testInfoStr += '_tests.push({';
        testInfoStr += 'expression:'   + expression + ',';
        testInfoStr += 'expected:'     + expected + ',';
        testInfoStr += 'description:"(' + expression.replace(/"/g, '\\"') + ' => "+' + expression + '+")"';
        testInfoStr += '});';
        return testInfoStr;
    } else {
        return line;
    }
};

// get ramda source
var ramdaSource = String(fs.readFileSync('./ramda.js'));

// prepare our source code to inject examples
var sourceForCompliation = R.split('// All the functional goodness, wrapped in a nice little package, just for you!', ramdaSource);
var exampleStart = 'R.testExample = function(){\nvar _tests = [];\n';
var exampleEnd = '\nreturn _tests;\n};\n';
var testWrapper = wrap(sourceForCompliation[0] + exampleStart, exampleEnd + sourceForCompliation[1]);

// filter functions that have examples
var testFuncs = R.filter(R.and(R.has('func'), R.has('example')), ramdaDocs);
testFuncs = R.map(mixWith([
    ['testExample', getTestExample],
    ['testWrapper', R.always(testWrapper)]
]), testFuncs);

// process examples
describe('example tests', function() {
    R.forEach(processExample, testFuncs);
});
