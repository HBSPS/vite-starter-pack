import { DefaultTsconfig } from './getTsconfig';
import { writeFileSync } from 'fs';

export default function configEmotion(tsconfig: DefaultTsconfig) {
  const copiedConfig = { ...tsconfig };
  copiedConfig.compilerOptions['jsxImportSource'] = '@emotion/react';

  return copiedConfig;
}
