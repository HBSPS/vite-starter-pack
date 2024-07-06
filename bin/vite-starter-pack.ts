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

  const installTesting = await select({
    message: 'Do you want to install testing library?',
    choices: [
      {
        name: '(no)',
        value: 'no',
      },
      {
        name: 'vitest',
        value: 'vitest',
      },
      {
        name: 'jest',
        value: 'jest',
      },
    ],
  });

  switch (installTesting) {
    case 'no':
      break;

    case 'vitest':
      devDependencies.push('vitest');
      break;

    case 'jest':
      devDependencies.push(
        'jest',
        '@types/jest',
        'ts-node',
        'ts-jest',
        '@testing-library/react',
        'identity-obj-proxy',
        'jest-environment-jsdom',
        '@testing-library/jest-dom',
        'jest-svg-transformer'
      );
      break;
  }

  console.log();
  createProject(projectName);
  installDependencies(projectName, dependencies);
  installDevDependencies(projectName, devDependencies);
  installPeerDependencies(projectName, peerDependencies);

  let eslintConfig = getEslintConfig(projectName);
  if (installAirbnb) eslintConfig = configAirbnb(eslintConfig);
  if (installPrettier) eslintConfig = configPrettier(eslintConfig);
  if (installLintStagedAndHusky) configLintStagedAndHusky(projectName, installPrettier);

  if (installStyling === 'tailwind') configTailwind(projectName);

  let tsconfig = getTsconfig(projectName);
  if (installStyling === 'emotion') tsconfig = configEmotion(projectName, tsconfig);

  saveEslintConfig(projectName, eslintConfig);
  saveTsConfig(projectName, tsconfig);
} catch (error) {
  console.error(error);
  process.exit(1);
}
