const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // replace green with emerald
  content = content.replace(/green-/g, 'emerald-');
  // replace gray with slate
  content = content.replace(/gray-/g, 'slate-');
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

walk('./src');
