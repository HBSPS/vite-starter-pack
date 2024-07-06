import { readFileSync } from 'fs';
import JSON5 from 'json5';

export interface DefaultEslintConfig {
  root: boolean;
  env: { browser: boolean; es2020: boolean };
  extends: string[];
  ignorePatterns: string[];
  parser: string;
  parserOptions: {};
  plugins: string[];
  rules: {};
}

export default function getEslintConfig(projectName: string): DefaultEslintConfig {
  try {
    const configObj = JSON5.parse(
      readFileSync(`${projectName}/.eslintrc.cjs`, 'utf-8').split('=')[1]
    ) as DefaultEslintConfig;

    configObj.parserOptions = {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: './tsconfig.app.json',
    };
    configObj.ignorePatterns.push('vite.config.ts');
    configObj.rules = { 'react/react-in-jsx-scope': 'off' };
    configObj.plugins.push('react');

    return configObj;
  } catch (error) {
    throw error;
  }
}
