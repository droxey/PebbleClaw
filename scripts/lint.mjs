import { execSync } from 'node:child_process';

const files = [
  'src/embeddedjs/main.js',
  'src/embeddedjs/lib/openclaw.js',
  'src/pkjs/index.js'
];

for (const file of files) {
  execSync(`node --check ${file}`, { stdio: 'inherit' });
}

console.log('lint ok');
