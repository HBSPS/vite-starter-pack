#!/usr/bin/env node

import { confirm, select } from '@inquirer/prompts';

try {
  const usingCreateVite = await confirm({
    message: 'Did you use create vite for your project? (or does your project already have eslint?)',
  });

  if (!usingCreateVite) {
    const installEslint = await confirm({
      message: 'Do you want to install eslint?',
    });

    if (installEslint) console.log('install eslint');
  }

  const installPrettier = await confirm({
    message: 'Do you want to install prettier?',
  });

  if (installPrettier) console.log('install prettier');

  const installLintStaged = await confirm({
    message: 'Do you want to install lint-staged?',
  });

  if (installLintStaged) console.log('install lint-staged');

  const installHusky = await confirm({
    message: 'Do you want to install husky?',
  });

  if (installHusky) console.log('install husky');

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
      console.log('no');
      break;

    case 'tailwind':
      console.log('install tailwind');
      break;

    case 'emotion':
      console.log('install emotion');
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
      console.log('no');
      break;

    case 'vitest':
      console.log('install vitest');
      break;

    case 'jest':
      console.log('install jest');
      break;
  }
} catch {}
