import { readFileSync } from 'fs';
import JSON5 from 'json5';

export interface DefaultEslintConfig {
  root: boolean;
  env: { browser: boolean; es2020: boolean };
  extends: string[];
  ignorePatterns: string[];
  parser: string;
  plugins: string[];
}

export default function getEslintConfig(projectName: string): DefaultEslintConfig {
  try {
    const configObj = readFileSync(`${projectName}/.eslintrc.cjs`, 'utf-8').split('=')[1];

    return JSON5.parse(configObj);
  } catch (error) {
    throw error;
  }
}
