import { execSync } from 'child_process';

export default function configLintStagedAndHusky(projectName: string, installPrettier: boolean) {
  const packageConfig = installPrettier
    ? '{"src/**/*.{ts,tsx}": ["prettier --cache --write", "eslint --cache --cache-location ./.cache/.eslintcache"],"*.{json,css}": "prettier --cache --write"}'
    : '{"src/**/*.{ts,tsx}": "eslint --cache --cache-location ./.cache/.eslintcache"}';

  try {
    execSync(`
      cd ${projectName}
      npx husky init
      npm pkg set lint-staged='${packageConfig}' --json
      echo "npx lint-staged" > .husky/pre-commit
    `);
  } catch (error) {
    throw error;
  }
}
