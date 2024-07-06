import { writeFileSync } from 'fs';

export default function saveViteConfig(projectName: string, viteConfigContent: string) {
  writeFileSync(`${projectName}/vite.config.ts`, viteConfigContent);
}
