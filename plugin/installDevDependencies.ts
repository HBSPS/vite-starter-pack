import { execSync } from 'child_process';

export default function installDevDependencies(projectName: string, devDependencies: string[]) {
  if (devDependencies.length === 0) {
    console.log('There are no devDependencies!');
    return;
  }

  try {
    execSync(`cd ${projectName} && npm i -D ${devDependencies.join(' ')}`, { stdio: ['ignore', 'ignore', 'inherit'] });
    console.log('Installation of devDependencies was successful!');
  } catch (error) {
    console.error('DevDependencies installation failed:', error);
    process.exit(1);
  }
}
