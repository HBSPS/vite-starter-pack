import { execSync } from 'child_process';

export default function installDependencies(projectName: string, dependencies: string[]) {
  if (dependencies.length === 0) {
    console.log('There are no dependencies!');
    return;
  }

  try {
    execSync(`cd ${projectName} && npm i ${dependencies.join(' ')}`, { stdio: ['ignore', 'ignore', 'inherit'] });
    console.log('Installation of dependencies was successful!');
  } catch (error) {
    console.error('dependencies installation failed:', error);
    process.exit(1);
  }
}
