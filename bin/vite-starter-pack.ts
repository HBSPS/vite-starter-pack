#!/usr/bin/env node

import { input, confirm, select } from '@inquirer/prompts';
import createProject from '../plugin/createProject';
import installDependencies from '../plugin/installDependencies';
import installDevDependencies from '../plugin/installDevDependencies';
import installPeerDependencies from '../plugin/installPeerDependencies';
import getEslintConfig from '../plugin/getEslintConfig';
import configAirbnb from '../plugin/configAirbnb';
import configPrettier from '../plugin/configPrettier';
import configLintStagedAndHusky from '../plugin/configLintStagedAndHusky';
import configTailwind from '../plugin/configTailwind';
import saveEslintConfig from '../plugin/saveEslintConfig';
import configEmotion from '../plugin/configEmotion';
import getTsconfig from '../plugin/getTsconfig';
import saveTsConfig from '../plugin/saveTsconfig';
import configVitest from '../plugin/configVitest';
import saveViteConfig from '../plugin/saveViteConfig';

try {
  const devDependencies: string[] = [];
  const dependencies: string[] = [];
  const peerDependencies: string[] = [];

  const projectName = await input({
    message: 'Enter the name of your project',
  });

  const installAirbnb = await confirm({
    message: "Do you want to install airbnb's eslint rule?",
  });

  if (installAirbnb) {
    peerDependencies.push('eslint-config-airbnb');
    devDependencies.push('eslint-config-airbnb-typescript');
  }

  const installPrettier = await confirm({
    message: 'Do you want to install prettier?',
  });

  if (installPrettier) devDependencies.push('prettier', 'eslint-config-prettier', 'eslint-plugin-prettier');

  const installLintStagedAndHusky = await confirm({
    message: 'Do you want to install lint-staged and husky?',
  });

  if (installLintStagedAndHusky) devDependencies.push('lint-staged', 'husky');

  const installStyling = await select({
    message: 'Do you want to install styling library?',
    choices: [
      {
        name: '(no)',
        value: 'no',
      },
      {
        name: 'tailwind',
        value: 'tailwind',
      },
      {
        name: 'emotion',
        value: 'emotion',
      },
    ],
  });

  switch (installStyling) {
    case 'no':
      break;

    case 'tailwind':
      devDependencies.push('tailwindcss', 'postcss', 'autoprefixer');
      break;

    case 'emotion':
      dependencies.push('@emotion/styled', '@emotion/react');
      break;
  }

  const installTesting = await confirm({
    message: 'Do you want to install vitest and react-testing-library?',
  });

  if (installTesting) devDependencies.push('vitest', '@testing-library/react', '@testing-library/jest-dom', 'jsdom');

  console.log();
  createProject(projectName);
  installDependencies(projectName, dependencies);
  installDevDependencies(projectName, devDependencies);
  installPeerDependencies(projectName, peerDependencies);

  let eslintConfig = getEslintConfig(projectName);

  if (installAirbnb) eslintConfig = configAirbnb(eslintConfig);

  if (installPrettier) eslintConfig = configPrettier(projectName, eslintConfig);

  if (installLintStagedAndHusky) configLintStagedAndHusky(projectName, installPrettier);

  let tsconfig = getTsconfig(projectName);

  if (installStyling === 'tailwind') configTailwind(projectName);

  if (installStyling === 'emotion') tsconfig = configEmotion(tsconfig);

  if (installTesting) tsconfig = configVitest(projectName, tsconfig);

  const vitestConfig = `test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },`;

  const viteConfigContent = `import { defineConfig } from ${installTesting ? "'vitest/config'" : "'vite'"}
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(${installStyling === 'emotion' ? "{jsxImportSource: '@emotion/react'}" : ''})],
  ${installTesting && vitestConfig}
})
`;

  saveEslintConfig(projectName, eslintConfig);
  saveTsConfig(projectName, tsconfig);
  saveViteConfig(projectName, viteConfigContent);
} catch (error) {
  console.error(error);
  process.exit(1);
}
