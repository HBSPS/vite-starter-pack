import { writeFileSync } from 'fs';
import { DefaultTsconfig } from './getTsconfig';
import { execSync } from 'child_process';

export default function configVitest(projectName: string, tsconfig: DefaultTsconfig) {
  const copiedConfig = { ...tsconfig };
  copiedConfig['types']
    ? copiedConfig['types'].push('vitest/globals', '@testing-library/jeat-dom')
    : (copiedConfig['types'] = ['vitest/globals', '@testing-library/jeat-dom']);
  copiedConfig.include.push('vitest.setup.ts');

  writeFileSync(
    `${projectName}/vitest.setup.ts`,
    `import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);`,
    'utf-8'
  );

  execSync(`cd ${projectName} && npm pkg set scripts.test=vitest`);

  return copiedConfig;
}
