import fs from 'fs';
import typescript from 'rollup-plugin-typescript2';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

export default {
  input: 'src/lib/index.ts',
  plugins: [
    typescript({
      typescript: require('typescript')
    })
  ],

  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],

  external: ['react', 'prop-types', 'mitt']
};
