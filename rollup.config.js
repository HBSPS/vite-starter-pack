import typescript from '@rollup/plugin-typescript';

export default {
  input: 'bin/vite-starter-pack.ts',
  output: {
    format: 'cjs',
    dir: 'dist',
    preserveModules: true,
  },
  plugins: [typescript({ tsconfig: 'tsconfig.json' })],
};
