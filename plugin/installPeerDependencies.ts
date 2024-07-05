import { execSync } from 'child_process';

export default function installPeerDependencies(projectName: string, peerDependencies: string[]) {
  if (peerDependencies.length === 0) {
    console.log('There are no peerDependencies!');
    return;
  }

  try {
    execSync(`cd ${projectName} && npx install-peerdeps -D ${peerDependencies.join(' ')}`, {
      stdio: ['ignore', 'ignore', 'inherit'],
    });
    console.log('Installation of peerDependencies was successful!');
  } catch (error) {
    console.log('peerDependencies installation failed:', error);
    process.exit(1);
  }
}
