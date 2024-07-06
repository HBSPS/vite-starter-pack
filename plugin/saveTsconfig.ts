import { writeFileSync } from 'fs';
import { DefaultTsconfig } from './getTsconfig';

export default function saveTsConfig(projectName: string, tsconfig: DefaultTsconfig) {
  writeFileSync(`${projectName}/tsconfig.app.json`, JSON.stringify(tsconfig, null, 2));
}
