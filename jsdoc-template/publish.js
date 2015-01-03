var path = require('jsdoc/path');
var fs = require('jsdoc/fs');
var helper = require('jsdoc/util/templateHelper');

var marked = require('marked');
var hljs = require('highlight.js');
var Handlebars = require('handlebars');

var R = require('../dist/ramda');

function valueForTitle(t, xs) {
    var data = R.find(R.where({title: t}), xs);
    return (data && data.value) || '';
}

var unprefix = R.pipe(
    R.split('R.'),
    R.prop(1)
);

var trimCode = R.pipe(
    R.split(/\n/),
    R.map(R.trim),
    R.join('\n')
);

var prettifySig = R.pipe(
    R.replace(/\.{3}/g, '\u2026'),
    R.replace(/->/g, '\u2192')
);

var prettifyCode = R.pipe(
    R.join('\n'),
    trimCode,
    R.lPartial(hljs.highlight, 'javascript'),
    R.prop('value')
);

function simplifyData(d) {
    var params = d.params || [];
    var returns = (d.returns || [])[0];
    var see = d.see || [];
    var examples = prettifyCode(d.examples || []);
    var sig = prettifySig(valueForTitle('sig', d.tags) || '');
    return {
        name: d.name || '',
        sig: sig,
        category: valueForTitle('category', d.tags) || '',
        params: params.map(function(p) {
            return {
                type: p.type.names[0] || '',
                description: marked(p.description || ''),
                name: p.name || ''
            };
        }),
        returns: {
            type: returns ? returns.type.names[0] : '',
            description: marked((returns && returns.description) || '')
        },
        see: see.map(unprefix),
        description: marked(d.description || ''),
        example: examples
    };
}

function embedData(d) {
    return {
        name: d.name,
        category: d.category
    };
}

var nonPrivateAccess = R.pipe(
    R.prop('access'),
    R.not(R.eq('private'))
);

// For embedding a JSON blob with documentation data inside the HTML.
Handlebars.registerHelper('json', function(obj) {
    var json = JSON.stringify(obj);
    return new Handlebars.SafeString(json);
});

// For embedding README.md as the main page.
Handlebars.registerPartial('readme', function() {
    return new Handlebars.SafeString(readme);
});

var readFile = R.rPartial(fs.readFileSync, 'utf-8');
var writeFile = R.rPartial(fs.writeFileSync, 'utf-8');

var loadTemplate = R.pipe(readFile, Handlebars.compile);
var loadJson = R.pipe(readFile, JSON.parse);
var loadMarkdown = R.pipe(readFile, marked);

var docTmpl = loadTemplate('jsdoc-template/docs.html.handlebars');
var indexTmpl = loadTemplate('jsdoc-template/index.html.handlebars');

var pkg = loadJson('package.json');
var readme = loadMarkdown('README.md');

function publish(data, opts) {
    data = helper.prune(data);
    var fullData = data()
        .order('name, version, since')
        .filter({kind: 'function'})
        .get()
        .filter(nonPrivateAccess)
        .map(simplifyData);
    var embeddedData = fullData.map(embedData);
    var docHtml = docTmpl({
        version: pkg.version,
        data: embeddedData,
        docs: fullData
    });
    var indexHtml = indexTmpl({
        version: pkg.version
    });
    fs.mkdirSync(path.resolve(opts.destination, 'docs'));
    writeFile(path.resolve(opts.destination, 'index.html'), indexHtml);
    writeFile(path.resolve(opts.destination, 'docs/index.html'), docHtml);
}

module.exports =  {
    publish: publish
};
