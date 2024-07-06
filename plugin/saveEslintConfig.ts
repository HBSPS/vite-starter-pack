import { writeFileSync } from 'fs';
import { DefaultEslintConfig } from './getEslintConfig';

export default function saveEslintConfig(projectName: string, eslintConfig: DefaultEslintConfig) {
  writeFileSync(`${projectName}/.eslintrc.cjs`, `module.exports = ${JSON.stringify(eslintConfig, null, 2)}`);
}
