/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 */
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

const plugins = [
  replace({ 'process.env.NODE_ENV': '"production"' }),
  babel({
    exclude: 'node_modules/**',
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      'babel-plugin-transform-react-remove-prop-types',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining'
    ]
  }),
  resolve(),
  commonjs({
    include: /node_modules/,
    namedExports: {
      'react-is': ['isValidElementType', 'ForwardRef', 'Memo'],
      'prop-types': ['elementType']
    }
  })
];

const external = ['rxjs', 'rxjs/operators', 'react', 'react-dom', 'CrafterCMSNext', '@craftercms/studio'];

const globals = {
  rxjs: 'window.CrafterCMSNext.rxjs',
  'rxjs/operators': 'window.CrafterCMSNext.rxjs.operators',
  react: 'window.CrafterCMSNext.React',
  'react-dom': 'window.CrafterCMSNext.ReactDOM',
  CrafterCMSNext: 'window.CrafterCMSNext',
  '@craftercms/studio': 'window.CrafterCMSNext'
};

export default [
  {
    input: 'src/main.js',
    external,
    output: {
      sourcemap: 'inline',
      name: 'studioPluginTranslationVersions',
      file: '../../../authoring/static-assets/plugins/org/rd/plugin/uigoodies/control/translation-versions/main.js',
      format: 'iife',
      globals
    },
    plugins
  }
];
