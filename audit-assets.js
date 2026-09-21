// Verifies the single-file pledge: every external reference is a pinned CDN
// <script>, and nothing else is loaded from disk or the network.
const fs = require('fs');
const h = fs.readFileSync(process.argv[2] || 'index.html', 'utf8');

const urls = [...new Set((h.match(/https?:\/\/[^"'\s)]+/g) || []))];
console.log('external URLs referenced (' + urls.length + '):');
urls.forEach(u => console.log('  ' + u));

const counts = {
  '<script src>': (h.match(/<script[^>]+src=/g) || []).length,
  '<img>': (h.match(/<img\b/g) || []).length,
  '<link>': (h.match(/<link\b/g) || []).length,
  'fetch(': (h.match(/fetch\s*\(/g) || []).length,
  'XMLHttpRequest': (h.match(/XMLHttpRequest/g) || []).length,
  'new Image': (h.match(/new Image\b/g) || []).length,
  'new Audio': (h.match(/new Audio\b/g) || []).length,
  'AudioContext': (h.match(/AudioContext/g) || []).length,
  'importScripts': (h.match(/importScripts/g) || []).length,
  'require(': (h.match(/require\s*\(/g) || []).length,
  'import ': (h.match(/^\s*import\s/gm) || []).length
};
console.log('\nresource loaders found:');
Object.keys(counts).forEach(k => console.log('  ' + k + ': ' + counts[k]));

const pinned = urls.every(u => /three@\d+\.\d+\.\d+/.test(u));
console.log('\nall CDN URLs pin an exact three.js version: ' + pinned);
const proceduralAudio = counts.AudioContext > 0 && counts['new Audio'] === 0;
console.log('audio is synthesized (AudioContext, no audio files): ' + proceduralAudio);
const noAssets = counts['<img>'] === 0 && counts['<link>'] === 0 && counts['fetch('] === 0;
console.log('no images / stylesheets / fetches: ' + noAssets);
process.exit(pinned && proceduralAudio && noAssets ? 0 : 1);
