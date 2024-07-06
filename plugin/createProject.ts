import { execSync } from 'child_process';

export default function createProject(projectName: string) {
  try {
    execSync(`npm create vite@latest ${projectName} -- --template react-ts && cd ${projectName} && git init`);
    console.log('Project has been created!');
  } catch {
    console.log('Project creation Failed');
    process.exit(1);
  }
}
