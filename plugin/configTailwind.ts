import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import JSON5 from 'json5';

interface TailwindConfig {
  content: string[];
  theme: { extend: {} };
  plugins: string[];
}

export default function configTailwind(projectName: string) {
  try {
    execSync(`
      cd ${projectName}
      npx tailwindcss init -p
    `);

    const tailwindConfigString = readFileSync(`${projectName}/tailwind.config.js`, 'utf-8')
      .split('export default')[1]
      .replace(';', '');

    const tailwindConfig = JSON5.parse(tailwindConfigString) as TailwindConfig;
    tailwindConfig.content.push('./index.html', './src/**/*.{js,ts,jsx,tsx}');

    writeFileSync(
      `${projectName}/tailwind.config.js`,
      `/** @type {import('tailwindcss').Config} */\nexport default ${JSON5.stringify(tailwindConfig)}`,
      'utf8'
    );
    writeFileSync(
      `${projectName}/src/index.css`,
      `@tailwind base;\n@tailwind components;\n@tailwind utilities;`,
      'utf-8'
    );
  } catch (error) {
    throw error;
  }
}
