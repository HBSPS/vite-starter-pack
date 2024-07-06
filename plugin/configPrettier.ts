import { writeFileSync } from 'fs';
import { DefaultEslintConfig } from './getEslintConfig';

export default function configPrettier(projectName: string, eslintConfig: DefaultEslintConfig): DefaultEslintConfig {
  const copiedConfig = { ...eslintConfig };
  copiedConfig.extends.push('plugin:prettier/recommended');

  const defaultPrettierOption = `{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "endOfLine": "auto",
}
`;

  writeFileSync(`${projectName}/.prettierrc`, defaultPrettierOption, 'utf-8');

  return copiedConfig;
}
