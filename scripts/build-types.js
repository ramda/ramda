const Path = require('path');
const FS = require('fs');

const Dox = require('dox');

const TYPES_DIR = './types';
const SOURCE_DIR = './source';
const OUTPUT_DIR = './es';

const mk_type_file = (path) => {
  return {
    path,
    exports: null,
    docs: null
  };
};

const mk_docs = (src) => {
  const dox = Dox.parseComments(src, { raw: true })[0];
  const desc = (dox.description && dox.description.full) || '';
  const tags = dox.tags || [];
  const see = get_tag_val(tags, 'see');
  const example = get_tag_val(tags, 'example');
  return { desc, see, example };
};

const get_tag_val = (tags, key) => {
  const maybe_tag = tags.find(x => x.type == key);
  return ((maybe_tag && maybe_tag.string) || '').trim();
};

const read_type_file = (x) => {
  const lines = FS.readFileSync(x.path).toString().split('\n');

  let i;
  for (i = 0; !/^export /.test(lines[i]); i += 1) {
  }
  const exports = lines.slice(i).join('\n');

  return {
    path: x.path,
    exports
  };
};

const attach_docs_from_js_file = (x) => {
  const path = Path.parse(x.path);
  const js_file = path.base.replace(/\.d\.ts$/, '.js');
  const js_path = `${SOURCE_DIR}/${js_file}`;
  if (!FS.existsSync(js_path)) {
    return null;
  }
  const docs = mk_docs(FS.readFileSync(js_path).toString());
  return Object.assign({}, x, { docs });
};

const read = () => {
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

const gen_imports = (tools_path) => {
  const tools_exports_as_imports = (
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

const gen_desc = (desc) => {
  return desc.split('\n');
};

const gen_see = (see) => {
  if (see == '') {
    return [];
  } else {
    const ts_see = (
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

const gen_example = (example) => {
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

const as_comment = (lines, opts = { first_comment: false }) => {
  let comments = lines.map(x => ` * ${x}`);
  if (!opts.first_comment && lines.length > 0) {
    comments = [' *', ... comments];
  }
  return comments;
};

const gen_export = (x) => {
  const desc = gen_desc(x.docs.desc);
  const see = gen_see(x.docs.see);
  const example = gen_example(x.docs.example);
  const docs = [
    '/**',
    ...as_comment(desc, { first_comment: true }),
    ...as_comment(see),
    ...as_comment(example),
    ' */'
  ].join('\n');
  return `${docs}\n${x.exports}`;
};

const gen_exports = (exports) => {
  return exports.map(gen_export).join('\n\n');
};

const write = (exports) => {
  const tools_file = 'tools.d.ts';
  const tools_path = `${TYPES_DIR}/util/tools.d.ts`;

  const preamble = FS.readFileSync(`${TYPES_DIR}/util/index-preamble.d.ts`).toString();
  const imports_code = gen_imports(tools_path);
  const exports_code = gen_exports(exports);
  const other_exports = [
    'export * from \'./tools\';',
    'export as namespace R;'
  ].join('\n');

  const code = [
    preamble,
    imports_code,
    '',
    exports_code,
    '',
    '',
    other_exports
  ].join('\n');

  FS.mkdirSync(OUTPUT_DIR, { recursive: true});
  FS.writeFileSync(`${OUTPUT_DIR}/index.d.ts`, code);
  FS.copyFileSync(tools_path, `${OUTPUT_DIR}/${tools_file}`);
};

const main = () => {
  write(read());
};

main();
