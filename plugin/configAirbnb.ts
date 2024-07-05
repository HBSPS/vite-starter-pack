import { DefaultEslintConfig } from './getEslintConfig';

export default function configAirbnb(eslintConfig: DefaultEslintConfig): DefaultEslintConfig {
  const copiedConfig = { ...eslintConfig };
  copiedConfig.extends.push('airbnb', 'airbnb/hooks', 'airbnb-typescript');

  return copiedConfig;
}
