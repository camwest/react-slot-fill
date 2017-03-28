require('shelljs/global');

const path = require('path');

const r = path.join(__dirname, '..', 'build', 'dist');

const directories = new Set();
const files = new Map();

ls(path.join(__dirname, '..', 'build', 'dist', 'lib', '**', '*.d.ts')).forEach(source => {
  const destination = path.join(__dirname, '..', path.relative(r, source));


  const directory = path.dirname(destination);

  if (!test('-e', directory)) {
    // Create directory
    directories.add(path.dirname(destination));
  }

  // Create these files
  files.set(source, destination);
});

if (Array.from(directories).length !== 0) {
  console.log();
  console.log('Creating directories:')
  console.log(Array.from(directories).map(d => path.relative(path.join(__dirname, '..'), d)).join('\n'));
  console.log();
  for (let directory of directories) {
    mkdir('-p', directory);
  }
}

console.log('Copying files');
console.log(Array.from(files.keys()).map(source =>
  `${path.relative(path.join(__dirname, '..'), source)} -> ${path.relative(path.join(__dirname, '..'), files.get(source))}`).join('\n'));
console.log();

for (let source of files.keys()) {
  const destination = files.get(source);
  cp(source, destination);
}