#!/usr/bin/env node

// Script to patch color-string in tinacms's node_modules to add ES module exports
const fs = require('fs');
const path = require('path');

const colorStringPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'tinacms',
  'node_modules',
  'color-string',
  'index.js'
);

if (fs.existsSync(colorStringPath)) {
  let content = fs.readFileSync(colorStringPath, 'utf8');
  
  // Check if patch is already applied
  if (!content.includes('// ES module named exports for webpack compatibility')) {
    // Add the exports at the end
    content += '\n\n// ES module named exports for webpack compatibility\n';
    content += 'module.exports.get = cs.get;\n';
    content += 'module.exports.to = cs.to;\n';
    
    fs.writeFileSync(colorStringPath, content, 'utf8');
    console.log('✓ Patched color-string for ES module compatibility');
  } else {
    console.log('✓ color-string already patched');
  }
} else {
  console.warn('⚠ color-string not found, skipping patch');
}

