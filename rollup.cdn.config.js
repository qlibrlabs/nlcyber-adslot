import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/nlcyber-adslot.js',
    format: 'iife',
    name: 'nlcyberAdslot',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  },
  external: ['react', 'react-dom'],
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['**/*.test.*', '**/*.spec.*'],
    }),
  ],
};
