import fs from 'fs';
import typescript from 'rollup-plugin-typescript';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

export default {
  entry: 'src/lib/index.ts',
  plugins: [
    typescript({
      typescript: require('typescript')
    })
  ],

  targets: [
    { dest: pkg.main, format: 'cjs' },
    { dest: pkg.module, format: 'es' }
  ],

  external: ['react', 'prop-types', 'mitt']
};
