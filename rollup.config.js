import typescript from 'rollup-plugin-typescript';

export default {
  entry: 'src/lib/index.ts',
  format: 'cjs',
  plugins: [ typescript({
    typescript: require('typescript')
  }) ],
  dest: 'lib/index.js'
}