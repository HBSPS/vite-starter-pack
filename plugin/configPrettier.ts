import { DefaultEslintConfig } from './getEslintConfig';

export default function configPrettier(eslintConfig: DefaultEslintConfig): DefaultEslintConfig {
  const copiedConfig = { ...eslintConfig };
  copiedConfig.extends.push('prettier');

  return copiedConfig;
}
