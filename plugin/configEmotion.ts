import { DefaultTsconfig } from './getTsconfig';
import { writeFileSync } from 'fs';

export default function configEmotion(projectName: string, tsconfig: DefaultTsconfig) {
  const copiedConfig = { ...tsconfig };
  copiedConfig.compilerOptions['jsxImportSource'] = '@emotion/react';

  const viteConfigContent = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: '@emotion/react',
  })],
})
`;

  writeFileSync(`${projectName}/vite.config.ts`, viteConfigContent);

  return copiedConfig;
}
