#!/usr/bin/env node

import { input, confirm, select } from '@inquirer/prompts';
import createProject from '../plugin/createProject';

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

  if (installPrettier) devDependencies.push('prettier');

  const installLintStaged = await confirm({
    message: 'Do you want to install lint-staged?',
  });

  if (installLintStaged) devDependencies.push('lint-staged');

  const installHusky = await confirm({
    message: 'Do you want to install husky?',
  });

  if (installHusky) devDependencies.push('husky');

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
      devDependencies.push('tailwind', 'postcss', 'autoprefixer');
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
} catch {}
