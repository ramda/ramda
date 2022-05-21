let Path = require('path');
let FS = require('fs');

let Dox = require('dox');

const TYPES_DIR = './types';
const SOURCE_DIR = './source';
const OUTPUT_DIR = './es';

let mk_type_file = (path) => {
  return {
    path,
    exports: null,
    docs: null
  };
};

let mk_docs = (src) => {
  let dox = Dox.parseComments(src, { raw: true })[0];
  let desc = (dox.description && dox.description.full) || '';
  let tags = dox.tags || [];
  let see = get_tag_val(tags, 'see');
  let example = get_tag_val(tags, 'example');
  return { desc, see, example };
};

let get_tag_val = (tags, key) => {
  let maybe_tag = tags.find(x => x.type == key);
  return ((maybe_tag && maybe_tag.string) || '').trim();
};

let read_type_file = (x) => {
  let lines = FS.readFileSync(x.path).toString().split('\n');

  let i;
  for (i = 0; !/^export /.test(lines[i]); i += 1) {
  }
  let exports = lines.slice(i).join('\n');

  return {
    path: x.path,
    exports
  };
};

let attach_docs_from_js_file = (x) => {
  let path = Path.parse(x.path);
  let js_file = path.base.replace(/\.d\.ts$/, '.js');
  let js_path = `${SOURCE_DIR}/${js_file}`;
  if (!FS.existsSync(js_path)) {
    return null;
  }
  let docs = mk_docs(FS.readFileSync(js_path).toString());
  return Object.assign({}, x, { docs });
};

let read = () => {
  return (
    FS
      .readdirSync(TYPES_DIR)
      .filter(x => /\.d\.ts$/.test(x))
      .map(filename => mk_type_file(`${TYPES_DIR}/${filename}`))
      .map(read_type_file)
      .map(attach_docs_from_js_file)
      .filter(x => x != null)
      .sort((a, b) => a.path.localeCompare(b.path))
  );
};

let gen_imports = (tools_path) => {
  let tools_exports_as_imports = (
    FS
      .readFileSync(tools_path)
      .toString()
      .split('\n')
      .map(x => /^export \w+ (\w+)/.exec(x))
      .filter(x => x != null)
      .map(x => `    ${x[1]},`)
      .join('\n')
  );
  return [
    'import * as _ from \'ts-toolbelt\';',
    'import {',
    tools_exports_as_imports,
    '} from \'./tools\';'
  ].join('\n');
};

let gen_desc = (desc) => {
  return desc.split('\n');
};

let gen_see = (see) => {
  if (see == '') {
    return [];
  } else {
    let ts_see = (
      see
        .split(',')
        .map(x => x.trim())
        .map(x => x.replace(/^R\./, ''))
        .map(x => `{@link ${x}}`)
        .join(', ')
    );
    return [`See also ${ts_see}`];
  }
};

let gen_example = (example) => {
  if (example == '') {
    return [];
  } else {
    return [
      '@example',
      '```typescript',
      ...(
        example
          .split('\n')
          .map(x => x.replace(/^     /, ''))
          .map(x => x.replace(/\s+$/, ''))
      ),
      '```'
    ];
  }
};

let as_comment = (lines, opts = { first_comment: false }) => {
  let comments = lines.map(x => ` * ${x}`);
  if (!opts.first_comment && lines.length > 0) {
    comments = [' *', ... comments];
  }
  return comments;
};

let gen_export = (x) => {
  let desc = gen_desc(x.docs.desc);
  let see = gen_see(x.docs.see);
  let example = gen_example(x.docs.example);
  let docs = [
    '/**',
    ...as_comment(desc, { first_comment: true }),
    ...as_comment(see),
    ...as_comment(example),
    ' */'
  ].join('\n');
  return `${docs}\n${x.exports}`;
};

let gen_exports = (exports) => {
  return exports.map(gen_export).join('\n\n');
};

let write = (exports) => {
  let tools_file = 'tools.d.ts';
  let tools_path = `${TYPES_DIR}/util/tools.d.ts`;

  let preamble = FS.readFileSync(`${TYPES_DIR}/util/index-preamble.d.ts`).toString();
  let imports_code = gen_imports(tools_path);
  let exports_code = gen_exports(exports);
  let other_exports = [
    'export * from \'./tools\';',
    'export as namespace R;'
  ].join('\n');

  let code = [
    preamble,
    imports_code,
    '',
    exports_code,
    '',
    '',
    other_exports
  ].join('\n');

  FS.writeFileSync(`${OUTPUT_DIR}/index.d.ts`, code);
  FS.copyFileSync(tools_path, `${OUTPUT_DIR}/${tools_file}`);
};

let main = () => {
  write(read());
};

main();
