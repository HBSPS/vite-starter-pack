import typescript from '@rollup/plugin-typescript';

export default {
  input: 'bin/vite-starter-pack.ts',
  output: {
    format: 'es',
    dir: 'dist',
    preserveModules: true,
  },
  external: ['@inquirer/prompts', 'child_process', 'fs', 'json5'],
  plugins: [typescript({ tsconfig: 'tsconfig.json' })],
};
