
const fs = require('fs');
const path = require('path');

function generateTree(dir, exclude = [], depth = 0, maxDepth = 5) {
  if (depth > maxDepth) return '';

  let result = '';
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (exclude.includes(file)) continue;

    const fullPath = path.join(dir, file);
    const isDirectory = fs.lstatSync(fullPath).isDirectory();
    result += '  '.repeat(depth) + (isDirectory ? '+ ' : '- ') + file + '\n';
    if (isDirectory) {
      result += generateTree(fullPath, exclude, depth + 1, maxDepth);
    }
  }
  return result;
}

const rootDir = path.resolve(__dirname);
const excludeDirs = ['node_modules', 'dist', '.git'];
const structure = generateTree(rootDir, excludeDirs);

fs.writeFileSync('structure.txt', structure);
console.log('Directory structure saved to structure.txt');
