var fs = require('jsdoc/fs');
var helper = require('jsdoc/util/templateHelper');

var marked = require('marked');
var hljs = require('highlight.js');

var R = require('../dist/ramda');

function valueForTitle(t, xs) {
    var data = R.find(R.where({ title: t }), xs);
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
    R.map(trimCode),
    R.join('\n'),
    R.lPartial(hljs.highlight, 'javascript'),
    R.prop('value')
);

function simplifyData(d) {
    var params = d.params || [];
    var returns = (d.returns || [])[0];
    var see = d.see || [];
    var examples = prettifyCode(d.examples || []);
    var sig = prettifySig(valueForTitle('sig', d.tags) || '')
    return {
        name: d.name || '',
        sig: sig,
        category: valueForTitle('category', d.tags) || '',
        params: params.map(function(p) {
            return {
                type: p.type.names[0] || '',
                description: marked(p.description || ''),
                name: p.name || ''
            }
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

function publish(data, opts, tutorials) {
    data = helper.prune(data);
    var obj = data()
        .order('name, version, since')
        .filter({ kind: 'function' })
        .map(simplifyData);
    var json = JSON.stringify(obj);
    var filename = 'docs/data.json';
    fs.writeFileSync(filename, json, 'utf-8');
    console.log('Finished writing documentation data to docs/data.json');
}

module.exports =  {
    publish: publish
};
