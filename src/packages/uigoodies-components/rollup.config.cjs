const { cpSync, rmSync, readFileSync } = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const replaceImportsWithVars = require('rollup-plugin-replace-imports-with-vars');
const json = require('@rollup/plugin-json');
const pkg = require('./package.json');
const replace = require('@rollup/plugin-replace');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

function readPluginVersion() {
  const yaml = readFileSync(path.resolve(__dirname, '../../../craftercms-plugin.yaml'), 'utf8');
  const block = /^\s+version:\s*\n\s+major:\s*(\d+)\s*\n\s+minor:\s*(\d+)\s*\n\s+patch:\s*(\d+)/m.exec(yaml);
  return block ? `${block[1]}.${block[2]}.${block[3]}` : 'unknown';
}

function readGitCommit() {
  try {
    const sha = execSync('git rev-parse --short HEAD', { cwd: __dirname, stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    const dirty = execSync('git status --porcelain', { cwd: __dirname, stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    return dirty ? `${sha}-dirty` : sha;
  } catch (e) {
    return 'unknown';
  }
}

const buildInfo = {
  version: readPluginVersion(),
  commit: readGitCommit(),
  builtAt: new Date().toISOString()
};

const globals = {
  react: 'craftercms.libs.React',
  'react/jsx-runtime': 'craftercms.libs.reactJsxRuntime',
  'react/jsx-dev-runtime': 'craftercms.libs.reactJsxRuntime',
  rxjs: 'craftercms.libs.rxjs',
  'rxjs/operators': 'craftercms.libs.rxjs',
  // jsx runtime part of Studio's runtime starting 4.1.2
  '@emotion/css/create-instance': 'craftercms.libs.createEmotion',
  'react-dom': 'craftercms.libs.ReactDOM',
  'react-intl': 'craftercms.libs.ReactIntl',
  'react-redux': 'craftercms.libs.ReactRedux',
  '@mui/material': 'craftercms.libs.MaterialUI',
  '@mui/material/styles': 'craftercms.libs.MaterialUI',
  '@craftercms/studio-ui': 'craftercms.components',
  '@craftercms/studio-ui/components': 'craftercms.components',
  '@mui/material/utils': 'craftercms.libs.MaterialUI'
};

const replacementRegExps = {
  '@craftercms/studio-ui/(components|icons|utils|services)/(.+)': (exec) =>
    `craftercms.${exec[1]}.${exec[2].split('/').pop()}`,
  '@mui/material/styles': (exec) => 'craftercms.libs.MaterialUI',
  '@mui/material/(.+)': (exec) => `craftercms.libs.MaterialUI.${exec[1]}`,
  '@mui/icons-material/(.+(Rounded|Outlined))$': (exec) => `craftercms.utils.constants.components.get('${exec[0]}')`
};

module.exports = {
  context: 'this',
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'es',
      globals
    }
  ],
  external: Object.keys(globals).concat(Object.keys(replacementRegExps).map((str) => new RegExp(str))),
  plugins: [
    json(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
      'import.meta.env.NODE_ENV': JSON.stringify('production'),
      'import.meta.env.MODE': JSON.stringify('production'),
      __UIGOODIES_BUILD_INFO__: JSON.stringify(buildInfo)
    }),
    typescript({ tsconfig: './tsconfig.json', compilerOptions: { noEmit: false, outDir: 'dist' } }),
    replaceImportsWithVars({
      replacementLookup: globals,
      replacementRegExps
    }),
    resolve({ extensions }),
    commonjs(),
    {
      name: 'copy-and-clean',
      closeBundle() {
        cpSync(
          './dist/index.js',
          '../../../authoring/static-assets/plugins/org/rd/plugin/uigoodies/apps/uigoodies/index.js'
        );
        rmSync('./build', { recursive: true, force: true });
        rmSync('./dist', { recursive: true, force: true });
      }
    }
  ]
};
