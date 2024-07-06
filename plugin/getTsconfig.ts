import { readFileSync } from 'fs';
import JSON5 from 'json5';

export interface DefaultTsconfig {
  compilerOptions: { [key: string]: any };
  include: string[];
}

export default function getTsconfig(projectName: string) {
  const tsconfigContent = readFileSync(`${projectName}/tsconfig.app.json`, 'utf-8');
  const tsconfig = JSON5.parse(tsconfigContent) as DefaultTsconfig;

  return tsconfig;
}
