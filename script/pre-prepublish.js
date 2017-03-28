require('shelljs/global');

const path = require('path');

rm('-Rf', path.join(__dirname, '..', 'node_modules', '@types', 'react'));

cp(
  '-r',
  path.join(__dirname, '..', 'node_modules_temp', '@types', 'react', '/'),
  path.join(__dirname, '..', 'node_modules', '@types')
);
