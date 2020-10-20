import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import image from '@rollup/plugin-image';
import replace from 'rollup-plugin-replace';
import includePaths from 'rollup-plugin-includepaths';
import globals from 'rollup-plugin-node-globals';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.scss', '.json'];

const CODES = [
  'THIS_IS_UNDEFINED',
  'MISSING_GLOBAL_NAME',
  'CIRCULAR_DEPENDENCY',
];

const globalVars = {
  react: 'React',
};

const discardWarning = warning => {
  if (CODES.includes(warning.code)) {
    return;
  }
  console.error(warning);
};

export default {
  onwarn: discardWarning,
  plugins: [
    replace({
      'process.node.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    peerDepsExternal(),
    image(),
    resolve({
      jsnext: true,
      extensions,
      preferBuildins: true,
      browser: true,
      mainFields: ['browser', 'jsnext', 'module', 'main'],
    }),
    includePaths({
      paths: ['src'],
      extensions,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    globals(),
    json(),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
    }),
    terser(),
  ],
  external: Object.keys(globalVars),
  input: 'src/buildIndex.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
    exports: 'named',
    sourcemap: true,
  },
};
