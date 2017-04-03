require('shelljs/global');
const path = require('path');

/**
 * Clean lib directory
 */
if (test('-e', path.join(__dirname, '..', 'lib'))) {
  console.log('Cleaning lib');
  rm('-rf', path.join(__dirname, '..', 'lib'));
}

/**
 * Run rollup
 */
exec('rollup -c', { silent: true });

console.log('Building lib');

/**
 * Run TypeScript
 */

exec('tsc', { silent: true });
console.log('Generating .d.ts files');

/**
 * Copy .d.ts files into lib
 */

const r = path.join(__dirname, '..', 'build', 'dist');

const directories = new Set();
const files = new Map();

ls(path.join(__dirname, '..', 'build', 'dist', 'lib', '**', '*.d.ts')).forEach(source => {
  const destination = path.join(__dirname, '..', path.relative(r, source));

  // Guard copying test directories to lib
  if (path.dirname(destination).includes('__tests__')) {
    return;
  }

  const directory = path.dirname(destination);

  if (!test('-e', directory)) {
    // Create directory
    directories.add(path.dirname(destination));
  }

  // Create these files
  files.set(source, destination);
});

if (Array.from(directories).length !== 0) {
  // console.log();
  // console.log('Creating directories:')
  // console.log(Array.from(directories).map(d => path.relative(path.join(__dirname, '..'), d)).join('\n'));
  // console.log();
  for (let directory of directories) {
    mkdir('-p', directory);
  }
}

// console.log(Array.from(files.keys()).map(source =>
//   `${path.relative(path.join(__dirname, '..'), source)} -> ${path.relative(path.join(__dirname, '..'), files.get(source))}`).join('\n'));
// console.log();

for (let source of files.keys()) {
  const destination = files.get(source);
  cp(source, destination);
}